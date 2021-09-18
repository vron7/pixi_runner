import * as PIXI from "pixi.js"
import {Globals} from "./Globals"


export class LabelScore {
    constructor(x = 10, y = 10, anchor = 0) {
        this.view = new PIXI.Text()
        this.view.x = x;
        this.view.y = y;
        this.view.anchor.set(anchor);
        this.view.style = {
            fontFamily: "Verdana",
            fontWeight: "bold",
            fontSize: 44,
            fill: ["#FF7F50"]
        }
        this.render();
    }

    render(score = 0) {
        this.view.text = `Score: ${score}`;
    }

}