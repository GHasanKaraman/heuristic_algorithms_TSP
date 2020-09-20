const get_distance = (graph, start, end) => {
  startNode = graph[start];
  return startNode[end];
};

const get_total_distance = (graph, path) => {
  let distance = 0;
  for (let j = 0; j < path.length - 1; j++) {
    distance += get_distance(graph, path[j], path[j + 1]);
  }
  return distance;
};

const get_closest_city = (graph, city) => {
  let cities = graph[city];
  cities = Object.entries(cities);
  cities = cities.sort((a, b) => {
    return a[1] - b[1];
  });
  return cities;
};

const greedy = (graph, startPoint) => {
  let path = [];
  if (Object.keys(graph).includes(startPoint)) {
    path.push(startPoint);
  } else {
    throw new Error("The start point is not in the graph!");
  }
  const n = Object.keys(graph).length;

  while (path.length < n) {
    let city = get_closest_city(graph, path[path.length - 1]);

    for (let i = 0; i < n - 1; i++) {
      if (!path.includes(city[i][0])) {
        path.push(city[i][0]);
        i = n;
      }
    }
  }
  return { path: path, cost: get_total_distance(graph, path) };
};

module.exports = { greedy };
