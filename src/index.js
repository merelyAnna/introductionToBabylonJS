import {
    Engine,
    Scene,
    MeshBuilder,
    StandardMaterial,
    Vector3,
    ArcRotateCamera,
    HemisphericLight,
    Color3,
    ActionManager,
    ExecuteCodeAction,
    ParticleSystem,
    PhysicsImpostor,
    Texture,
    Color4,
} from "babylonjs";

const createBox = scene => {
    //Creating the box mesh
    const box = MeshBuilder.CreateBox(
        "box",
        {width: 10, height: 10, depth: 10},
        scene
    );

    // Positioning the box
    box.position = new Vector3(2, 3, 4);

    // Re-Positioning the box
    box.position.x = 3;
    box.position.y = 2;
    box.position.z = 1;

    // Rotating the box
    box.rotation = new Vector3(2, 3, 4);

    // Resetting the rotation of the box
    box.rotation.x = Math.PI / 9;
    box.rotation.y = Math.PI / 8;
    box.rotation.z = Math.PI / 7;

    // Creating the material - it is set during the action
    const material = new StandardMaterial("material");
    material.diffuseColor = new Color3(0.22, 0.89, 0.76);
    material.specularColor = new Color3(0, 0.5, 0.76);

    // Adding an action
    box.actionManager = new ActionManager(scene);
    box.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
            console.log("Clicked on box");

            // Setting the material on the box
            box.material = material;
        })
    );
};

const createHouse = (scene, positionCenter) => {
    const wallMaterial = new StandardMaterial();
    wallMaterial.diffuseTexture = new Texture("/assets/facade.jpg", scene);

    const house = MeshBuilder.CreateBox(
        "house",
        {height: 5, width: 5, depth: 5},
        scene
    );
    house.material = wallMaterial;
    house.position = positionCenter;

    const roofMaterial = new StandardMaterial();
    roofMaterial.diffuseColor = new Color4(0.5, 0.1, 0.1, 1);

    var roof = MeshBuilder.CreatePolyhedron(
        "roof",
        {type: 1, size: 2.8},
        scene
    );

    roof.material = roofMaterial;
    roof.setPositionWithLocalVector(
        new Vector3(positionCenter.x, positionCenter.y + 2.2, positionCenter.z)
    );
    roof.rotation.y = 0.79;
};

const createDuckParticleSystem = scene => {

    const duckParticleSystem = new ParticleSystem("dugs", 2000, scene);
    duckParticleSystem.particleTexture = new Texture("/assets/duck.png", scene);
    duckParticleSystem.emitter = new Vector3(0, 20, 0);
    duckParticleSystem.minEmitBox = new Vector3(-50, -10, -50);
    duckParticleSystem.maxEmitBox = new Vector3(50, 20, 50);
    duckParticleSystem.gravity = new Vector3(0, -10, 0);
    duckParticleSystem.emitRate = 2000;

    duckParticleSystem.start();
};

const createHeightMap = scene => {
    const ground = MeshBuilder.CreateGroundFromHeightMap(
        "ground",
        "/assets/Heightmap.png",
        {
            height: 100,
            width: 100,
            subdivisions: 800,
            minHeight: 0,
            maxHeight: 10
        },
        scene
    );

    const groundMaterial = new StandardMaterial();
    groundMaterial.diffuseTexture = new Texture("/assets/Heightmap.png", scene);

    ground.material = groundMaterial;
    return ground;
};

const physics = (scene, groundPlane) => {
    scene.enablePhysics();

    const sphere = MeshBuilder.CreateSphere("sphere", {diameter: 5});
    sphere.position = new Vector3(-5, 100, 0);
    sphere.physicsImpostor = new PhysicsImpostor(
        sphere,

        BABYLON.PhysicsImpostor.SphereImpostor,
        {mass: 2, restitution: 0.9},
        scene
    );

    groundPlane.physicsImpostor = new PhysicsImpostor(
        groundPlane,
        BABYLON.PhysicsImpostor.PlaneImpostor,
        {mass: 0, restitution: 0.1},
        scene
    );
};

const initGame = () => {

    // Grabbing the canvas
    const canvas = document.getElementById("babylon-canvas");

    // Initializing engine and scene
    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    // Initializing the light and the camera
    const light = new HemisphericLight("light", new Vector3(0, 10, 0), scene);

    const camera = new ArcRotateCamera(
        "camera",
        0,
        Math.PI / 3,
        10.0,
        new Vector3(0, 10, -30),
        scene
    );
    camera.attachControl(canvas, true);
    camera.setTarget(new Vector3(0, 0, 0));

    // Creating, configuring and positioning the box mesh
    createBox(scene);

    // Creating a bunch of houses with different positions
    createHouse(scene, new Vector3(20, 5, 20));
    createHouse(scene, new Vector3(0, 5, 20));
    createHouse(scene, new Vector3(10, 5, 10));
    createHouse(scene, new Vector3(20, 5, -10));
    createHouse(scene, new Vector3(-5, 2, -10));

    createDuckParticleSystem(scene);

    const heightMap = createHeightMap(scene);

    physics(scene, heightMap);

    // Getting the engine running
    engine.runRenderLoop(function () {
        scene.render();
    });
};

initGame();
