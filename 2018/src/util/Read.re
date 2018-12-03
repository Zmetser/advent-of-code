let linesFromFile = (filename: string) =>
	Node.Fs.readFileAsUtf8Sync(filename)
	|> Js.String.split("\n")