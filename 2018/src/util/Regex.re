let parseResult = (result) => {
    switch (result) {
    | Some(result) => Array.map(Js.Nullable.toOption, Js.Re.captures(result))
    | None => [||]
    }
}