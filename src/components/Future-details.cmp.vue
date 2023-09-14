<template>
    <section class="future-details" :class="setBgcColor()">
        <div class="flex space-between" v-for="num of 2">
            <div>{{skipDay(num)}}</div>
            <div class="flex"> <img :src="require(`@/assets/icons/${cityData.dailyForecasts[0].Day.Icon}.png`)">

                <div class="temp-box" v-if="tempType === 'c'">
                    <span>{{convertToC(cityData.dailyForecasts[num-1].Temperature.Minimum.Value)}}° |
                        {{convertToC(cityData.dailyForecasts[num-1].Temperature.Maximum.Value)}}°</span>
                </div>
                <div class="temp-box" v-else>
                    <span>{{cityData.dailyForecasts[num-1].Temperature.Minimum.Value}}° |
                        {{cityData.dailyForecasts[num-1].Temperature.Maximum.Value}}°</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import moment from 'moment';

export default {
    name: 'future-details',
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
    },
    methods: {
        skipDay(num: number) {
            return moment().add(num, "day").format("ddd");
        },
        convertToC(num: number) {
            let c = (num - 32) * 5 / 9;
            return Math.floor(c);
        },
        setBgcColor() {
            let num = this.$store.getters.colorNum;
            return (num <= 5 || num >= 20) ? "darkTheme" : "lightTheme";
        }
    },
}
</script>

<style lang="scss" scoped>

.future-details {
    &.lightTheme {

        background-color: #ffffffc7;
        padding: 10px 10px;
        border-bottom-left-radius: 7px;
        border-bottom-right-radius: 7px;


        div {
            margin-bottom: 5px;
            color: grey
        }

    }

    &.darkTheme {
        background-color: rgba(37, 37, 37, 0.8);
        padding: 10px 10px;
        border-bottom-left-radius: 7px;
        border-bottom-right-radius: 7px;

        div {
            margin-bottom: 5px;
            color: #c0c0c0
        }

    }

    img {
        width: 35px;
        display: block;
    }

}
</style>