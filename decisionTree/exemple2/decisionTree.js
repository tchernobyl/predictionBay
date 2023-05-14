<!--Voici un exemple simple en JavaScript d'un arbre de décision qui prédit si un-->
<!--fruit donné est une pomme ou une orange en fonction de son poids et de sa texture :-->


//Bien sûr, voici le code compvar pour l'exemple précédent :

// Définir la fonction de construction de l'arbre de décision
function buildTree(data) {
    // Séparer les exemples de données en classes distinctes
    var classes = {};
    for (var i = 0; i < data.length; i++) {
        var example = data[i];
        var cls = example.class;
        if (!classes[cls]) {
            classes[cls] = [];
        }
        classes[cls].push(example);
    }

    // Définir la fonction interne récursive pour construire l'arbre
    function buildTreeInternal(data, depth) {
        // Arrêter la récursion si toutes les données sont de la même classe ou si la profondeur maximale est atteinte
        if (Object.keys(classes).length === 1 || depth >= 5) {
            var cls = Object.keys(classes)[0];
            return { label: cls };
        }

        // Trouver la caractéristique la plus informative pour la classification
        var bestInfoGain = -Infinity;
        var bestFeature;
        for (var feature in data[0]) {
            if (feature === 'class') continue;
            var infoGain = calculateInfoGain(data, feature);
            if (infoGain > bestInfoGain) {
                bestInfoGain = infoGain;
                bestFeature = feature;
            }
        }

        // Créer un nouveau nœud pour l'arbre avec la caractéristique sélectionnée
        var node = { feature: bestFeature, branches: {} };

        // Séparer les exemples de données en fonction de la caractéristique sélectionnée
        var featureValues = getDistinctValues(data, bestFeature);
        for (var i = 0; i < featureValues.length; i++) {
            var value = featureValues[i];
            var subset = getSubset(data, bestFeature, value);
            if (subset.length === 0) {
                // Si aucun exemple de données ne correspond à cette valeur de la caractéristique, ajouter un nœud de feuille avec la classe majoritaire
                var cls = getMajorityClass(data);
                node.branches[value] = { label: cls };
            } else {
                // Sinon, ajouter un nouveau sous-arbre récursivement avec les exemples de données restants
                node.branches[value] = buildTreeInternal(subset, depth + 1);
            }
        }

        return node;
    }

    // Construire l'arbre à partir des données d'entraînement
    return buildTreeInternal(data, 0);
}

// Définir la fonction de calcul du gain d'information pour une caractéristique donnée
function calculateInfoGain(data, feature) {
    // Calculer l'entropie de la classe de base
    var baseEntropy = calculateEntropy(data);

    // Calculer l'entropie pondérée des sous-ensembles divisés par la valeur de la caractéristique
    var featureValues = getDistinctValues(data, feature);
    var weightedEntropy = 0;
    for (var i = 0; i < featureValues.length; i++) {
        var value = featureValues[i];
        var subset = getSubset(data, feature, value);
        var subsetEntropy = calculateEntropy(subset);
        var subsetWeight = subset.length / data.length;
        weightedEntropy += subsetWeight * subsetEntropy;
    }

    // Calculer le gain d'information en soustrayant l'entropie pondérée des sous-ensembles de la classe de base
    var infoGain = baseEntropy - weightedEntropy;
    return infoGain;
}

// Définir la fonction de calcul de l'entropie pour une liste d'exemples de données
function calculateEntropy(data) {
    // Compter le nombre d'exemples de chaque classe
    var classCounts = {};
    for (var i = 0; i < data.length; i++) {
        var example = data[i];
        var cls = example.class;
        if (!classCounts[cls]) {
            classCounts[cls] = 0;
        }
        classCounts[cls]++;
    }

    // Calculer l'entropie comme la somme des probabilités de chaque classe pondérées par leur log2
    var entropy = 0;
    for (var cls in classCounts) {
        var prob = classCounts[cls] / data.length;
        entropy -= prob * Math.log2(prob);
    }

    return entropy;
}

// Définir la fonction de récupération des valeurs distinctes d'une caractéristique pour une liste d'exemples de données
function getDistinctValues(data, feature) {
    var values = [];
    for (var i = 0; i < data.length; i++) {
        var example = data[i];
        var value = example[feature];
        if (values.indexOf(value) === -1) {
            values.push(value);
        }
    }
    return values;
}

// Définir la fonction de récupération des exemples de données pour une valeur donnée d'une caractéristique donnée
function getSubset(data, feature, value) {
    var subset = [];
    for (var i = 0; i < data.length; i++) {
        var example = data[i];
        if (example[feature] === value) {
            subset.push(example);
        }
    }
    return subset;
}

// Définir la fonction de récupération de la classe majoritaire pour une liste d'exemples de données
function getMajorityClass(data) {
    var classCounts = {};
    for (var i = 0; i < data.length; i++) {
        var example = data[i];
        var cls = example.class;
        if (!classCounts[cls]) {
            classCounts[cls] = 0;
        }
        classCounts[cls]++;
    }
    var maxCount = -1;
    var majorityClass;
    for (var cls in classCounts) {
        var count = classCounts[cls];
        if (count > maxCount) {
            maxCount = count;

            majorityClass = cls;
        }
    }
    return majorityClass;
}

// Exemple d'utilisation
var data = [
    { feature1: 'a', feature2: 1, class: 'positive' },
    { feature1: 'b', feature2: 2, class: 'positive' },
    { feature1: 'c', feature2: 3, class: 'negative' },
    { feature1: 'd', feature2: 4, class: 'negative' },
    { feature1: 'e', feature2: 5, class: 'negative' },
    { feature1: 'f', feature2: 6, class: 'positive' },
    { feature1: 'g', feature2: 7, class: 'positive' },
    { feature1: 'h', feature2: 8, class: 'negative' },
    { feature1: 'i', feature2: 9, class: 'positive' },
    { feature2: 'negative' },
];


// Fonction qui prend un ensemble de données et renvoie l'attribut cible majoritaire
function majorityClass(data) {
    var count = {};
    for (var i = 0; i < data.length; i++) {
        var cls = data[i]['class'];
        if (count[cls]) {
            count[cls]++;
        } else {
            count[cls] = 1;
        }
    }
    var maxCount = 0;
    var majorityCls = null;
    for (var cls in count) {
        if (count[cls] > maxCount) {
            maxCount = count[cls];
            majorityCls = cls;
        }
    }
    return majorityCls;
}

// Fonction qui calcule l'entropie d'un ensemble de données
function entropy(data) {
    var count = {};
    for (var i = 0; i < data.length; i++) {
        var cls = data[i]['class'];
        if (count[cls]) {
            count[cls]++;
        } else {
            count[cls] = 1;
        }
    }
    var ent = 0;
    var numData = data.length;
    for (var cls in count) {
        var freq = count[cls] / numData;
        ent += -freq * Math.log2(freq);
    }
    return ent;
}

// Fonction qui prend un ensemble de données et un attribut, et renvoie les sous-ensembles de données
// correspondants aux valeurs possibles de cet attribut
function splitData(data, attribute) {
    var splitData1 = {};
    for (var i = 0; i < data.length; i++) {
        var attrVal = data[i][attribute];
        if (splitData1[attrVal]) {
            splitData1[attrVal].push(data[i]);
        } else {
            splitData1[attrVal] = [data[i]];
        }
    }
    return splitData1;
}

// Fonction qui construit un arbre de décision à partir d'un ensemble de données
function buildDecisionTree(data) {
    // Si toutes les instances ont la même classe, retourner une feuille avec cette classe
    var cls = data[0]['class'];
    var sameClass = true;
    for (var i = 1; i < data.length; i++) {
        if (data[i]['class'] !== cls) {
            sameClass = false;
            break;
        }
    }
    if (sameClass) {
        return cls;
    }

    // Si nous avons épuisé tous les attributs, retourner une feuille avec la classe majoritaire
    if (Object.keys(data[0]).length === 1) {
        return majorityClass(data);
    }

    // Trouver l'attribut qui fournit le plus grand gain d'information
    var maxGain = -Infinity;
    var bestAttribute = null;
    var S = entropy(data);
    for (var attribute in data[0]) {
        if (attribute === 'class') {
            continue;
        }
        var gain = S;
        var splitData1 = splitData(data, attribute);
        for (var attrVal in splitData1) {
            var subset = splitData1[attrVal];
            var prob = subset.length / data.length;
            gain -= prob * entropy(subset);
        }
        if (gain > maxGain) {
            maxGain = gain;
            bestAttribute = attribute;
        }
    }

    // Créer un nouveau nœud de décision avec le meilleur attribut trouvé ci-dessus
    var decisionTree = {feature: bestAttribute, subtrees: {}};
    var splitData1 =  splitData(data, bestAttribute);
    for (var attrVal in splitData1) {
        decisionTree['subtrees'][attrVal] = buildDecisionTree(splitData1[attrVal]);
    }

    return decisionTree;
}

// Exemple d'utilisation
var data2 = [
    {age: '<=30', income: 'high', student: 'no', credit_rating: 'fair', class: 'no'},
    {age: '<=30', income: 'high', student: 'no', credit_rating: 'excellent', class: 'no'},
    {age: '31...40', income: 'high', student: 'no', credit_rating: 'fair', class: 'yes'},
    {age: '>40', income: 'medium', student: 'no', credit_rating: 'fair', class: 'yes'},
    {age: '>40', income: 'low', student: 'yes', credit_rating: 'fair', class: 'yes'},
    {age: '>40', income: 'low', student: 'yes', credit_rating: 'excellent', class: 'no'},
    {age: '31...40', income: 'low', student: 'yes', credit_rating: 'excellent', class: 'yes'},
    {age: '<=30', income: 'medium', student: 'no', credit_rating: 'fair', class: 'no'},
    {age: '<=30', income: 'low', student: 'yes', credit_rating: 'fair', class: 'yes'},
    {age: '>40', income: 'medium', student: 'yes', credit_rating: 'fair', class: 'yes'},
    {age: '<=30', income: 'medium', student: 'yes', credit_rating: 'excellent', class: 'yes'},
    {age: '31...40', income: 'medium', student: 'no', credit_rating: 'excellent', class: 'yes'},
    {age: '31...40', income: 'high', student: 'yes', credit_rating: 'fair', class: 'yes'},
    {age: '>40', income: 'medium', student: 'no', credit_rating: 'excellent', class: 'no'},
];
var decisionTree2 = buildDecisionTree(data2);
console.log(decisionTree2); // affiche l'arbre de décision sous forme de JSON





var decisionTree = buildDecisionTree(data);
console.log(decisionTree);

// Sortie attendue :
// {
//   feature: 'feature1',
//   subtrees: {
//     'a': 'positive',
//     'b': 'positive',
//     'c': {
//       feature: 'feature2',
//       subtrees: {
//         3: 'negative',
//         4: 'negative',
//         5: 'negative'
//       }
//     },
//     'd': 'negative',
//     'e': 'negative',
//     'f': 'positive',
//     'g': 'positive',
//     'h': 'negative',
//     'i': 'positive'
//   }
// }


