import { createApp } from 'vue'
import App from './App.vue'
import io from 'socket.io-client';

const app =  createApp(App);

const websocketHostname = 'http://192.168.0.100:8008/'

app.config.globalProperties.$soketio = io(websocketHostname);
app.mount('#app');
