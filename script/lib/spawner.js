import { randomInt } from "../util/helper";
import Fruit from "./fruit";

export default class Spawner {
    constructor(game, type, spawnRate, init_x, init_y) {
        this.self = game;
        this.netData = {
            bounds: {
                x: init_x,
                y: (init_y === "default") ? [600, 600] : init_y,
            },
            active: false,
            type: type,
            spawnRate: spawnRate,
            lastSpawn: performance.now(),
        };
    };

    SetBounds(x, y) {
        this.netData.bounds.x = x;
        this.netData.bounds.y = y;
    };

    SetRate(rate) {
        this.netData.spawnRate = rate;
    };

    Toggle(status) {
        if (status === true) {
            this.netData.active = true;
        } else if (status === false) {
            this.netData.active = false;
        }
    };

    Spawn() {
        if (this.netData.active === false) return;

        let bounds = this.netData.bounds;
        let x = randomInt(bounds.x[0], bounds.x[1]);
        let y = randomInt(bounds.y[0], bounds.y[1]);

        let fruit = new Fruit(this.self, [x, y]);
        fruitGroup.push({ ID: fruit.netData.ID, obj: fruit, });
        this.netData.lastSpawn = performance.now();

        switch (this.netData.type) {
            case "bottom_center":
                let leftRight = randomInt(0, 1) // 0 = right, 1 = left
                fruit.Move(((-1) ** leftRight) * randomInt(100, 200), randomInt(775, 975) * -1);
                break;
            case "bottom_left":
                fruit.Move(randomInt(100, 200), randomInt(775, 975) * -1);
                break;
            case "bottom_right":
                fruit.Move(randomInt(100, 200) * -1, randomInt(775, 975) * -1);
                break;
        };
    };
};