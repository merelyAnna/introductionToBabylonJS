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
  Texture
} from "babylonjs";

const createDuckParticleSystem = scene => {
  const duckParticleSystem = new ParticleSystem("dugs", 2000, scene);
  duckParticleSystem.particleTexture = new Texture("/assets/duck.png", scene);
  duckParticleSystem.emitter = new Vector3(0, 20, 0);
  duckParticleSystem.minEmitBox = new Vector3(-20, -20, -20);
  duckParticleSystem.maxEmitBox = new Vector3(20, 20, 20);
  duckParticleSystem.gravity = new BABYLON.Vector3(0, -10, 0);
  duckParticleSystem.emitRate = 999;
  duckParticleSystem.start();
};

const physics = scene => {
  scene.enablePhysics();
  sphere.physicsImpostor = new PhysicsImpostor(
    sphere,
    BABYLON.PhysicsImpostor.SphereImpostor,
    { mass: 1, restitution: 0.9 },
    scene
  );
};

const initGame = () => {
  const canvas = document.getElementById("babylon-canvas");

  const engine = new Engine(canvas, true);
  const scene = new Scene(engine);

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

  //Creating the box mesh
  const box = MeshBuilder.CreateBox(
    "box",
    { width: 10, height: 10, depth: 10 },
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

  // Creating the material
  const material = new StandardMaterial("material");
  material.diffuseColor = new Color3(0.22, 0.89, 0.76);
  material.specularColor = new Color3(0, 0.5, 0.76);

  // Adding an action
  box.actionManager = new ActionManager(scene);
  box.actionManager.registerAction(
    new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
      console.log("Clicked on box");
      box.material = material;
    })
  );

  createDuckParticleSystem(scene);

  engine.runRenderLoop(function() {
    scene.render();
  });
};

initGame();
