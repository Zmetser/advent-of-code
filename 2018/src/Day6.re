/**
 * https://adventofcode.com/2018/day/5
 */

let asPoint = input => {
    let result = Js.Re.fromString({|^(\d{1,3}), (\d{1,3})$|})
        |> Js.Re.exec(input)
        |> Regex.parseResult

    switch ((result[1], result[2])) {
        | (Some(x), Some(y)) => (int_of_string(x), int_of_string(y))
        | _ => (0, 0)
    }
}

let points = Read.linesFromFile("inputs/day6.txt") |> Array.map(asPoint)

let areas = Array.make(Array.length(points), 0)
/* min(45, 42) max(356, 356) */
let rows = 356 /* y ^ */
let cols = 356 /* x > */

let dist = (p1, p2) => abs(fst(p1) - fst(p2)) + abs(snd(p1) - snd(p2))

/*
 return the index of the smallest unique integer
 returns -1 if the smallest is not unique
*/
let smallestUniquei = (a) =>
    fst(a -> Belt_Array.reduceWithIndex((-1, Pervasives.max_int), (acc, n, i) => switch ((acc, n)) {
        | ((_, min), n) when min === n => (-1, min)
        | ((_, min), n) when min > n => (i, n)
        | (acc, _) => acc
    }))

for (row in 45 to rows) {
    for (col in 42 to cols) {
        let p1 = (row, col)
        let indexOfClosest = (points |> Array.map(p2 => dist(p1, p2))) -> smallestUniquei
        if (indexOfClosest > -1) {
            areas[indexOfClosest] = areas[indexOfClosest] + 1
        }
    }
}
Array.sort(Pervasives.compare, areas)
Js.log(areas)

let sum = (xs) => Array.fold_left((acc, x) => acc + x, 0, xs)

let a = Belt_Array.range(45, rows)
    |> Array.map(x => Belt_Array.range(42, cols)
        -> Belt_Array.keep(y =>
            ((points |> Array.map(p => dist((x, y), p))) -> sum) < 10000
        ))
    |> Belt_Array.concatMany

Js.log(Array.length(a))