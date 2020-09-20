const { simulated_annealing } = require("./simulatedAnnealing");
const { exhaustive_search } = require("./exhaustive");
const { twoOpt } = require("./twoOpt");
const { genetic } = require("./genetic");
const { greedy } = require("./greedy");

const graph = require("./data8.json");
const simulatedAnnealing = require("./simulatedAnnealing");

const random = (start, end) => {
  if (end) return Math.floor(Math.random() * (end - start)) + start;
  else return Math.floor(Math.random() * start);
};

const graphGenerator = (count) => {
  const graphObj = {};

  for (let i = 1; i <= count; i++) {
    const innerObj = {};
    for (let j = 1; j <= count; j++) {
      let distance = 0;
      if (graphObj["a" + j] && graphObj["a" + j]["a" + i]) {
        distance = graphObj["a" + j]["a" + i];
      } else {
        distance = random(50);
      }
      if ("a" + i !== "a" + j) innerObj["a" + j] = distance;
    }
    graphObj["a" + i] = innerObj;
  }
  //console.log(JSON.stringify(graphObj));
  return graphObj;
};

const sample = (count, times) => {
  const samples = {};

  for (let i = 0; i < times; i++) {
    samples[i] = graphGenerator(count);
  }

  return samples;
};

const mean = (array) => {
  let sum = 0;

  for (const item of array) {
    sum += item;
  }

  return sum / array.length;
};

const standard_deviation = (array) => {
  const _x = mean(array);
  let sum = 0;

  for (const x of array) {
    sum += Math.pow(_x - x, 2);
  }

  return Math.sqrt(sum / (array.length - 1));
};

const sa_VS_twoOpt = () => {
  const iteration = 100;
  const sa_distances = [];
  const tolerance = 0;
  console.time("Elapsed Time");

  const exhaustive_distance = exhaustive_search(graph, "a1").slice(-1)[0];

  for (let i = 0; i < iteration; i++) {
    let temp = simulated_annealing(graph, "a1", 1000, 1000, 100, 0.99, 0);

    sa_distances.push(temp.cost);
  }

  let counter = 0;

  for (let i = 0; i < iteration; i++) {
    if (sa_distances[i] <= exhaustive_distance.cost * (1 + tolerance)) {
      counter++;
    }
  }

  console.log("Exhaustive Search", exhaustive_distance.cost);
  console.log("Simulated Annealing", sa_distances);
  console.timeEnd("Elapsed Time");
  console.log(
    "Standard Deviation:",
    standard_deviation(sa_distances),
    "Mean:",
    mean(sa_distances)
  );
  console.log("Accuracy:", (counter * 100) / iteration + "%");
};

const main = () => {
  let startPoint = "a1";

  console.time("Elapsed Time for Exhaustive Search");
  const exhaustive = exhaustive_search(graph, startPoint);
  console.timeEnd("Elapsed Time for Exhaustive Search");

  console.time("Elapsed Time for Genetic Algorithm");
  const geneticAlgorithm = genetic(graph, startPoint, 100, 300, 1);
  console.timeEnd("Elapsed Time for Genetic Algorithm");

  console.time("Elapsed Time for Greedy Approach");
  const greedyApproach = greedy(graph, startPoint);
  console.timeEnd("Elapsed Time for Greedy Approach");

  console.time("Elapsed Time for 2-Opt Algorithm");
  const twoOptAlgorithm = twoOpt(graph, startPoint, 10000);
  console.timeEnd("Elapsed Time for 2-Opt Algorithm");

  console.time("Elapsed Time for Simulated Annealing Algorithm");
  const saAlgorithm = simulated_annealing(
    graph,
    startPoint,
    1000,
    1000,
    100,
    0.98,
    0
  );
  console.timeEnd("Elapsed Time for Simulated Annealing Algorithm");

  console.log("\nExhaustive Search: ", exhaustive);
  console.log("\nGenetic Algorithm: ", geneticAlgorithm);
  console.log("\nGreedy Approach: ", greedyApproach);
  console.log("\n2-Opt Algorithm: ", twoOptAlgorithm);
  console.log("\nSimulated Annealing Algorithm: ", saAlgorithm);
};

test();
