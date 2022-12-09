<template>

  <div class="container">
    <div class="call ringing">
      <div class="head"><i class="fa fa-bell"></i></div>
      <div class="details">Sia is calling...</div>
      <ul class="actions">
        <li class="action"><a id="accept" href="#">Accept</a></li>
        <li class="action"><a id="refuse" href="#">Refuse</a></li>
      </ul>
    </div>
    <div class="call speaking flipback">
      <div class="head">
        <div class="sound"><span class="fa-stack"><i class="fa fa-volume-off fa-stack-1x"></i><i
            class="fa fa-ban fa-stack-1x"></i></span></div>
        <i class="fa fa-phone"></i>
        <canvas id="eq"></canvas>
      </div>
      <div class="details">Sia</div>
      <ul class="actions">
        <li class="action"><a id="hold" href="#">Hold</a></li>
        <li class="action"><a id="drop" href="#">Drop</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "IncommingCall",

  mounted() {
    this.setRinging();
  },
  methods: {
    setRinging() {
      setTimeout( () => {
        this.$el.querySelector(".ringing").classList.add('-ringing');
      }, 600);
    },

  }
};
</script>

<style lang="scss">
$color: #ecf0f1;
$color_minor: rgba(255, 255, 255, 0.6);
$color_haze: rgba(255, 255, 255, 0.2);
$red: #ff7980;
$green: #88cfaf;
$blue: #80bbee;
$yellow: #E9B863; /*#E6B146*/

/* base */

body {
  color: #444;
  background-color: #f1f1f1;
  font-family: "Helvetica Neue", "Arial", sans-serif;
}

a {
  cursor: pointer;
}

.h-list {
  margin: 0;
  padding: 0;
  list-item-style: none;

  > li {
    display: inline-block;
  }
}

/* main */

.container {
  position: relative;
  height: 140px;
  width: 300px;
  margin: 20px auto;
  perspective: 600px;
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
}

.hold {
  background-color: $yellow !important;
}

.speaking {
  background-color: $green;
}

.wrapup {
  background-color: $red;
}

/* inner */

.head {
  font-size: 42px;
  text-align: center;
  margin: 0 auto;
}

.details {
  color: $color;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
}

.actions {
  @extend .h-list;
  width: 100%;
  padding: 2px 16px;
  box-sizing: border-box;
}

.action {
  margin-left: -2px;
  margin-right: -2px;
  width: 50%;
  padding: 0 8px 0 12px;
  box-sizing: border-box;

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
    color: $color_minor;
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

.flipback {
  transform: rotateY(-180deg);
}

.-ringing {
  animation: _ringing 600ms infinite;
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

/* eq */

.hidden {
  display: none;
}

.sound {
  font-size: 26px;
  position: absolute;
  top: -6px;
  right: -6px;
  opacity: .2;
  cursor: pointer;
}

.sound:hover {
  opacity: .5;
}

.fa-ban {
  color: tomato;
}

.head {
  height: 46px;
}

#eq {
  width: 220px;
  height: 46px;
}

</style>