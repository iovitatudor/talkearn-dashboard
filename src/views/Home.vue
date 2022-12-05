<template>
  <div class="home">

    <AppCall/>

<!--    <IncommingCall></IncommingCall>-->
<!--    <ul>-->
<!--      <li v-for="(message, key) in messages" v-bind:key="key">-->
<!--        {{ message }}-->
<!--      </li>-->
<!--    </ul>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import IncommingCall from '@/components/incommingCall'
import AppCall from '@/components/calls/AppCall';

export default {
  name: "Home",
  components: {IncommingCall, AppCall},
  computed: mapGetters({
    messages: 'messages',
  }),
};
</script>
