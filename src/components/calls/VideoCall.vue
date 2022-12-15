<template>
  <div class="video-container">
    <div class="call speaking flip-back">

      <div v-if="inCall">

        <div id="remote-video" class="remote-video">
          <div id="local-video" class="local-video"></div>
        </div>

        <spinner v-if="loading"/>

        <ul class="actions video-actions">
          <li class="action">
            <v-btn
                class="mx-2"
                dark color="#E55854"
                @click="decline"
            >
              <v-icon dark>mdi-phone-hangup</v-icon>
            </v-btn>
          </li>
          <li class="info-action">
            <info :room="room" :sender="'John Smith'" :recipient="'Alex Black'"/>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import * as twilio from 'twilio-video';
import busySound from '@/assets/busySound.mp3';
import Spinner from "@/components/calls/partials/Spinner";
import Info from "@/components/calls/partials/Info";

export default {
  name: "VideoCall",
  props: ['myId', 'recipientId'],
  components: {Spinner, Info},
  data() {
    return {
      loading: true,
      inCall: false,
      busySound: {},
      token: null,
      room: null,
    };
  },
  mounted() {
    this.busySound = new Audio(busySound);
  },
  created() {
    this.sockets.subscribe(`declineCall-${this.myId}`, (data) => {
      this.endCall();
      if (this.inCall) {
        this.inCall = false;
        setTimeout(() => {
          window.location.reload();
        }, 2000)
      }
    });

    this.sockets.subscribe(`startCall-${this.myId}`, (data) => {
      const dataObject = JSON.parse(data);
      this.room = dataObject.room;
      this.startCall();
    });
  },
  methods: {
    async startCall() {
      this.inCall = true;
      this.$el.querySelector(".speaking").classList.remove('flip-back');
      this.$el.querySelector(".speaking").classList.remove('-drop');

      await this.getToken();
      await this.connectToRoom();
    },

    endCall() {
      this.busySound.play();
      this.$el.querySelector(".speaking").classList.add('-drop');
    },

    decline() {
      this.$socket.emit('declineCall', JSON.stringify({senderId: this.myId, recipientId: this.recipientId}));
    },

    async getToken() {
      const result = await axios.get(
          `${process.env.VUE_APP_BACKEND_URL}/api/calls/token?identity=identity${this.myId}${this.recipientId}`
      );
      this.token = result.data.token;
    },

    async connectToRoom() {
      let audioOutputDevice;

      await navigator.mediaDevices.enumerateDevices().then(devices => {
        audioOutputDevice = devices.find(device => device.kind === 'audiooutput');
      })

      await twilio.connect(this.token, {name: this.room, type: 'peer-to-peer'}).then(room => {

        const localVideo = this.$el.querySelector('#local-video');
        const remoteVideo = this.$el.querySelector('#remote-video');

        twilio.createLocalVideoTrack().then(track => {
          localVideo.appendChild(track.attach());
          setTimeout(() => localVideo.classList.add('animate'), 200);
        })

        room.on('trackAdded', track => {
          if (track.kind === 'audio') {
            const audioElement = track.attach();
            audioElement.setSinkId(audioOutputDevice.deviceId).then(() => {
              document.body.appendChild(audioElement);
            })
          }
        })

        room.participants.forEach(participant => {
          participant.on('trackSubscribed', track => {
            this.loading = false;
            remoteVideo.appendChild(track.attach())
            setTimeout(() => remoteVideo.classList.add('animate'), 200);
          })
        })

        room.on('participantConnected', participant => {
          console.log('participantConnected')
          participant.tracks.forEach(publication => {
            if (publication.isSubscribed) {
              const track = publication.track
              this.loading = false;
              remoteVideo.appendChild(track.attach())
              setTimeout(() => remoteVideo.classList.add('animate'), 200);
            }
          })
          participant.on('trackSubscribed', track => {
            this.loading = false;
            remoteVideo.appendChild(track.attach())
            setTimeout(() => remoteVideo.classList.add('animate'), 200);
          })
        })

        room.on('disconnected', room => {
          room.localParticipant.videoTracks.forEach(publication => {
            publication.track.disable()
            publication.track.stop()
            publication.unpublish()
          })
        })
      }, error => {
        console.error(`Unable to connect to Room: ${error.message}`)
      })
    },
  }
}
</script>

<style lang="scss">
.video-container {
  .video-actions {
    position: absolute;
    bottom: 15px;
    left: 0;
    padding: 20px;
    background-image: url("../../assets/colorful-sound-wave-equalizer-2.png");
    background-repeat: no-repeat;
    background-size: auto 50%;
    background-position: 2% center;

    .info-action {
      position: absolute;
      right: 1%;
    }
  }

  .speaking {
    position: relative;
  }

  .local-video {
    height: 30%;
    margin-bottom: calc(var(--aspect-ratio, .5625) * 100%);
    overflow: hidden;
    position: absolute;
    z-index: 99;
    right: 7.5%;
    top: 12px;
    transform: scale(0);
    transition: 0.5s;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  }

  .remote-video {
    height: 100%;
    position: absolute;
    overflow: hidden;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: 0 auto;
    padding: 12px;
    transform: scale(0);
    transition: 0.5s;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  }

  .speaking {
    video {
      height: 100%;
      margin: 0 auto;
      display: block;
    }
  }

  .local-video-animate {
    transform: scale(1);
  }

  .animate {
    transform: scale(1);
  }

  @media screen and (max-width: 600px) {
    .remote-video {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .local-video {
      width: 30%;
      height: auto;
    }
    .speaking {
      video {
        width: 100%;
        height: auto;
      }
    }
  }
}

.info-details {
  padding: 20px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  color: #FFF;

  h5 {
    margin-bottom: 15px;
  }
}

</style>