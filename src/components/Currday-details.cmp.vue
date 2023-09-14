<template>
  <section class="currday-details">
    <div> {{cityData.mainWeather.WeatherText}} </div>
    <div> {{cityData.locationData.LocalizedName}} </div>
    <div>
      <p v-if="tempType === 'c'">{{cityData.mainWeather.Temperature.Metric.Value}} °C</p>
      <p v-else>{{cityData.mainWeather.Temperature.Imperial.Value}} °F</p>
    </div>
    <div></div>
  </section>
</template>

<script lang="ts">

export default {
  name: 'currday-details',
  props: {
    cityData: {
      type: Object,
      required: true
    }
  },
  computed: {
    tempType(): string {
      return this.$store.getters.tempType;
    }
  }
}
</script>

<style lang="scss" scoped>
.currday-details {
  div:first-child {
    font-size: 30px;
    margin-bottom: 10px;
  }

  div p {
    font-size: 40px;
  }
}
</style>