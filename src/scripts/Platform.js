import * as PIXI from "pixi.js"
import {Globals} from "./Globals"
import {Diamond} from "./Diamond"

const TileSize = 64;

export class Platform {
    constructor(rows, cols, x) {
        this.diamonds = [];
        this.diamondsOffsetMin = 100;
        this.diamondsOffsetMax = 200;

        this.dx = -5; // why not define as constant as TileSize? Because we might want to modify it during runtime

        this.rows = rows;
        this.cols = cols;
        this.width = cols * TileSize;
        this.height = rows * TileSize;
        this.createContainer(x);
        this.createTiles();
        this.createDiamonds();
    }

    createDiamonds() {
        const y = this.diamondsOffsetMin + Math.random() * (this.diamondsOffsetMax - this.diamondsOffsetMin);

        for (let i = 0; i < this.cols; i++) {
            if (Math.random() < 0.4) { // 40% of change to land a diamond ontop of each tile of the platform
                const diamond = new Diamond(TileSize * i, -y);
                this.container.addChild(diamond.sprite);
                this.diamonds.push(diamond);
            }
        }
    }

    get left() {
        return this.container.x;
    }

    get right() {
        return this.left + this.width;
    }

    get top() {
        return this.container.y;
    }

    get bottom() {
        return this.top + this.height;
    }
    get nextLeft() {
        return this.left + this.dx;
    }

    createContainer(x) {
        this.container = new PIXI.Container();
        this.container.x = x;
        this.container.y = window.innerHeight - this.rows * TileSize;
    }

    createTiles() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.createTile(row, col)
            }
        }
    }

    createTile(row, col) {
        const texture = row === 0 ? 'platform' : 'tile'
        const tile = new PIXI.Sprite(Globals.resources[texture].texture);
        this.container.addChild(tile);
        tile.x = col * tile.width;
        tile.y = row * tile.height;
    }

    move() {
        this.container.x += this.dx;

        if (this.right < 0) {
            this.container.emit("hidden");
        }
    }

    checkCollision(hero) {
        this.diamonds.forEach(diamond => {
            diamond.checkCollision(hero);
        })

        if (this.isCollideTop(hero)) {
            hero.stayOnPlatform(this);
        } else {
            if (hero.platform === this) {
                hero.platform = null;
            }
            // we don't want hero to go thru next platfom when falling down
            if (this.isCollideLeft(hero)){
                hero.moveByPlatform(this);
            }
        }
    }

    isCollideLeft(hero) {
        return hero.bottom >= this.top && // heroes legs are lower then platforms top
            hero.top <= this.bottom && // heroes head is higer than bottom of platform
            hero.right <= this.left &&
            hero.right >= this.nextLeft          
    }

    isCollideTop(hero) {
        return hero.right >= this.left &&
            hero.left <= this.right &&
            hero.bottom <= this.top &&
            hero.nextBottom >= this.top;
    }


}