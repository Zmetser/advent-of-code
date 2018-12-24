/**
 * https://adventofcode.com/2018/day/5
 */

let polymer = Read.linesFromFile("inputs/day5.txt")[0] |> Js.String.split("") |> Array.to_list

let charMatch = (c1, c2) => c1 === String.lowercase(c2) || String.lowercase(c1) === c2

let shouldReact = (c1, c2) => c1 !== c2 && charMatch(c1, c2)

let recatOnce = polymer =>
    polymer -> Belt_List.reduceReverse([], (acc, char) => switch (acc, char) {
    | ([char2, ...rest], char) when shouldReact(char, char2) => rest
    | _ => [char, ...acc]
    })

let rec runReactions = polymer => {
    let newPolymer = recatOnce(polymer)
    List.length(newPolymer) !== List.length(polymer) ? runReactions(newPolymer) : polymer
}

let fullyReactedPolymer = runReactions(polymer)
Js.log(List.length(fullyReactedPolymer))

let abc = Js.String.split("", "abcdefghijklmnopqrstuvwxyz") |> Array.to_list

let optimizedPolimers = List.map(letter =>
    List.filter(char => !charMatch(letter, char), polymer) -> runReactions
, abc)

let rec min = list => switch (list) {
| [] => 0
| [x] => x
| [x, ...xs] => {
    let m = min(xs)
    x < m ? x : m
}
}

Js.log(min(List.map(List.length, optimizedPolimers)))