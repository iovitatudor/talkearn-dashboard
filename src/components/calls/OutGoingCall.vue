<template>

  <div>
    <div class="call ringing" v-if="isCalling">
      <div class="head">
        <div class="call-animation">
          <img
              src="https://back.talkearn.app/images/products/og/avataaars(1)182af3fbc793dc1fd5b23cad33ffa36053391fe0avataaars(1).png">
        </div>
      </div>

      <div class="details">Calling to Expert...</div>
      <ul class="actions">
        <li class="cancel-calling-btn">
          <v-btn
              class="mx-2"
              fab dark color="#E55854"
              @click="cancelCall"
          >
            <v-icon dark>mdi-phone-hangup</v-icon>
          </v-btn>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>

import beepSound from '@/assets/beepSound.mp3';
import busySound from '@/assets/busySound.mp3';

export default {
  name: "OutGoingCall",
  props: ['myId', 'recipientId'],
  data() {
    return {
      isCalling: false,
      sound: {},
      busySound: {},
      soundPlay: null,
      connectionTime: null,
    }
  },
  mounted() {
    this.beepSound = new Audio(beepSound);
    this.busySound = new Audio(busySound);
  },
  created() {
    this.sockets.subscribe(`outComingCall-${this.myId}`, (data) => {
      this.setOutGoingCall();
    });

    this.sockets.subscribe(`declineCall-${this.myId}`, (data) => {
      this.refuse();
    });

    this.sockets.subscribe(`startCall-${this.myId}`, (data) => {
      this.stopSound();
      this.startCall();
    });
  },
  methods: {
    setOutGoingCall() {
      this.isCalling = true;
      this.playSound();

      setTimeout(() => {
        this.$el.querySelector(".ringing").classList.remove('-fadeout');
      }, 600);

      this.connectionTime = setTimeout(() => {
        this.cancelCall();
        this.busySound.play()
      }, 75200)
    },

    refuse() {
      this.isCalling = false;
      this.stopSound();

      clearTimeout(this.connectionTime);
    },

    cancelCall() {
      this.$socket.emit('declineCall', JSON.stringify({senderId: this.myId, recipientId: this.recipientId}));
    },

    startCall() {
      clearTimeout(this.connectionTime);
      this.isCalling = false;
    },

    playSound() {
      this.beepSound.play()
      this.soundPlay = setInterval(() => {
        this.beepSound.play()
      }, 2900);
    },

    stopSound() {
      clearInterval(this.soundPlay);
      this.beepSound.pause();
      this.beepSound.currentTime = 0;
    },
  }
}
</script>

<style lang="scss">

</style>