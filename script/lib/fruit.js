import getFruit from "../util/rarity";
import { FLAGS } from "../main";

export default class Fruit {
    constructor(game, spawn) {
        this.self = game;
        this.netData = {
            pos: {
                x: spawn[0],
                y: spawn[1],
            },
            vel: {
                x: null,
                y: null,
            },
            body: null,
            ID: FLAGS.nextFruitID,
            frozen: false,
            fruitType: getFruit(),
        };
        FLAGS.nextFruitID++; // increment next available fruit ID

        this.Spawn();
    };
    
    Spawn() {
        let d = this.netData;
        d.body = this.self.add.circle(d.pos.x, d.pos.y, 20, (d.fruitType === "bomb") ? 0xff0000 : 0xffffff).setOrigin(0.5, 0.5);
        this.self.physics.add.existing(d.body);

        d.body.setInteractive();
        d.body.on("pointerdown", (pointer) => {
            switch (d.fruitType) {
                case "bomb":
                    FLAGS.currentLives--;
                    break;
            };
            this.Kill();
        });
    };

    Move(x, y) {
        let body = this.netData.body.body;
        body.setVelocityY(y);
        body.setVelocityX(x);
    };

    Freeze(time) {
        let body = this.netData.body.body;
        this.netData.frozen = true;
        body.setVelocityX(0);
        body.setVelocityY(0);
        body.allowGravity = false;

        if (time === "endgame") {
            setTimeout(() => {
                this.Kill();
                FLAGS.resetGame = true;
            }, 1000);
            return;
        }

        setTimeout(() => {
            this.netData.frozen = false;
            body.setVelocityX(this.netData.vel.x);
            body.setVelocityY(this.netData.vel.y);
            body.allowGravity = true;
        }, time);
    };

    Kill() {
        this.netData.body.destroy();
        fruitGroup = fruitGroup.filter((idx) => idx.ID !== this.netData.ID);
    };
};