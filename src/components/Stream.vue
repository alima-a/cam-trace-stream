<template>
  <div class="stream">
    <h1 class="stream__title">CamTrace stream</h1>
    <button class="stream__btn" @click="startConnect"> Connect to video stream</button>
    <div class="stream__player">
      <canvas ref="canvas" id="canvas" width="640" height="360" style="width: 640px; height: 360px;"></canvas>
    </div>
  </div>
</template>

<script>
import { onBeforeUnmount, ref } from 'vue';
import jsmpeg from 'jsmpeg';
import io from 'socket.io-client';

export default {
  name: 'Stream',
  setup() {
    const canvas = ref(null);
    const host = new URL('ws://localhost:8008/');
    let socket = null;
    let player = null;

    const startConnect = () => {
      console.log('startConnect');
      console.log('canvas', canvas.value);
      socket = io(host, { transports: ['websocket'] });
      player = new jsmpeg('pipe', {
        canvas: canvas.value,
      });

      socket.on('connect', () => {
        //pretend this is the command you use to initiate getting
        socket.emit('f', { function: 'getStream', feed: '2' });
      });

      //on data from "h264" handle (h265)
      socket.on('h264', (data) => {
        // `data.buffer` is the raw video data from FFMPEG
        // pretend you are getting data as follows
        // var data = { buffer:ArrayBuffer }
        console.log(data);
        player.write(data.buffer);
      });
    }

    onBeforeUnmount(() => {
      socket.removeAllListeners('connect');
      if(player) player.destroy();
    });

    return {
      startConnect,
      canvas,
    }
  },
}
</script>

<style scoped>
.stream__btn {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
.stream__btn:active {
  background-color: #3d9541;
}
h3 {
  margin: 40px 0 0;
}
</style>
