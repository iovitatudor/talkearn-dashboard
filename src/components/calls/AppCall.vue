<template>

  <div class="call-app">
    <div class="test-expert text-center mt-12">
      <v-btn
          class="mx-2 mt-12"
          fab dark color="#2ECC71"
          @click="initCall"
      >
        <v-icon dark>mdi-phone-in-talk</v-icon>
      </v-btn>
    </div>

    <div class="call-container">
      <out-going-call :myId='myId' :recipientId='recipientId'/>
      <in-coming-call :myId='myId' :recipientId='recipientId'/>
      <video-call :myId='myId' :recipientId='recipientId'/>
    </div>

  </div>

</template>

<script>

import InComingCall from "@/components/calls/InComingCall";
import OutGoingCall from "@/components/calls/OutGoingCall";
import VideoCall from "@/components/calls/VideoCall";

export default {
  name: "AppCall",
  components: {
    InComingCall,
    OutGoingCall,
    VideoCall,
  },
  data() {
    return {
      callProcess: false,
      myId: null,
      recipientId: null,
    }
  },
  created() {
    this.myId = this.$route.query.myId;
    this.recipientId = this.$route.query.recipientId;

    this.sockets.subscribe(`startCall-${this.myId}`, (data) => {
      this.startCall();
    });

    this.sockets.subscribe(`declineCall-${this.myId}`, (data) => {
      this.endCall();
    });
  },
  methods: {
    initCall() {
      const data = {
        senderId: this.myId,
        recipientId: this.recipientId,
      };
      if (!this.callProcess) {
        this.$socket.emit('initCall', JSON.stringify(data));
      }
    },

    startCall() {
      this.callProcess = true;
      setTimeout(() => {
        this.$el.querySelector('.call-container').classList.add('container-increased');
      }, 10);
    },

    endCall() {
      this.$el.querySelector('.call-container').classList.remove('container-increased');
      this.callProcess = false;
    }
  }
}
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Chakma&display=swap');

$color: #ecf0f1;
$color_minor: rgba(255, 255, 255, 0.6);
$color_haze: rgba(255, 255, 255, 0.2);
$dark: #000;
$blue: #5f4bdb;

.h-list {
  margin: 0;
  padding: 0;
  list-item-style: none;

  > li {
    display: inline-block;
  }
}

.call-app {
  .call-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 310px;
    width: 310px;
    margin: 0;
    perspective: 600px;
    font-family: 'Roboto', serif;
    padding: 0;
  }

  .container-increased {
    height: 80vh;
    width: 70%;
    -webkit-transition: .7s ease-in-out;
    -moz-transition: .7s ease-in-out;
    -o-transition: .7s ease-in-out;
    transition: .7s ease-in-out;
  }

  .call {
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    color: $color;
    padding: 10px;
    border-radius: 4px;
    transition: all 1s,
    background-color 600ms,
    opacity 600ms;
    backface-visibility: hidden;
  }

  .ringing {
    z-index: 10;
    background-color: $blue;
    height: 100%;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  }

  .speaking {
    background-color: $dark;
    height: 100%;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  }

  .details {
    color: $color;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    padding: 10px;
    font-family: 'Noto Sans Chakma', sans-serif;
  }

  .actions {
    @extend .h-list;
    width: 100%;
    padding: 2px 16px;
    box-sizing: border-box;
    text-align: center;
  }

  .action {
    margin-left: -2px;
    margin-right: -2px;
    width: auto;
    padding: 0 8px 0 12px;
    box-sizing: border-box;
    color: #FFF;

    > a {
      width: 100%;
      text-align: center;
      display: inline-block;
      box-sizing: border-box;
      padding: 5px 8px;
      text-decoration: none;
      font-size: 12px;
      font-weight: bold;
      border-radius: 4px;
      color: $color_minor !important;
      border: 1px solid $color_minor;

      &:hover {
        background-color: $color_haze;
      }
    }
  }

  /* animation */
  .-fadeout {
    filter: blur(6px);
    opacity: 0;
  }

  .-drop {
    filter: blur(6px);
    opacity: 0;
    transform: translateY(20%) rotateX(20deg);
  }

  .-flip {
    transform: rotateY(180deg);
  }

  .flip-back {
    transform: rotateY(-180deg);
  }

  .-ringing {
    animation: _ringing 1000ms infinite;
    animation-fill-mode: forward;
    animation-direction: normal;
    animation-timing-function: linear;
  }

  @keyframes _ringing {
    0% {
      transform: translate(0, 0);
    }
    10% {
      transform: translate(6px, 0px);
      transform: rotateZ(2deg);
    }
    20% {
      transform: translate(-6px, 0px);
      transform: rotateZ(-2deg);
    }
    30% {
      transform: translate(3px, 0px);
      transform: rotateZ(1deg);
    }
    40% {
      transform: translate(-3px, 0px);
      transform: rotateZ(-1deg);
    }
    50% {
      transform: translate(2px, 0px);
      transform: rotateZ(1deg);
    }
    60% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  }

  .cancel-calling-btn {
    width: 100%;
    display: block;
    text-align: center;
    list-style-type: none;
    margin-top: 25px;
  }

  .call-animation {
    width: 100px;
    height: 100px;
    position: relative;
    margin: 20px auto;
    border-radius: 100%;
    animation: play 2.8s ease infinite;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .calling {
    color: white;
    margin: 50px auto;
    text-align: center;
    width: 400px;
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    position: absolute;
    right: 0;

  }

  @keyframes play {
    0% {
      transform: scale(1);
    }
    15% {
      box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.4);
    }
    25% {
      box-shadow: 0 0 0 10px rgba(255, 255, 255, 0.4), 0 0 0 20px rgba(255, 255, 255, 0.2);
    }
    25% {
      box-shadow: 0 0 0 15px rgba(255, 255, 255, 0.4), 0 0 0 30px rgba(255, 255, 255, 0.2);
    }
  }

  @media screen and (max-width: 600px) {
    .container-increased {
      width: 100%;
    }
  }
}


</style>