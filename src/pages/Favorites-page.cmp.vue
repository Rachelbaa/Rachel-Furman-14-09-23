<template>
  <perfect-scrollbar>
    <section class="favorites-page">
      <Favorite-card v-for="(favoriteCity, idx) in getFavorites" :cityData="favoriteCity" :key="idx" />
    </section>
  </perfect-scrollbar>
</template>

<script lang="ts">
import { IFullCityData } from '@/interfaces/weather-data.interface';
import FavoriteCard from '../components/Favorite-card.cmp.vue';
export default {
  data() {
    return {
      favorites: [] as IFullCityData[]
    }
  },
  created() {
    this.favorites = this.$store.getters.favorites

  },
  computed: {
    getFavorites(): IFullCityData[] {
      return this.$store.getters.favorites
    }
  },
  components: {
    FavoriteCard
  }
}
</script>

<style lang="scss" scoped>
@import "./src/styles/setup/_mixins.scss";
@import "./src/styles/setup/_variables.scss";

.ps {
  height: 90vh;
}

@include for-Hnormal-layout {
  .ps {
    height: 93.6vh;
  }
}

.favorites-page {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>