using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;
using WindowsInput;
using WindowsInput.Native;

namespace GameBarLoader
{
    static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            var sim = new InputSimulator();

            var args = Environment.GetCommandLineArgs();

            if (args.Length < 2)
            {
                sim.Keyboard
                   .ModifiedKeyStroke(VirtualKeyCode.LWIN, VirtualKeyCode.VK_G);
                return;
            }

            switch (args[1].ToUpperInvariant())
            {
                case "S":
                    sim.Keyboard
                        .Sleep(1000)
                        .ModifiedKeyStroke(new VirtualKeyCode[] { VirtualKeyCode.LWIN, VirtualKeyCode.MENU }, VirtualKeyCode.SNAPSHOT);
                    break;
                case "R":
                    sim.Keyboard
                        .Sleep(1000)
                        .ModifiedKeyStroke(new VirtualKeyCode[] { VirtualKeyCode.LWIN, VirtualKeyCode.MENU }, VirtualKeyCode.VK_R);
                    break;
                case "G":
                    sim.Keyboard
                        .Sleep(1000)
                        .ModifiedKeyStroke(new VirtualKeyCode[] { VirtualKeyCode.LWIN, VirtualKeyCode.MENU }, VirtualKeyCode.VK_G);
                    break;
            }
        }
    }
}
