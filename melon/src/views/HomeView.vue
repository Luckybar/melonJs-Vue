<script setup>
import {onMounted} from "vue";
import * as me from "@/assets/melonjs.module.js";
import {audio, game} from "@/assets/melonjs.module.js";
import icon from "@/assets/img/logo.svg";

onMounted(() => {
  me.device.onReady(function () {
    me.video.init(640, 480, {
      parent : "screen",
      renderer : me.video.AUTO,
      scale : "auto",
      scaleMethod : "fit"
    });

    let resources = [
      {name: "icon", type: "image", src: icon},
      {name: "main-bgm", type: "audio", src: '/'},
    ];

    me.audio.init("mp3");

    me.loader.preload(resources, function () {
      audio.play("main-bgm");
    });

    me.loader.onError = function (e) {
      console.log("Error loading resource: " + e.src);
      console.log(e);
    };

  });
})



</script>

<template>
  <div id="screen">
  </div>
</template>
