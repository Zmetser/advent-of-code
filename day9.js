"use strict"

const _ = require('lodash')
const fs = require('fs')

fs.readFile('./inputs/day9.txt', 'utf8', (err, data) => {
  const input = data.split('\n')
  const cities = _.unique(input.map((line) => line.match(/\w*/)[0]))
  const distanceMap = input.reduce((acc, line) => {
    const [from, to, distance] = line.match(/(\w*) to (\w*) = (\d{1,})/).splice(1, 3)
    acc[from] = acc[from] || {}
    acc[from][to] = +distance
    return acc
  }, {})

  let routes = cities.reduce(function permute(acc, city, index, cities) {
    return acc.concat(cities.length > 1 && cities.slice(0, index).concat(cities.slice(index + 1)).reduce(permute, []).map((perm) => [city].concat(perm)) || city)
  }, [])

  let distances = routes.reduce((acc, route) =>
    acc.concat(route.reduce((acc, city, index, cities) =>
      acc + distance(city, cities[index + 1]), 0)), [])

  console.log('Min:', _.min(distances))
  console.log('Max:', _.max(distances))

  function distance(from, to) {
    if (!to) return 0
    if (distanceMap[from][to]) return distanceMap[from][to]
    if (distanceMap[to][from]) return distanceMap[to][from]
  }
})
