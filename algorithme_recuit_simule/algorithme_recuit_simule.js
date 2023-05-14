// Fonction pour calculer la distance entre deux villes
function distance(city1, city2) {
  var xDistance = Math.abs(city1.x - city2.x);
  var yDistance = Math.abs(city1.y - city2.y);
  var distance = Math.sqrt((xDistance * xDistance) + (yDistance * yDistance));
  return distance;
}

// Fonction pour calculer la distance totale du parcours
function totalDistance(route) {
  var totalDistance = 0;
  for (var i = 0; i < route.length-1; i++) {
    var city1 = route[i];
    var city2 = route[i+1];
    totalDistance += distance(city1, city2);
  }
  return totalDistance;
}

// Fonction pour générer une solution initiale aléatoire
function randomSolution(cities) {
  var route = cities.slice();
  route.sort(function(a, b){return 0.5 - Math.random()});
  return route;
}

// Fonction pour créer une solution voisine en permutant deux villes aléatoires
function getNeighbour(route) {
  var newRoute = route.slice();
  var index1 = Math.floor((newRoute.length - 1) * Math.random());
  var index2 = Math.floor((newRoute.length - 1) * Math.random());
  while (index1 == index2) {
    index2 = Math.floor((newRoute.length - 1) * Math.random());
  }
  var temp = newRoute[index1];
  newRoute[index1] = newRoute[index2];
  newRoute[index2] = temp;
  return newRoute;
}

// Fonction pour calculer la probabilité d'accepter une solution moins bonne
function acceptanceProbability(energy, newEnergy, temperature) {
  if (newEnergy < energy) {
    return 1.0;
  }
  return Math.exp((energy - newEnergy) / temperature);
}

// Fonction pour résoudre le problème du voyageur de commerce avec l'algorithme de recuit simulé
function simulatedAnnealing(cities, temperature, coolingRate) {
  var currentSolution = randomSolution(cities);
  var bestSolution = currentSolution;
  var currentEnergy = totalDistance(currentSolution);
  var bestEnergy = currentEnergy;
  var increment =0;
  while (temperature > 1) {
    increment++;
    var newSolution = getNeighbour(currentSolution);
    var newEnergy = totalDistance(newSolution);
    var acceptanceProb = acceptanceProbability(currentEnergy, newEnergy, temperature);
    if (acceptanceProb > Math.random()) {
      currentSolution = newSolution;
      currentEnergy = newEnergy;
    }
    if (currentEnergy < bestEnergy) {
      bestSolution = currentSolution;
      bestEnergy = currentEnergy;
    }
    temperature *= 1 - coolingRate;
    // console.log('temperature',temperature)
  }
  return bestSolution;
}

// Exemple d'utilisation de l'algorithme de recuit simulé pour résoudre le problème du voyageur de commerce avec 10 villes
var cities = [
  {x: 60, y: 200, id:1},
  {x: 180, y: 200, id:2},
  {x: 80, y: 180, id:3},
  {x: 140, y: 180, id:4},
  {x: 20, y: 160, id:5},
  {x: 100, y: 160, id:6},
  {x: 200, y: 160, id:7},
  {x: 140,y: 140, id:8},
  {x: 40, y: 120, id:9},
  {x: 100, y: 120, id:10},
];

var temperature = 100000;
var coolingRate = 0.03;

var bestRoute = simulatedAnnealing(cities, temperature, coolingRate);
console.log("Meilleure route trouvée : ", bestRoute);
console.log("Distance totale de la meilleure route : ", totalDistance(bestRoute));

// Dans cet exemple, nous avons défini une liste de 10 villes avec leurs coordonnées x et y.
// Nous avons ensuite appelé la fonction `simulatedAnnealing` pour trouver la meilleure route possible en utilisant l'algorithme de recuit simulé
// avec une température initiale de 1000 et un taux de refroidissement de 0.03. Enfin, nous avons affiché la meilleure route trouvée ainsi que la
// distance totale de cette route. Notez que pour un ensemble de données plus important, le temps de calcul peut être très long.
