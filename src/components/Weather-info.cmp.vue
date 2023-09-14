<template>
    <section class="weather-info">
        <div class="weather-info-left">
            <div class="cityInfo-container">
                <p>{{ weatherCard.locationData.LocalizedName }},
                    <span>{{ weatherCard.locationData.Country.LocalizedName }}</span>
                </p>
                <p class="date">{{ setDate }}</p>
            </div>
            <div class="imageWeather-container">
                <img :src="require(`@/assets/icons/${weatherCard.mainWeather.WeatherIcon}.png`)"
                    :alt="weatherCard.mainWeather.WeatherText">
                <p>{{ weatherCard.mainWeather.WeatherText }}</p>
            </div>
        </div>
        <div class="weather-info-right">
            <div class="addF-container">
                <img v-if="reactiveIsFavorites" @click.prevent="toggleFav" src="../assets/icons/heart.png" alt="heart">
                <img v-else @click.prevent="toggleFav" src="../assets/icons/empty-heart.png" alt="empty-heart">
            </div>
            <div class="temp-container">
                <p v-if="tempType === 'c'">{{ weatherCard.mainWeather.Temperature.Metric.Value }} °C </p>
                <p v-else>{{ weatherCard.mainWeather.Temperature.Imperial.Value }} °F</p>
            </div>

            <SearchInput class="search-input" />
        </div>
    </section>
</template>

<script lang="ts">
import moment from 'moment';
import SearchInput from './Search-input.cmp.vue';


export default {
    name: 'weather-info',
    props: {
        weatherCard: {
            type: Object,
            required: true
        }
    },
    methods: {
        toggleFav() {
            this.$store.dispatch({ type: "toggleFavorite", currCard: this.weatherCard });
        },
        isFavorite(key?: string) {
            const searchBy = (key) ? key : this.weatherCard?.locationData?.Key;
            const favorites = this.$store.getters.favorites;
            if (this.weatherCard) {
                const cardIdx = favorites.findIndex((fav: any) => fav.locationData.Key === searchBy);
                return (cardIdx > -1) ? favorites[cardIdx] : false;
            }
        },
        isSaved(key?: string) {
            const card = JSON.parse(localStorage.getItem("savedCard") as string);
            return (key === card.locationData.Key) ? card : false;
        }
    },
    computed: {
        setBgcColor() {
            let num = this.$store.getters.colorNum;
            return (num <= 5 || num >= 20) ? 'darkTheme' : 'lightTheme';
        },
        setDate() {
            let date = this.weatherCard.mainWeather.LocalObservationDateTime;
            return moment(date).format("LL");
        },
        tempType() {
            return this.$store.getters.tempType;
        },
        reactiveIsFavorites() {
            return this.isFavorite();
        }
    },
    components: { SearchInput }
}
</script>

<style lang="scss" scoped>
@import "./src/styles/setup/_mixins.scss";
@import "./src/styles/setup/_variables.scss";

.weather-info {
    display: flex;
    justify-content: space-between;
    padding: 30px 30px 0px 30px;
    flex-direction: column-reverse;
    position: relative;


    @include for-narrow-layout {
        flex-direction: row;
    }

    .weather-info-left {
        margin-bottom: 60px;

        @include for-narrow-layout {
            margin-bottom: 0px;
        }

        .imageWeather-container {
            display: flex;
            flex-direction: column;

            img {
                margin: 10px 0px;
                width: 85px + 40px;
                float: left;
            }

            p {
                text-align: left;
                margin-left: 8px;
                font-size: 1.3rem;
                color: #cecece;
            }
        }

        .cityInfo-container {
            text-align: left;
            margin-top: 7px;

            :first-child {
                font-size: 3rem;

                span {
                    font-size: 2.5rem;
                }
            }

            :last-child {
                font-size: 1.3rem;
            }
        }
    }

    .weather-info-right {
        display: flex;
        flex-direction: column;
        align-items: end;

        .addF-container {
            order: 0;
            position: absolute;
        }

        .temp-container {
            order: 2;
            position: absolute;
            bottom: 99px;
            right: 27px;
            font-size: 3rem;
        }

        .search-input {
            order: 1;
        }

        @include for-narrow-layout {
            .addF-container {
                order: 0;
                position: relative;
            }

            .temp-container {
                order: 1;
                font-size: 5rem;
                position: relative;
                top: 0;
                right: 0;
            }

            .search-input {
                order: 2;
            }

        }


        .addF-container {
            img {
                width: 35px;
                height: 35px;
                margin-top: 14px;
                cursor: pointer;
            }

            div {
                font-size: 0.8rem;
                cursor: pointer;
                margin: 17px 11px 10px 15px;
                width: 127.5px;

                &:hover {
                    color: red;
                }
            }
        }

        .temp-container {
            margin: 5px 20px;
        }
    }
}
</style>