import * as PIXI from "pixi.js"
import { Globals } from "./Globals"
import { Background } from "./Background"
import { Hero } from "./Hero"
import { LabelScore } from "./LabelScore"
import { MainScene } from "./MainScene"

export class FinalScene {
    constructor(score){
        this.container = new PIXI.Container();
        // Globals.resources.music.sound.play({
        //     loop:true, 
        //     volume: 0.1
        // });
        this.createBackground();
        this.createPopup();
        this.createLabelScore(score);
        this.createText();
        this.createHero();
        this.container.interactive = true;
        this.container.once("pointerdown", () => Globals.scene.start(new MainScene()));
    }

    createHero() {        
        const hero = new Hero();
        this.container.addChild(hero.sprite);
        hero.sprite.rotation = 3.14159;
        hero.sprite.position.x = window.innerWidth / 2 + hero.sprite.width / 2;
        hero.sprite.position.y = window.innerHeight / 2 + hero.sprite.height / 2;
    }

    createLabelScore(score){
        this.labelScore = new LabelScore(window.innerWidth/2, window.innerHeight/2 - 100, 0.5);
        this.container.addChild(this.labelScore.view);
        this.labelScore.render(score);
    }

    createText() {
        const text = new PIXI.Text();
        text.anchor.set(0.5);
        text.x = window.innerWidth / 2;
        text.y = window.innerHeight / 2 + 100;
        text.style = {
            fontFamily: "Verdana",
            fontWeight: "normal",
            fontSize: 32,
            fill: 0xffffff
        }
        text.text = 'Tap to play again!'
        this.container.addChild(text);

    }

    createBackground() {
        this.bg = new Background();
        this.container.addChild(this.bg.container);
    }

    createPopup() {
        const width = 600;
        const height = 400;
        const x = window.innerWidth / 2 - width / 2;
        const y = window.innerHeight/ 2 - height / 2;
        this.popup = new PIXI.Graphics();
        this.popup.beginFill(0x000000, 0.5);
        this.popup.drawRect(x, y, width, height);
        this.container.addChild(this.popup);

    }

    update(dt) {

    }

}