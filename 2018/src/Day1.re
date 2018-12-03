/*
 https://adventofcode.com/2018/day/1
*/

let input = Read.linesFromFile("inputs/day1.txt")

let toNumLike = (s) =>
	switch (String.get(s, 0)) {
	| '+' => String.sub(s, 1, String.length(s) - 1)
	| _ => s
	}

let frequencies = Array.map(n => Pervasives.int_of_string(toNumLike(n)), input)
let sumOfFrequencies = Array.fold_left((acc, n) => acc + n, 0, frequencies)

let includes = (match, l) => {
	let rec iterate = (match, l, i) =>
		if (i >= Array.length(l)) false
		else if (Array.get(l, i) === match) true
		else iterate(match, l, i + 1)

	iterate(match, l, 0)
}

let calibrating = (frequencies) => {
	/* sums is an Array because it has crazy many elements, and List recursion would kill node */
	let rec iterate = (_freq, sum, sums) => {
		switch (_freq) {
		| [] => iterate(frequencies, sum, sums)
		| [head, ...tail] =>
			let newSum = sum + head
			if (includes(newSum, sums)) (newSum)
			else iterate(tail, newSum, Array.append(sums, [|newSum|]))
		}
	}
	iterate(List.tl(frequencies), List.hd(frequencies), [||])
}

Js.log(sumOfFrequencies)
Js.log(calibrating(Array.to_list(frequencies)))
