const rarities = [
    { // common
        threshold: 70, // 1-70
        fruits: [
            "apple",
            "orange",
        ],
    },
    { // rare
        threshold: 98, // 71-98
        fruits: [
            "strawberry",
        ],
    },
    { // legendary
        threshold: 100, // 99-100
        fruits: [
            "watermelon",
        ],
    },
];

function getFruit() {
    const quaziConstant = 20; // 1 in 5 chance to get a bomb
    if (randomInt(1, 100) <= quaziConstant) return "bomb";

    const weight = randomInt(1, 100);
    let chosenFruit = null;

    for (let i = 0; i < rarities.length; i++) {
        if (chosenFruit !== null) continue;

        let rarity = rarities[i];
        if (weight <= rarity.threshold) {
            if (rarity.fruits.length === 1) {
                chosenFruit = rarity.fruits[0];
            } else {
                let i = randomInt(0, rarity.fruits.length);
                chosenFruit = rarity.fruits[i];
            }
        }
    };

    return chosenFruit;
};