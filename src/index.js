import { Engine, Scene } from "babylonjs";

const initGame = () => {
    const canvas = document.getElementById("babylon-canvas");

    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    engine.runRenderLoop(function() {
        scene.render();
    });
};
initGame();
