class Member {
  constructor(Chromosome) {
    this.Chromosome = Chromosome;
    this.Fitness = 0;
  }
}

const random = (start, end) => {
  if (end) return Math.floor(Math.random() * (end - start)) + start;
  else return Math.floor(Math.random() * start);
};

const randomChoice = (array) => {
  let rand = random(array.length);
  return array[rand];
};

const get_distance = (graph, start, end) => {
  startNode = graph[start];
  return startNode[end];
};

//dist = get_distance(graph, "B", "D");

const random_gene = (gene_pool) => {
  gene = randomChoice(gene_pool);
  return gene;
};

const create_chromosome = (gene_pool, startPoint) => {
  const chromosome = [];

  if (startPoint) {
    chromosome.push(startPoint);
  }

  while (chromosome.length !== gene_pool.length) {
    let gene = random_gene(gene_pool);
    if (!chromosome.includes(gene)) {
      chromosome.push(gene);
    }
  }
  return chromosome;
};

const fitness_function = (graph, population, individual_size) => {
  for (let i of population) {
    i.Fitness = 0;
    for (let j = 0; j < individual_size - 1; j++) {
      i.Fitness += get_distance(graph, i.Chromosome[j], i.Chromosome[j + 1]);
    }
  }
};

const normalize_fitness = (population) => {
  var sum = 0;
  for (var i of population) {
    sum += i.Fitness;
  }

  for (var i of population) {
    i.Fitness = i.Fitness / sum;
  }
};
const mutate = (
  population,
  individual_size,
  mutation_rate,
  startPoint = ""
) => {
  for (let i of population) {
    if (Math.random() < mutation_rate) {
      let index1 = Math.floor(startPoint.length, random(individual_size));
      let index2 = (index1 + 1) % individual_size;
      let gene = i.Chromosome[index1];
      i.Chromosome[index1] = i.Chromosome[index2];
      i.Chromosome[index2] = gene;
    }
  }
};

const cross_over = (
  population,
  next_generation,
  population_size,
  individual_size,
  startPoint
) => {
  best = parseInt(population_size * 0.9);
  next_generation = [...population.slice(best, population_size)];
  while (next_generation.length <= population_size) {
    var start = Math.floor(random(individual_size));
    var end = Math.floor(random(start + 1, individual_size));

    member_1 = randomChoice(next_generation).Chromosome;
    member_2 = randomChoice(next_generation).Chromosome;

    var new_member = member_1.slice(start, end);

    if (startPoint) {
      new_member[0] = startPoint;
    }

    for (var i = 0; i < individual_size; i++) {
      var point = member_2[i];
      if (!new_member.includes(point)) {
        new_member.push(point);
      }
    }
    next_generation.push(new Member(new_member));
  }

  population = [...next_generation];
};

const compare = (a, b) => {
  if (a.Fitness < b.Fitness) {
    return 1;
  } else {
    return -1;
  }
};

const genetic = (
  graph,
  startPoint = null,
  max_generation = 1000,
  population_size = 100,
  mutation_rate = 0.01
) => {
  const gene_pool = Object.keys(graph);

  let population = [];
  let next_generation = [];
  let individual_size = gene_pool.length;
  let gen_counter = 0;

  for (let i = 0; i < population_size; i++) {
    population.push(new Member(create_chromosome(gene_pool, startPoint)));
  }

  for (let i = 0; i < max_generation; i++) {
    fitness_function(graph, population, individual_size);

    //normalize_fitness(population);
    population = population.sort(compare);
    // console.log(
    //   "(" + gen_counter + "," + population[population_size - 1].Fitness + ")"
    // );
    cross_over(
      population,
      next_generation,
      population_size,
      individual_size,
      startPoint
    );
    mutate(
      population,
      individual_size,
      mutation_rate,
      startPoint === null ? "" : startPoint
    );
    gen_counter += 1;
  }

  fitness_function(graph, population, individual_size);
  population = population.sort(compare);
  //normalize_fitness();

  return {
    path: population[population_size - 1].Chromosome,
    cost: population[population_size - 1].Fitness,
  };
};
module.exports = { genetic };
