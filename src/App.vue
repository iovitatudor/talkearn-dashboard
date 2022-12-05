<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />

<!--    <input type="text" v-model="message">-->
<!--    <button @click="sendEvent">Ping</button>-->
  </div>
</template>

<script>

import SocketioService from './services/socketio.service.js';

export default {
  name: "App",
  components: {},
  data() {
    return {
      socket: null,
      message: null,
    }
  },
  sockets: {
    connect: function () {
      console.log("socket starts");
    },
    custumEmit: function (data) {
      console.log(data);
    }
  },
  created() {
    // this.socket = SocketioService.setupSocketConnection();
    // this.socket.on("messageToClient", (mes) => {
    //   console.log(mes);
    // });
    // console.log('lvmdflmvfl');
  },
  methods: {
    sendEvent() {
      this.$socket.emit("messageToServer", this.message);
      this.message = '';

    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
