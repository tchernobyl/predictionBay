// Définition des variables globales
let nbVilles = 10;
let listeTabou = new Array(nbVilles);
let nbIterations = 1000;
let meilleurChemin = new Array(nbVilles);
let distanceMeilleurChemin = 0;
let listeVilles = new Array(nbVilles);

// Définition de la fonction de distance euclidienne entre deux villes
function distanceEuclidienne(ville1, ville2) {
  let xDiff = ville1.x - ville2.x;
  let yDiff = ville1.y - ville2.y;
  return Math.sqrt(xDiff*xDiff + yDiff*yDiff);
}

// Définition de la fonction pour générer un chemin aléatoire
function genererCheminAleatoire() {
  let chemin = new Array(nbVilles);
  for (let i = 0; i < nbVilles; i++) {
    chemin[i] = i;
  }
  for (let i = nbVilles - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [chemin[i], chemin[j]] = [chemin[j], chemin[i]];
  }
  return chemin;
}

// Définition de la fonction pour calculer la distance totale parcourue par un chemin
function calculerDistanceChemin(chemin) {
  let distance = 0;
  for (let i = 0; i < nbVilles; i++) {
    let villeCourante = listeVilles[chemin[i]];
    let villeSuivante = listeVilles[chemin[(i + 1) % nbVilles]];
    distance += distanceEuclidienne(villeCourante, villeSuivante);
  }
  return distance;
}

// Définition de la fonction pour trouver le meilleur voisin d'un chemin
function trouverMeilleurVoisin(cheminCourant) {
  let meilleurVoisin = cheminCourant.slice();
  let distanceMeilleurVoisin = Number.MAX_VALUE;
  for (let i = 1; i < nbVilles - 1; i++) {
    for (let j = i + 1; j < nbVilles; j++) {
      let voisin = cheminCourant.slice();
      [voisin[i], voisin[j]] = [voisin[j], voisin[i]];
      let distanceVoisin = calculerDistanceChemin(voisin);
      if (distanceVoisin < distanceMeilleurVoisin && !listeTabou.includes(voisin.toString())) {
        distanceMeilleurVoisin = distanceVoisin;
        meilleurVoisin = voisin;
      }
    }
  }
  return meilleurVoisin;
}

// Initialisation des villes aléatoires
// for (let i = 0; i < nbVilles; i++) {
//   let ville = {
//     x: Math.random(),
//     y: Math.random()
//   };
//   listeVilles[i] = ville;
// }
listeVilles =  [
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
// Initialisation du chemin courant et du meilleur chemin
let cheminCourant = genererCheminAleatoire();
meilleurChemin = cheminCourant.slice();
distanceMeilleurChemin = calculerDistanceChemin(meilleurChemin);

// Boucle principale de l'algorithme de recherche tabou
for (let i = 0; i < nbIterations; i++) {
// Trouver le meilleur voisin du chemin courant
  let meilleurVoisin = trouverMeilleurVoisin(cheminCourant);
// Mettre à jour le chemin courant
  cheminCourant = meilleurVoisin;
// Mettre à jour la distance du meilleur chemin si nécessaire
  let distanceCourante = calculerDistanceChemin(cheminCourant);
  if (distanceCourante < distanceMeilleurChemin) {
    meilleurChemin = cheminCourant.slice();
    distanceMeilleurChemin = distanceCourante;
  }
// Ajouter le chemin courant à la liste tabou
  listeTabou.push(cheminCourant.toString());
// Supprimer le chemin le plus ancien de la liste tabou si nécessaire
  if (listeTabou.length > nbVilles) {
    listeTabou.shift();
  }
}

var meilleurPath = [];
// Affichage du résultat
for(var i=0 ;i<meilleurChemin.length;i++ ){
  meilleurPath.push(listeVilles[meilleurChemin[i]]);
}
console.log("Meilleure route trouvée : " , meilleurPath);

console.log("Distance parcourue : " + distanceMeilleurChemin);
// console.log("Meilleur chemin trouvé : " + meilleurChemin.toString());


// Notez que cet exemple est à titre indicatif et qu'il peut être amélioré en fonction des spécifications de chaque problème.

