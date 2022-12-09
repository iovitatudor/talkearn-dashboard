<template>
  <v-menu open-on-hover top offset-y>

    <template v-slot:activator="{ on, attrs }">
      <v-btn dark plain v-bind="attrs" v-on="on">
        <v-icon dark>mdi-information-outline</v-icon>
      </v-btn>
    </template>

    <div class="info-details">
      <h5>Room: {{ room }}</h5>
      <h5>Sender: John Smith</h5>
      <h5>Recipient: Alex Black</h5>
    </div>
  </v-menu>
</template>

<script>
export default {
  name: "Info",
  props: ['room', 'sender', 'recipient'],
}
</script>