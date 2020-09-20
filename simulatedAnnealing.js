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

const random_path = (cities, startPoint = null) => {
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

const simulated_annealing = (
  graph,
  start_point = null,
  outer_iteration = 1000,
  inner_iteration = 10,
  temperature = 100,
  cooling_factor = 0.98,
  verbose = 0
) => {
  const cities = Object.keys(graph);

  let path = random_path(cities, start_point);
  let cost0 = get_total_distance(graph, path);

  let T = temperature;
  let factor = cooling_factor;

  for (let i = 0; i < outer_iteration; i++) {
    T = T * factor;

    if (verbose === 1) {
      console.log(
        "Iteration:",
        i,
        "Cost:",
        cost0,
        "Temperature:",
        T,
        "Path:",
        path
      );
    }

    for (let j = 0; j < inner_iteration; j++) {
      let index1 = random(1, path.length);
      let index2 = random(1, path.length);

      path = swap(path, index1, index2);

      let cost1 = get_total_distance(graph, path);

      if (cost1 < cost0) {
        cost0 = cost1;
      } else {
        x = Math.random();
        if (x < Math.exp((cost0 - cost1) / T)) {
          cost0 = cost1;
        } else {
          path = swap(path, index1, index2);
        }
      }
    }
  }
  return { path: path, cost: cost0 };
};

module.exports = { simulated_annealing };
