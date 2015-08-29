// Learn more about F# at http://fsharp.net
// See the 'F# Tutorial' project for more help.
open System.IO

let rec removeEmptyDirectories (dir : string) =
    let subdirs = Directory.GetDirectories(dir) 

    let mutable dirCount = subdirs.Length
    for subdir in subdirs do 
        let itemCount = removeEmptyDirectories subdir
        match itemCount with
            | 0 -> 
                printfn "Deleting %s" subdir
                try
                    Directory.Delete(subdir)
                    dirCount <- dirCount - 1
                with
                    | ex -> printfn "Exception: %s" ex.Message
            | n when n < 0 -> failwith (sprintf "failure! directory count is %d" n)
            | _ -> () // do nothing
    // return number of items in myself
    dirCount + Directory.GetFiles(dir).Length

let countOfBackslashes (str: string) = 
    str.ToCharArray() 
        |> Seq.filter (fun c -> c = '\\')
        |> Seq.length

[<EntryPoint>]
let main argv = 
    if (argv.Length > 0) then Directory.SetCurrentDirectory argv.[0]

    let directory = Directory.GetCurrentDirectory()

    // sanity safeguard
    match directory, directory.Length with
        | (d, _) when countOfBackslashes(d) < 2 -> failwith "failure! too few backslashes in folder name"
        | (_, n) when n < 5 -> failwith "failure! length of directory is too short"
        | _ -> ()

    removeEmptyDirectories directory |> ignore
    0 // return an integer exit code
