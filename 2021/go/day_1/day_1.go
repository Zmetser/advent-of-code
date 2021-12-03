package day_1

import (
	"fmt"
	"strings"

	"2021/utils"
)

func getNumberOfIncreases(measurements []string) int {
	counter, intArray := 0, utils.ToIntArray(measurements)

	for i := 1; i < len(measurements); i++ {
		if intArray[i] > intArray[i - 1] {
			counter += 1
		}
	}

	return counter
}

func part1() {
	var measurements = strings.Split(utils.MyReadFile("day1.txt"), "\n")

	fmt.Printf(" - (Part 1) %d measurements are larger than the previous", getNumberOfIncreases(measurements))
}

func Solution() {
	fmt.Println("Day 1: Sonar Sweep")
	part1()
}