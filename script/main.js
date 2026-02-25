// add hidden feature to make bombs a picture of ayman by typing 'quazi'

const FLAGS = {
    basic: {
        startLives: 5,
    },
    resetGame: false,
    currentLives: 0,
    nextFruitID: 0,
};
FLAGS.currentLives = FLAGS.basic.startLives;

document.querySelector("#start").addEventListener("click", startGame);
document.querySelector("#debug").innerHTML = `${FLAGS.currentLives}`;

let spawnerInit = [
    {
        type: "bottom_center",
        bounds: {
            x: [300, 500],
            y: "default",
        },
        rate: 1000,
    },
    {
        type: "bottom_left",
        bounds: {
            x: [100, 200],
            y: "default",
        },
        rate: 1250,
    },
    {
        type: "bottom_right",
        bounds: {
            x: [600, 700],
            y: "default",
        },
        rate: 1500,
    },
];

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 1000 },
            debug: false,
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

/**
 * TEMPORARY: this code is commented out to hide the game window during UI development
const game = new Phaser.Game(config);
*/

function preload() {}

function create() {
    for (let i = 0; i < spawnerInit.length; i++) {
        let d = spawnerInit[i]; // spawner data
        let s = new Spawner(this, d.type, d.rate, d.bounds.x, d.bounds.y);
        spawnerGroup.push(s);
    };
};

function update() {
    if (FLAGS.resetGame) {
        resetGame();
        FLAGS.resetGame = false;
    }

    for (let i = 0; i < spawnerGroup.length; i++) {
        let d = spawnerGroup[i].netData;
        if ((performance.now() - d.lastSpawn) >= d.spawnRate) {
            spawnerGroup[i].Spawn();
        } else continue;
    };

    updateFruitData();
};

let fruitGroup = [];
let spawnerGroup = [];

function updateFruitData() {
    for (let i = 0; i < fruitGroup.length; i++) {
        let f = fruitGroup[i].obj; // fruit object
        let d = f.netData; // fruit data

        if (d.frozen === true) continue; // if the fruit is frozen, don't update its position

        d.pos.x = d.body.x;
        d.pos.y = d.body.y;
        d.vel.x = d.body.body.velocity.x;
        d.vel.y = d.body.body.velocity.y;

        if (d.pos.y >= 650) {
            f.Kill();

            FLAGS.currentLives--;
            document.querySelector("#debug").innerHTML = `${FLAGS.currentLives}`;
            if (FLAGS.currentLives <= 0) initEndGameSeq();
        }
    };
};

function initEndGameSeq() {
    spawnerGroup.forEach((spawner) => {
        spawner.Toggle(false);
    });

    fruitGroup.forEach((idx) => {
        idx.obj.Freeze("endgame");
    });
};

function resetGame() {
    FLAGS.currentLives = FLAGS.basic.startLives;
    document.querySelector("#debug").innerHTML = `${FLAGS.currentLives}`;
    fruitGroup.length = 0; // ensure the fruit group is cleared
    FLAGS.nextFruitID = 0;
};

function startGame() {
    spawnerGroup.forEach((spawner) => {
        spawner.Toggle(true);
    });
};