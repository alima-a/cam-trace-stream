<template>
  <div class="stream">
    <h1 class="stream__title">CamTrace stream</h1>
    <div class="stream__player">
      <canvas ref="canvas" id="canvas" width="640" height="360" style="width: 640px; height: 360px;"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import JSMpeg from "../libs/jsmpeg.pipe.js";
import io from 'socket.io-client';

const canvas = ref(null);
const ip = import.meta.env.VITE_APP_IP;
const port = import.meta.env.VITE_APP_PORT;
// must match the host on the server
const host = `http://${ip}:${port}`;
let socket = null;
let player = null;

onMounted(() => {
  socket = io(host, { transports: ['websocket'] });
  player = new JSMpeg.Player('pipe',{
    canvas: canvas.value,
  });

  socket.on('connect', () => {
    //pretend this is the command you use to initiate getting
    socket.emit('f', { function: 'getStream', feed: '2' });
  });

  //on data from "h265" handle
  socket.on('h265', (data) => {
    // `data.buffer` is the raw video data from FFMPEG
    // pretend you are getting data as follows
    if(player) player.write(data.buffer);
  });
})

onBeforeUnmount(() => {
  socket.removeAllListeners('connect');
  if(player) player.destroy();
});
</script>

<style scoped lang="scss">
.stream {
  &__title {
    margin: 40px 0;
  }
}
</style>
