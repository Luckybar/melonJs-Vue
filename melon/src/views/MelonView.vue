<script setup>
import {onMounted} from "vue";
import {resources} from "@/assets/resources.js";
import * as me from 'melonjs';
import {Container, Sprite} from 'melonjs';

// image card
class Card extends Sprite {
  constructor(x, y, settings) {
    super(x, y, {image: settings.sprite});
    // add a physic body
    this.body = new me.Body(this);
    this.body.gravityScale = 0;
    //
    this.body.setStatic();
    //
    this.isKinematic = false;
    this.anchorPoint.set(0, 0);
    this.displayTween = null;
  }

  // change the card position
  changePosition(x, y) {
    this.displayTween = me.pool.pull("me.Tween", this.pos).to({x, y }, 1000);
    this.displayTween.easing(me.Tween.Easing.Quadratic.Out);
    this.displayTween.start();
  }
}

class CardBoard extends Container {
  constructor(x, y, width, height, settings) {
    super(x, y, width, height);
    this.anchorPoint.set(0.5, 0.5);
  }
}

class PlayScreen extends me.Stage {
  onResetEvent() {
    me.game.world.addChild(new me.ColorLayer("background", "#5E3F66"), 0);

    const container = new CardBoard(me.game.viewport.width / 2, me.game.viewport.height / 2, 360, 360);

    container.addChild(new Card(0, 0, {sprite: "card-1"}), 1);
    container.addChild(new Card(0, 120, {sprite: "card-1"}), 1);
    container.addChild(new Card(0, 240, {sprite: "card-1"}), 1);
    container.addChild(new Card(120, 0, {sprite: "card-2"}), 1);
    container.addChild(new Card(120, 120, {sprite: "card-2"}), 1);
    container.addChild(new Card(120, 240, {sprite: "card-2"}), 1);
    container.addChild(new Card(240, 0, {sprite: "card-3"}), 1);
    container.addChild(new Card(240, 120, {sprite: "card-3"}), 1);
    container.addChild(new Card(240, 240, {sprite: "card-3"}), 1);

    me.input.registerPointerEvent("pointerdown", me.game.viewport, this.pointerDown.bind(this, container));

    me.game.world.addChild(container, 1);
  }

  // switch two cards
  switchCards(card1, card2) {
    card1.changePosition(card2.pos.x, card2.pos.y);
    card2.changePosition(card1.pos.x, card1.pos.y);
  }

  getRandomNumbers() {
    let numbers = [];
    while(numbers.length < 2){
      var r = Math.floor(Math.random() * 9);
      if(numbers.indexOf(r) === -1) numbers.push(r);
    }
    return numbers;
  }


  pointerDown(container) {
    const targets = this.getRandomNumbers();
    const card1 = container.children[targets[0]];
    const card2 = container.children[targets[1]];
    console.log(card1.pos, card2.pos);
    this.switchCards(card1, card2);
  }
}

onMounted(() => {
  // Initialize the video.
  me.device.onReady(() => {
    if (!me.video.init(1024, 768, {parent : "screen", scale : "auto"})) {
      alert("Your browser does not support HTML5 canvas.");
      return;
    }

    // initialize the "sound engine"
    me.audio.init("mp3,ogg");

    // set all ressources to be loaded
    me.loader.preload(resources, () => {
      // set the "Play/Ingame" Screen Object
      me.state.set(me.state.PLAY, new PlayScreen());
      // set a fade transition effect
      me.state.transition("fade","#000000", 250);
      // start the game
      me.state.change(me.state.PLAY);
    });
  })
})
</script>

<template>
  <div id="screen">
  </div>
</template>
