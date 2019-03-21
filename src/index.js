import { Engine, Scene, MeshBuilder, StandardMaterial, Color4, Vector3, ArcRotateCamera, HemisphericLight } from "babylonjs";

const initGame = () => {
    const canvas = document.getElementById("babylon-canvas");

    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    const light = new HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 10, 0),
        scene
    );

    const camera = new ArcRotateCamera(
        "camera",
        0,
        Math.PI / 3,
        10.0,
        new BABYLON.Vector3(0, 10, -30),
        scene
    );
    camera.attachControl(canvas, true);
    camera.setTarget(new Vector3(0, 0, 0));

    const material = new StandardMaterial("material");
    material.diffuseColor = new Color4(0.22, 0.89, 0.76, 1);
    material.specularColor = new Color4(0, 0.5, 0.76, 1);

    const mesh = MeshBuilder.CreateBox(
        "mesh",
        { width: 10, height: 10, depth: 10 },
        scene
    );

    mesh.material = material;

    engine.runRenderLoop(function() {
        scene.render();

    });

};

initGame();