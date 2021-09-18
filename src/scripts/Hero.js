import * as PIXI from "pixi.js"
import {Globals} from "./Globals"


export class Hero {
    constructor() {
        this.score = 0;
        this.dy = 0;
        this.jumpIndex = 0;
        this.platform = null;
        this.sprite = new PIXI.AnimatedSprite([
            Globals.resources["walk1"].texture,
            Globals.resources["walk2"].texture
        ]);
        this.sprite.x = 100;
        this.sprite.y = 100;
        this.sprite.loop = true;
        this.sprite.animationSpeed = 0.1;
        this.sprite.play();
    }

    get left() {
        return this.sprite.x;
    }

    get right() {
        return this.left + this.sprite.width;
    }

    get top() {
        return this.sprite.y;
    }

    get bottom() {
        return this.top + this.sprite.height;
    }

    get nextBottom() {
        return this.bottom + this.dy;
    }

    collectDiamond() {
        ++this.score;
        this.sprite.emit("score");
    }

    stayOnPlatform(platform) {
        this.platform = platform;
        this.dy = 0;
        this.jumpIndex = 0;
        this.sprite.y = platform.top - this.sprite.height;
    }

    moveByPlatform(platform) {
        this.sprite.x = platform.nextLeft - this.sprite.width
    }

    startJump() { 
        if(this.platform || this.jumpIndex === 1){
            ++this.jumpIndex;
            this.platform = null;
            this.boost = true;
            this.dy = -20;
        }

    }

    update() {
        if (!this.platform) {
            ++this.dy;
            this.sprite.y += this.dy;
        }
        if (this.top > window.innerHeight || this.right < 0 ) {
            this.sprite.emit("die");
        }
    }

}