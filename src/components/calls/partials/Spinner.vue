<template>
  <div class="spinner">
    <div class="outer">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="inner">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Spinner"
}
</script>

<style scoped lang="scss">

.spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: rotate(-60deg);

  span {
    position: absolute;
    border: solid 10px transparent;
    border-top-width: 6px;
    border-bottom-width: 6px;
    display: block;
    transform: translate(-50%, -50%);
  }

  .outer {
    span {
      width: 50px;
      height: 26px;
      animation: destiny2-loading 3000ms infinite;

      &:nth-child(1) {
        animation-delay: 0s;
      }

      &:nth-child(2) {
        transform: translate(-50%, -50%) rotate(60deg);
        animation-delay: 500ms;
      }

      &:nth-child(3) {
        transform: translate(-50%, -50%) rotate(120deg);
        animation-delay: 1000ms;
      }
    }
  }

  .inner {
    span {
      width: 24px;
      height: 11px;
      animation: destiny2-loading 1500ms infinite;

      &:nth-child(1) {
        animation-delay: 500ms;
      }

      &:nth-child(2) {
        transform: translate(-50%, -50%) rotate(60deg);
        animation-delay: 250ms;
      }

      &:nth-child(3) {
        transform: translate(-50%, -50%) rotate(120deg);
        animation-delay: 0s;
      }
    }
  }
}

@keyframes destiny2-loading {
  0% {
    border-left-color: transparent;
    border-right-color: white;
  }
  30% {
    border-left-color: transparent;
    border-right-color: transparent;
  }
  50% {
    border-left-color: transparent;
    border-right-color: transparent;
  }
  50.00001% {
    border-left-color: white;
    border-right-color: transparent;
  }
  80% {
    border-left-color: transparent;
    border-right-color: transparent;
  }
  100% {
    border-left-color: transparent;
    border-right-color: transparent;
  }
}
</style>