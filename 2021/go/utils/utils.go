package utils

import (
	"fmt"
	"io/ioutil"
	"os"
	"path"
	"strconv"
)

func getWd() string {
	path, err := os.Getwd()
	if err != nil {
		fmt.Println(err)
	}
	return path
}

func MyReadFile(fileName string) string {
	data, err := ioutil.ReadFile(path.Join(getWd(), "../", "inputs", fileName))
	if err != nil {
		fmt.Println("File reading error", err)
		return ""
	}
	return string(data)
}

func ToIntArray(array []string) []int {
	var intArray []int

	for _, str := range array {
		if i, err := strconv.Atoi(str); err == nil {
			intArray = append(intArray, i)
		}
	}

	return intArray
}