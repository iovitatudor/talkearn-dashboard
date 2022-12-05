<template>

  <div>

    <div class="test-expert">
      <button @click="initCall">
        call
      </button>
    </div>

    <in-coming-call :signId="expertId"/>
    <out-coming-call :signId="clientId"/>
    <video-call/>
    <!--    incoming call  -->
    <!--    outcoming call -->
    <!--    videoCall -->
  </div>

</template>

<script>

import InComingCall from "@/components/calls/InComingCall";
import OutComingCall from "@/components/calls/OutComingCall";
import VideoCall from "@/components/calls/VideoCall";

export default {
  name: "AppCall",
  components: {
    InComingCall,
    OutComingCall,
    VideoCall,
  },
  data() {
    return {
      expertId: 1,
      clientId: 1,
    }
  },
  sockets: {
    // messageToClient(mess) {
    //   console.log(mess, 'v;fdm;');
    // },
  },
  created() {
  },
  methods: {
    initCall() {
      const data = {
        senderId: this.clientId,
        recipientId: this.expertId,
      };

      this.$socket.emit('initCall', JSON.stringify(data));
    },
  }
}
</script>