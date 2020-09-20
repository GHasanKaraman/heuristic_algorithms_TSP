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

const all_possible_paths = (cities) => {
  let paths = [];

  for (let i = 0; i < cities.length; i = i + 1) {
    let rest = all_possible_paths(
      cities.slice(0, i).concat(cities.slice(i + 1))
    );

    if (!rest.length) {
      paths.push([cities[i]]);
    } else {
      for (let j = 0; j < rest.length; j = j + 1) {
        paths.push([cities[i]].concat(rest[j]));
      }
    }
  }

  return paths;
};

const take_only = (array, start) => {
  const temp = [];

  for (let i = 0; i < array.length; i++) {
    if (array[i][0] === start) {
      temp.push(array[i]);
    }
  }

  return temp;
};

const min = (array) => {
  let minimum = array[0];

  for (const item of array) {
    if (item < minimum) {
      minimum = item;
    }
  }

  return minimum;
};

const exhaustive_search = (graph, start_point = null) => {
  const cities = Object.keys(graph);

  let paths = all_possible_paths(cities);

  if (start_point) {
    paths = take_only(paths, start_point);
  }

  for (let i = 0; i < paths.length; i++) {
    paths[i].push(get_total_distance(graph, paths[i]));
  }

  let min_cost_path = paths.sort((a, b) => {
    return a[cities.length] - b[cities.length];
  });

  const cost = min_cost_path[0].pop();
  const path = min_cost_path[0];

  return { path, cost };
};

module.exports = { exhaustive_search };
