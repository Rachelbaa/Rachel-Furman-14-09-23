<template>
    <section class="search-input" :class="setBgcColor">
        <span class="inputPH" :class="(isWriting) ? 'isWriting' : ''" @click.prevent="setInput">Search city</span>
        <i class="el-icon-search" :class="(isWriting) ? 'isWriting' : ''"></i>
        <input type="text" ref="searchCity" v-model="city" v-debounce:400ms="searchForCities" @input="setIsWriting" />
        <div v-if="cityListRender" class="dataList" :class="setBgcColor">
            <div class="option" v-for="city in cityListRender" @click.prevent="makeCard(city)" :value="city.LocalizedName">
                <h3>{{ city.LocalizedName }}, <span class="country">{{ city.Country.LocalizedName }} </span></h3>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { ISearchResult } from '@/interfaces/weather-data.interface';
import { EventBus } from '../main.ts';

export default {
    name: "search-input",

    data():{city:string,isWriting:boolean,cityListRender:ISearchResult[]} {
        return {
            city: "",
            isWriting: false,
            cityListRender: [],
        };
    },
    methods: {
        async searchForCities() {
            if (this.city === "") {
                this.cityListRender = [];
                return;
            }
            this.cityListRender = await this.$store.dispatch({ type: "searchCities", text: this.city });
        },
        async makeCard(cardInfo: ISearchResult) {
            this.city = "";
            this.isWriting = false;
            this.cityListRender = [];
            // const isFCard = this.isFavorite(cardInfo.Key);
            const isSCard = this.isSaved(cardInfo.Key);
            if (!isSCard) {
                await this.$store.dispatch({ type: "getCityWeather", cardInfo: cardInfo });
                EventBus.$emit('setNewCard');
            }
        },
        setIsWriting(ev: any) {
            this.isWriting = (ev.target.value === "") ? false : true;
        },
        setInput() {
            this.$refs["searchCity"].focus();
        },
        // isFavorite(key?: string) {
        //     const searchBy = (key) ? key : this.weatherCard?.locationData?.Key;
        //     const favorites = this.$store.getters.favorites;
        //     if (this.weatherCard) {
        //         const cardIdx = favorites.findIndex((fav) => fav.locationData.Key === searchBy);
        //         return (cardIdx > -1) ? favorites[cardIdx] : false;
        //     }
        // },
        isSaved(key?: string) {
            const card = JSON.parse(localStorage.getItem("savedCard") as string);
            return (key === card.locationData.Key) ? card : false;
        }
    },
    computed: {
        setBgcColor() {
            let num = this.$store.getters.colorNum;
            return (num <= 5 || num >= 20) ? "darkTheme" : "lightTheme";
        }
    },
}
</script>
      
    
<style lang="scss" scoped>
@import "./src/styles/setup/_mixins.scss";
@import "./src/styles/setup/_variables.scss";

.search-input {
    margin: 40px auto;
    max-width: 500px;
    position: relative;
    cursor: pointer;

    &.lightTheme {
        color: black;
    }

    &.darkTheme {
        color: #cecece;
    }

    .el-icon-search {
        position: absolute;
        top: 0;
        right: 0;
        padding-top: 12px;
        font-size: 20px;
        color: #cecece;

        &.isWriting {
            display: none;
        }
    }

    .inputPH {
        color: #cecece;
        padding-top: 8px;
        position: absolute;
        transition: all .3s;
        font-size: 20px;

        &.isWriting {
            transform: translateY(-22px);
            font-size: 15px;
            line-height: 20px;
        }

    }

    input[type="text"] {
        width: 100%;
        color: #cecece;

        border: none;
        padding: 8px 0;
        min-width: 5px;
        min-height: 20px;
        font-size: 17px;
        background-color: transparent;
        line-height: 20px;
        border-bottom: 2px solid #3a3a3a;
        word-wrap: wrap;


        &:focus-visible {
            outline: none;
            border-bottom: 2px solid #2596a5;
        }


    }


    .dataList {
        text-align: left;
        width: 100%;
        position: absolute;
        max-height: 200px;
        overflow-x: auto;
        cursor: pointer;

        &.lightTheme {
            color: black;
            background-color: #ffffffc7;

            .option {
                border-bottom: 1px solid black;
                padding: 10px;
                transition: border-color .3s, background-color .3s, color .3s;

                &:hover {
                    background-color: #3b4a54;
                    color: white;
                }

                h3 {
                    margin: 0px;

                    .country {
                        margin-left: 5px;
                    }
                }
            }
        }

        &.darkTheme {
            color: #c0c0c0;
            background-color: rgba(37, 37, 37, 0.8);

            .option {
                border-bottom: 1px solid rgb(204, 204, 204);
                padding: 10px;
                transition: border-color .3s, background-color .3s, color .3s;

                &:hover {
                    background-color: #3b4a54;
                    color: rgb(0, 0, 0);
                }

                h3 {
                    margin: 0px;

                    .country {
                        margin-left: 5px;
                    }
                }
            }
        }


    }

}
</style>