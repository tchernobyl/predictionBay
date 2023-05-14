<!--Voici un exemple simple en JavaScript d'un arbre de décision qui prédit si un-->
<!--fruit donné est une pomme ou une orange en fonction de son poids et de sa texture :-->

    // Ensemble de données d'entraînement
    var trainingData = [
        { weight: 140, texture: 'lisse', type: 'pomme' },
        { weight: 130, texture: 'lisse', type: 'pomme' },
        { weight: 150, texture: 'rugueuse', type: 'orange' },
        { weight: 170, texture: 'rugueuse', type: 'orange' }
    ];

    // Fonction pour diviser l'ensemble de données en sous-ensembles en fonction d'une caractéristique et d'une valeur
    function partition(data, feature, value) {
        var left = [];
        var right = [];
        for (var i = 0; i < data.length; i++) {
            var example = data[i];
            if (example[feature] < value) {
                left.push(example);
            } else {
                right.push(example);
            }
        }
        return [left, right];
    }

    // Fonction pour calculer l'entropie d'un ensemble de données
    function entropy(data) {
        var counts = {};
        for (var i = 0; i < data.length; i++) {
            var example = data[i];
            if (counts[example.type]) {
                counts[example.type]++;
            } else {
                counts[example.type] = 1;
            }
        }
        var result = 0;
        var total = data.length;
        for (var type in counts) {
            var frequency = counts[type] / total;
            result -= frequency * Math.log(frequency) / Math.log(2);
        }
        return result;
    }

    // Fonction pour trouver le meilleur point de séparation pour l'ensemble de données
    function findSplit(data) {
        var bestFeature;
        var bestValue;
        var bestGain = 0;
        var currentEntropy = entropy(data);
        for (var feature in data[0]) {
            if (feature === 'type') {
                continue;
            }
            for (var i = 0; i < data.length; i++) {
                var value = data[i][feature];
                var [left, right] = partition(data, feature, value);
                if (left.length === 0 || right.length === 0) {
                    continue;
                }
                var gain = currentEntropy - left.length / data.length * entropy(left) - right.length / data.length * entropy(right);
                if (gain > bestGain) {
                    bestGain = gain;
                    bestFeature = feature;
                    bestValue = value;
                }
            }
        }
        return { feature: bestFeature, value: bestValue };
    }

    // Fonction pour construire l'arbre de décision récursivement
    function buildTree(data) {
        if (entropy(data) === 0) {
            return { type: data[0].type };
        }
        var { feature, value } = findSplit(data);
        var [left, right] = partition(data, feature, value);
        return {
            feature: feature,
            value: value,
            left: buildTree(left),
            right: buildTree(right)
        };
    }

    // Fonction pour prédire le type de fruit à partir de l'arbre de décision
    function predict(example, tree) {
        if (tree.type) {
            return tree.type;
        }
        if (example[tree.feature] < tree.value) {
            return predict(example, tree.left);
        } else {
            return predict(example, tree.right);
        }
    }
// Construire l'arbre de décision à partir de l'ensemble de données d'entraînement
        var tree = buildTree(trainingData);

// Exemples de fruits à classifier
        var examples = [
            { weight: 155, texture: 'rugueuse' },
            { weight: 120, texture: 'lisse' }
        ];

// Classer chaque exemple de fruit à l'aide de l'arbre de décision
        for (var i = 0; i < examples.length; i++) {
            var example = examples[i];
            var prediction = predict(example, tree);
            console.log('Le fruit de poids ' + example.weight + ' et de texture ' + example.texture + ' est une ' + prediction);
        }



