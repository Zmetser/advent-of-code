/**
 * https://adventofcode.com/2018/day/4
 */

let input = Read.linesFromFile("inputs/day4.txt") |> Array.to_list

type activity = (string, Js_date.t)

type guardLog = {
    id: string,
    activities: list(activity),
    sleep: float,
}

let parseLine = input => {
    let result = Js.Re.fromString({|^\[(.*)\] (.*)$|})
        |> Js.Re.exec(input)
        |> Regex.parseResult

    switch ((result[1], result[2])) {
        | (Some(datetime), Some(action)) => Some((action, Js_date.fromString(datetime ++ "Z")))
        | _ => None
    }
}

let compare = (e1, e2) => compare(Js_date.valueOf(snd(e1)), Js_date.valueOf(snd(e2)))
let entries = Belt.List.keepMap(input, parseLine) |> List.sort(compare)

let getAction = (action) => {
    let result = Js.Re.fromString({|(?:^Guard #(\d{1,4}))|(falls asleep)|(wakes up)|})
        |> Js.Re.exec(action)
        |> Regex.parseResult

    switch (result) {
    | [|_, guardId, None, None|] => guardId
    | [|_, None, _, None|] => Some("Sleep")
    | [|_, None, None, _|] => Some("Awake")
    | _ => raise(Failure("Error in input, something should match"))
    }
}

/*
    Ott hagytad abba, hogy megvannak az activitik, most kellene szummazni oket.
    0-rol indul, es mindig amikor felebred, akkor megnezzuk, hogy az elalvas es felkeles kozott mennyi ido telt el
*/
let rec makeGuardLogs = (entries, currentLogEntry, logs) => switch (entries) {
    | [] => [currentLogEntry, ...logs]
    | [( action, timestamp ), ...rest] => switch (getAction(action)) {
        | Some("Awake") => {
            let timeOfPreviousActivity = snd(List.hd(currentLogEntry.activities))
            let sleepTime = Js_date.valueOf(timestamp) -. Js_date.valueOf(timeOfPreviousActivity)
            /* Js.log(("previous activity:", List.hd(currentLogEntry.activities), sleepTime /. 60000.)) */
            let newEntry = {
                ...currentLogEntry,
                activities: [("Awake", timestamp), ...currentLogEntry.activities],
                sleep: currentLogEntry.sleep +. sleepTime
            }
            makeGuardLogs(rest, newEntry, logs)
        }
        | Some("Sleep") => {
            let newEntry = {
                ...currentLogEntry,
                activities: [("Sleep", timestamp),
                ...currentLogEntry.activities]}
            makeGuardLogs(rest, newEntry, logs)
        }
        | Some(id) => {
            let logs = [currentLogEntry, ...logs]
            let alreadyLogged = List.exists(log => log.id === id, logs)
            let nextLogEntry = alreadyLogged ?
                List.find(log => log.id === id, logs) :
                { id, activities: [("Start", timestamp)], sleep: 0. }

            makeGuardLogs(rest, nextLogEntry, List.filter(log => log.id !== id, logs))
        }
        | _ => raise(Failure("Error in input, something should've match"))
    }
}

let rec d = (l) => switch (l) {
    | [] => Js.log("End")
    | [log, ...rest] => {
        Js.log((log.id, log.sleep, log.sleep /. 60000.))
        Js.log(Array.of_list(log.activities))
        d(rest)
    }
}

let rec guardWithMostSleepRec = (logs, acc) => switch (logs) {
    | [] => acc
    | [log, ...rest] => guardWithMostSleepRec(rest, log.sleep > acc.sleep ? log : acc)
}

let logs = makeGuardLogs(entries, { id: "", activities: [], sleep: 0. }, [])
let guardWithMostSleep = guardWithMostSleepRec(logs, List.hd(logs))
Js.log(d([guardWithMostSleep]))

let rec iter = (activities, sleepFrom, minutes) => switch (activities) {
    | [] => minutes
    | [activity, ...rest] => switch (fst(activity)) {
        | "Awake" => {
            let sleepUntil = snd(activity)
            for (i in int_of_float(Js_date.getUTCMinutes(sleepFrom)) to int_of_float(Js_date.getUTCMinutes(sleepUntil)) - 1) {
                minutes[i] = minutes[i] + 1
            }
            iter(rest, snd(activity), minutes)
        }
        | "Sleep" => iter(rest, snd(activity), minutes)
        | _ => iter(rest, snd(activity), minutes)
    }
}
let minuteMap = iter(List.rev(guardWithMostSleep.activities), Js_date.make(), Array.make(60, 0))

Js.log(Array.mapi((index, a) => (index, a), minuteMap))