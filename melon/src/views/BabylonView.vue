<template>
  <div>
    <canvas ref="bjsCanvas" width="1024px" height="768px"/>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import * as BABYLON from "babylonjs";


const bjsCanvas = ref(null)
// Get the canvas DOM element
const createScene = function (canvas, engine) {
  const scene = new BABYLON.Scene(engine);

  // BABYLON.MeshBuilder.CreateBox("box", {});
  const materialCard1 = new BABYLON.StandardMaterial("");
  materialCard1.diffuseTexture = new BABYLON.Texture('/img/card-1.svg');
  materialCard1.diffuseTexture.hasAlpha = true;

  const materialCard2 = new BABYLON.StandardMaterial("");
  materialCard2.diffuseTexture = new BABYLON.Texture('/img/card-2.svg');
  materialCard2.diffuseTexture.hasAlpha = true;

  const materialCard3 = new BABYLON.StandardMaterial("");
  materialCard3.diffuseTexture = new BABYLON.Texture('/img/card-3.svg');
  materialCard3.diffuseTexture.hasAlpha = true;

  const f = new BABYLON.Vector4(0,0, 1, 1); // front image = half the whole image along the width

  const cardBoard = new BABYLON.TransformNode('cardBoard');
  cardBoard.position = new BABYLON.Vector3(-2,  -2, 0);

  for(let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const card = BABYLON.MeshBuilder.CreatePlane("plane", {size:2, frontUVs: f});
      card.material = i === 0 ? materialCard1 : i === 1 ? materialCard2 : materialCard3;
      card.position.x = i * 2;
      card.position.y = j * 2;
      card.parent = cardBoard;
    }
  }

  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2, 15, new BABYLON.Vector3(0, 0, 0));
  camera.attachControl(canvas, false)

  // 创建方向光
  scene.ambientColor = new BABYLON.Color3(1, 1, 1);
  const light = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, 0, 1), scene);
  light.intensity = 0.5;

  // randon pick two cards change their position
  const getRandomNumbers = () =>{
    let numbers = [];
    while(numbers.length < 2){
      var r = Math.floor(Math.random() * 9);
      if(numbers.indexOf(r) === -1) numbers.push(r);
    }
    return numbers;
  }

  const changePosition = (card1, card2) => {
    const card1Switch = new BABYLON.Animation("card1Switch", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const card2Switch = new BABYLON.Animation("card2Switch", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keysCard1 = [
      { frame: 0, value: card1.position },
      { frame: 30, value: card2.position },
    ];
    const keysCard2 = [
      { frame: 0, value: card2.position },
      { frame: 30, value: card1.position },
    ];
    card1Switch.setKeys(keysCard1);
    card2Switch.setKeys(keysCard2);
    //group animation
    const group = new BABYLON.AnimationGroup("switchCards");
    group.addTargetedAnimation(card1Switch, card1);
    group.addTargetedAnimation(card2Switch, card2);
    group.normalize(0, 30);
    group.speedRatio = 1.5;
    group.play();
  }

  scene.onPointerDown = function (evt, pickInfo) {
    const targets = getRandomNumbers();
    const cards = cardBoard.getChildren();
    const card1 = cards[targets[0]];
    const card2 = cards[targets[1]];
    changePosition(card1, card2);
  };



  return scene;
};

onMounted( () => {
  if(bjsCanvas.value) {
    const canvas = bjsCanvas.value
    const engine = new BABYLON.Engine(canvas, true);
    const scene = createScene(canvas, engine);

    engine.runRenderLoop(function () {
      scene.render();
    });

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
      engine.resize();
    });
  }
})
</script>

<style scoped>

</style>
