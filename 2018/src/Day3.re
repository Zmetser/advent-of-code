/**
 * https://adventofcode.com/2018/day/3
 */

let input = Read.linesFromFile("inputs/day3.txt")
/* let input = [|
    "#1 @ 1,3: 4x4",
    "#2 @ 3,1: 4x4",
    "#3 @ 5,5: 2x2",
    "#4 @ 3,1: 4x4",
    "#5 @ 1,1: 4x5",
|] */
let size = 1000

type point = {x: int, y: int}
type rect = {
    id: int,
    p1: point,
    p2: point,
}

let getIntOrElse = (opt) =>
    switch opt {
    | Some(v) => int_of_string(v)
    | None => raise(Not_found)
    }

let toRect = (cut: string) => {
    let result = Js.Re.fromString({|^#(\d{1,4}) @ (\d{1,4}),(\d{1,4}): (\d{1,4})x(\d{1,4})|})
        |> Js.Re.exec(cut)
        |> Regex.parseResult
    let result = Array.sub(result, 1, 5) |> Array.to_list

    switch (result) {
    | [id, x, y, w, h] => {
        let x = getIntOrElse(x)
        let y = getIntOrElse(y)
        let x2 = x + getIntOrElse(w) - 1
        let y2 = y + getIntOrElse(h) - 1

        let rect: rect = {
            id: getIntOrElse(id),
            p1: {x: x, y: y},
            p2: {x: x2, y: y2}
        }

        rect
    }
    | _ => raise(Not_found)
    }
}

let canvas = Array.make_matrix(size, size, 0);

Array.iter(claim => {
    let rect = toRect(claim)

    for (x in rect.p1.x to rect.p2.x) {
        for (y in rect.p1.y to rect.p2.y) {
            canvas[x][y] = canvas[x][y] + 1
        }
    }
}, input)

let overlaps = Array.fold_left((acc, row) =>
    acc + Array.fold_left((acc, i) => i > 1 ? acc + 1 : acc, 0, row)
, 0, canvas)

Js.log("Overlaps: " ++ string_of_int(overlaps))

/* --- Part Two --- */
let notOverlap = (rectA, rectB) =>
    rectA.p1.x > rectB.p2.x || rectA.p2.x < rectB.p1.x ||
    rectA.p1.y > rectB.p2.y || rectA.p2.y < rectB.p1.y

let overlap = (rectA, rectB) =>
    rectA.p1.x < rectB.p2.x && rectA.p2.x > rectB.p1.x &&
    rectA.p1.y < rectB.p2.y && rectA.p2.y > rectB.p1.y

let rects = Array.map(toRect, input) |> Array.to_list
let hasNoOverlaps = (rectA) =>
    List.fold_left((acc, rectB) => {
        if (rectA.id === rectB.id) acc
        else notOverlap(rectA, rectB) && acc
    }, true, rects)


Js.log("Not overlapping: " ++ string_of_int(List.find(hasNoOverlaps, rects).id))