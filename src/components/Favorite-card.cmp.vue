<template>
  <section class="favorites-card">
    <div @click.stop="setCurrCard" class="favorite-card" :class="[setRandomImageClass, setBgcColor()]">
      <button @click.stop="removeFromFavorites">X</button>
      <CurrdayDetails :cityData="cityData" />
      <FutureDetails :cityData="cityData" />
    </div>
  </section>
</template>

<script lang="ts">

import CurrdayDetails from './Currday-details.cmp.vue';
import FutureDetails from './Future-details.cmp.vue';

export default {
  props: {
    cityData: {
      type: Object,
      required: true
    }
  },
  computed: {
    setRandomImageClass() {
      return `img-${this.getRandomInt(4)}`;
    }
  },
  methods: {
    setCurrCard() {
      this.$store.commit("setCurrCard", { card: this.cityData });
      this.$router.push("/");
    },
    removeFromFavorites() {
      this.$store.dispatch({ type: "toggleFavorite", currCard: this.cityData });
    },
    setBgcColor() {
      let num = this.$store.getters.colorNum;
      return (num <= 5 || num >= 20) ? "darkTheme" : "lightTheme";
    },
    getRandomInt(max: number) {
      return Math.floor(Math.random() * max);
    }
  },
  components: { CurrdayDetails, FutureDetails }
}
</script>

<style lang="scss" scoped>
@import "./src/styles/setup/_mixins.scss";
@import "./src/styles/setup/_typography.scss";
@import "./src/styles/setup/_variables.scss";

.favorite-card {
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  min-width: 300px;
  height: 400px;
  color: white;
  margin: 30px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  padding-top: 70px;
  text-align: center;
  background-blend-mode: multiply;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  border-radius: 8px;
  width: 88vw;

  @include for-narrow-layout {
    width: 30vw;
  }

  @include for-normal-layout {
    width: 30vw;
  }

  @include for-wide-layout {
    width: 45vw;
  }
  

  &.darkTheme {
        background-color: rgba(37, 37, 37, 0.8);
  }
  &.img-1 {
    background-image: url('@/assets/favorites-bg/1.jpg');
  }

  &.img-2 {
    background-image: url('@/assets/favorites-bg/2.jpg');
  }

  &.img-3 {
    background-image: url('@/assets/favorites-bg/3.jpg');
  }

  &.img-0 {
    background-image: url('@/assets/favorites-bg/0.jpg');
  }


  button {
    background-color: transparent;
    color: grey;
    border: none;
    width: 40px;
    font-size: 1.3rem;
    position: absolute;
    right: 2px;
    top: 9px;
    cursor: pointer;

    &:hover {
      color: rgb(255, 255, 255);
    }
  }


}
</style>
