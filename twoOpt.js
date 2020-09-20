const random = (start, end) => {
  if (end) return Math.floor(Math.random() * (end - start)) + start;
  else return Math.floor(Math.random() * start);
};

const random_choice = (array) => {
  let rand = random(array.length);
  return array[rand];
};

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

const random_city = (cities) => {
  city = random_choice(cities);
  return city;
};

const random_path = (cities, startPoint) => {
  const path = [];

  if (startPoint) {
    path.push(startPoint);
  }

  while (path.length !== cities.length) {
    let city = random_city(cities);
    if (!path.includes(city)) {
      path.push(city);
    }
  }
  return path;
};

const swap = (path, point1, point2) => {
  const tempPath = [...path];
  const temp = tempPath[point1];
  tempPath[point1] = tempPath[point2];
  tempPath[point2] = temp;

  return tempPath;
};

const twoOpt = (graph, start_point = null, iteration = 10000) => {
  const cities = Object.keys(graph);

  let path = random_path(cities, start_point);
  let minDistance = 0;
  minDistance = get_total_distance(graph, path);

  for (let i = 0; i < iteration; i++) {
    let index1 = random(1, path.length);
    let index2 = random(1, path.length);

    let newPath = swap(path, index1, index2);
    let newDistance = get_total_distance(graph, newPath);

    if (newDistance < minDistance) {
      path = [...newPath];
      minDistance = newDistance;
    }
  }
  return { path: path, cost: minDistance };
};

module.exports = { twoOpt };
