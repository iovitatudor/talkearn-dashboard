<template>
  <div>

  </div>
</template>

<script>
export default {
  name: "InComingCall",
  props: ['signId'],
  created() {
    this.sockets.subscribe(`incomingCall-${this.signId}`, (data) => {
      console.log('incomingCall...');
    });
  }
}
</script>

<style scoped>

</style>