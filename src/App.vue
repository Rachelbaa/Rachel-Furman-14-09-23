<template>
  <div id="app">
    <ColorPicker @hoverColor="hoverColor" @unhoverColor="unhoverColor" class="colorPicker" @setedColor="closePicker" v-if="colorPickerClicked" />
    <div class="app-container" :class="color">
      <AppHeader @colorPClicked="setColorPicker" :colorPickerClicked="colorPickerClicked" />
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import ColorPicker from './components/Color-picker.vue';
import AppHeader from './components/App-header.cmp.vue';


export default {
  name: "App",
  data() {
    return {
      color: '',
      colorPickerClicked: false
    };
  },
  created() {
    this.setFirstColor();
  },
  methods: {
    setFirstColor() {
      let num = new Date().getHours()
      let className = 'sky-gradient-';
      className += (num < 10) ? `0${num}` : num;
      if (num <= 5 || num >= 20) {
        className += ' darkTheme'
      }
      this.color = className;
      this.$store.commit({ type: 'setBgc', color: this.color })
      this.$store.commit({ type: 'setColorNum', num })
    },
    setColor(num: number) {
      let className = 'sky-gradient-';
      className += (num < 10) ? `0${num}` : num;
      if (num <= 5 || num >= 20) {
        className += ' darkTheme'
      }
      this.color = className;
    },
    hoverColor(num: number) {
      this.setColor(num)
    },
    unhoverColor() {
      let bgc = this.$store.getters.bgc;
      this.color = bgc;
    },
    closePicker() {
      this.colorPickerClicked = false;
    },
    setColorPicker(isClicked: boolean) {
      this.colorPickerClicked = isClicked;
    }
  },
  computed: {
    setBgcColor(): string {
      let num = this.$store.getters.colorNum;
      return (num <= 5 || num >= 20) ? 'darkTheme' : 'lightTheme';
    },


  },
  components: { ColorPicker, AppHeader }
}
</script>

<style lang="scss" scoped>
@import "./src/styles/setup/_mixins.scss";
@import "./src/styles/setup/_typography.scss";
@import "./src/styles/setup/_variables.scss";


body,
html {
  margin: 0;
}

#app {

  font-family: Segoe UI, Helvetica Neue, Helvetica, Lucida Grande, Arial, Ubuntu, Cantarell, Fira Sans, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: none;
  -moz-overflow: none;
  display: flex;




  .colorPicker {
    transition: all 0.8s ease;
    transition-delay: 20ms;
  }

  .app-container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

}</style>
