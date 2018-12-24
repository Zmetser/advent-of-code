/*
 https://adventofcode.com/2018/day/2
*/

let ids = Read.linesFromFile("inputs/day2.txt")

/*
 charMap => rawSum => uniqueSum
 [(a, 3), (b, 3)] => [3, 3] => [3]
 [(a, 2), (b, 3)] => [2, 3] => [2, 3]
*/

type sum = (char, int)

let findSum = (char: char, list: list(sum)): option(sum) =>
    switch (List.find(t => fst(t) === char, list)) {
    | exception Not_found => None
    | t => Some(t)
    }

let inc_1 = (t) => ((fst(t) + 1, snd(t)))
let inc_2 = (t) => ((fst(t), snd(t) + 1))

let createSum = (c: char, l: list(sum)) => {
    switch (findSum(c, l)) {
    | None => List.append(l, [(c, 1)])
    | Some(sum) => List.map(t => t == sum ? inc_2(sum) : t, l)
    }
}

let reduceToSums = (id: string) => {
    let rec iterate = (s: string, i: int, acc: list(sum)) =>
        createSum(String.get(s, i), i == 0 ? acc : iterate(s, i - 1, acc))
    iterate(id, String.length(id) - 1, [])
}

/* List.fold_left((memo: list(sum), id: string) => { */
/* }, [], code); */

let filterSums = (sums: list(sum)) =>
    List.sort_uniq(
        (sum1, sum2) => compare(snd(sum1), snd(sum2))
        , List.filter(sum => snd(sum) == 2 || snd(sum) == 3, sums))

let hash = (ids: array(string)) => Array.map(id => {
    let sums = List.map(snd, filterSums(reduceToSums(id)))
    sums
}, ids)

let sumHash = (hash) => Array.fold_left((memo, sums) => {
    switch (sums) {
        | [] => memo
        | [2, 3] => inc_1(inc_2(memo))
        | [3, 2] => inc_1(inc_2(memo))
        | [2] => inc_1(memo)
        | [3] => inc_2(memo)
        | _ => memo
    }
}, (0, 0), hash)

Js.log(sumHash(hash(ids)))