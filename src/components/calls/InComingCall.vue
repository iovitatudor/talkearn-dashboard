<template>

  <div>
    <div class="call ringing" v-if="isCalling">
      <div class="head">
        <div class="call-animation">
          <img
              src="https://back.talkearn.app/images/products/og/avataaars(1)182af3fbc793dc1fd5b23cad33ffa36053391fe0avataaars(1).png"
              alt="">
        </div>
      </div>
      <div class="details">User is calling</div>
      <ul class="actions">
        <li class="cancel-calling-btn">

          <v-btn
              class="mx-2"
              fab dark color="#2ECC71"
              @click="accept"
          >
            <v-icon dark>mdi-phone-in-talk</v-icon>
          </v-btn>

          <v-btn
              class="mx-2"
              fab dark color="#E55854"
              @click="refuse"
          >
            <v-icon dark>mdi-phone-hangup</v-icon>
          </v-btn>

        </li>
      </ul>
    </div>
  </div>

</template>

<script>

import busySound from '@/assets/busySound.mp3';
import callSound from '@/assets/callSound.mp3';

export default {
  name: "InComingCall",
  props: ['myId', 'recipientId'],
  data() {
    return {
      isCalling: false,
      callSound: {},
      busySound: {},
      soundPlay: null,
      connectionTime: null,
    }
  },
  mounted() {
    this.callSound = new Audio(callSound);
    this.busySound = new Audio(busySound);
  },
  created() {
    this.sockets.subscribe(`inComingCall-${this.myId}`, (data) => {
      this.setInComingCall();
    });

    this.sockets.subscribe(`declineCall-${this.myId}`, (data) => {
      this.stopSound();
      this.endCall();
    });

    this.sockets.subscribe(`startCall-${this.myId}`, (data) => {
      this.stopSound();
      this.startCall();
    });
  },
  methods: {
    setInComingCall() {
      this.isCalling = true;
      this.playSound();

      setTimeout(() => {
        this.$el.querySelector('.ringing').classList.remove('-fadeout');
        this.$el.querySelector('.ringing').classList.add('-ringing');
      }, 600);

      this.connectionTime = setTimeout(() => {
        this.refuse();
        this.busySound.play()
      }, 20000)
    },

    playSound() {
      this.callSound.play()
      this.soundPlay = setInterval(() => {
        this.callSound.play()
      }, 2900);
    },

    stopSound() {
      clearInterval(this.soundPlay);
      this.callSound.pause();
      this.callSound.currentTime = 0;
    },

    accept() {
      this.$socket.emit('startCall', JSON.stringify({senderId: this.myId, recipientId: this.recipientId}));
    },

    refuse() {
      this.$socket.emit('declineCall', JSON.stringify({senderId: this.myId, recipientId: this.recipientId}));
    },

    startCall() {
      this.stopSound();
      clearTimeout(this.connectionTime);
      this.isCalling = false;
    },

    endCall() {
      this.isCalling = false;
      this.stopSound();
      clearTimeout(this.connectionTime);
    },
  }
}
</script>