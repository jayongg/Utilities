using ARSoft.Tools.Net.Dns;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace JayDnsServer
{
    public partial class Form1 : Form
    {
        DnsClient dnsClient;
        private IPAddress loopbackIpAddress;
        private HashSet<string> blockedList = new HashSet<string>();

        public Form1()
        {
            string dnsArgument = "192.168.1.1";
            var args = Environment.GetCommandLineArgs();
            if (args.Length == 0)
            {
                dnsArgument = args[0];
            }

            this.dnsClient = new DnsClient(IPAddress.Parse(dnsArgument), 120000);
            this.dnsClient.IsTcpEnabled = true;
            this.dnsClient.IsUdpEnabled = true;

            this.loopbackIpAddress = IPAddress.Parse("127.0.0.1");

            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            var dnsServer = new DnsServer(1000, 1000);

            using (var fileStream = File.OpenRead("gravity.list"))
            using (var sr = new StreamReader(fileStream))
            {
                do
                {
                    var line = sr.ReadLine();
                    if (line == null)
                    {
                        break;
                    }

                    var hostIndex = line.LastIndexOf(' ') + 1;
                    var hostToBlock = line.Substring(hostIndex);
                    blockedList.Add(hostToBlock);

                } while (true);
            }

            dnsServer.QueryReceived += DnsServer_QueryReceived;
            dnsServer.Start();
        }

        private async Task DnsServer_QueryReceived(object sender, QueryReceivedEventArgs eventArgs)
        {
            DnsMessage message = eventArgs.Query as DnsMessage;

            if (message == null)
                return;

            DnsMessage response = message.CreateResponseInstance();

            if ((message.Questions.Count == 1))
            {
                DnsQuestion question = message.Questions[0];

                var fullAddress = string.Join(".", question.Name.Labels);

                if (this.blockedList.Contains(fullAddress))
                {
                    ARecord fakeRecord = new ARecord(question.Name, 10, this.loopbackIpAddress);
                    response.ReturnCode = ReturnCode.NoError;

                    Debug.WriteLine("Blocked: " + fullAddress);

                    eventArgs.Response = response;
                    return;
                }

                // send query to upstream server
                DnsMessage upstreamResponse = await this.dnsClient.ResolveAsync(question.Name, question.RecordType, question.RecordClass);

                var answer = upstreamResponse.AnswerRecords.FirstOrDefault();
                // if got an answer, copy it to the message sent to the client
                if (answer != null)
                {
                    foreach (DnsRecordBase record in (upstreamResponse.AnswerRecords))
                    {
                        response.AnswerRecords.Add(record);
                    }
                    foreach (DnsRecordBase record in (upstreamResponse.AdditionalRecords))
                    {
                        response.AdditionalRecords.Add(record);
                    }

                    response.ReturnCode = ReturnCode.NoError;

                    // set the response
                    eventArgs.Response = response;
                }
            }
        }

    }
}
