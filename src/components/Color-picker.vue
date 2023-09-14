<template>
    <section class="color-picker">
        <div v-for="option of 25" class="sky-gradient" @mouseover="hoverColor(option-1)" @mouseleave="unHoverColor"
            @click.prevent="setColor(option-1)" :class="optionNum(option-1)">
            {{formatTime(option-1)}}:00
        </div>
    </section>
</template>
    
<script lang="ts">

export default {
    name: 'color-picker',
    props: {

    },
    data() {
        return {
            currColor: 0
        }
    },
    created() {
        this.currColor = this.$store.getters.colorNum;
    },
    methods: {
        optionNum(num: number): string | number {
            let className = 'sky-gradient-';
            className += (num < 10) ? `0${num}` : num;
            if (num <= 5 || num >= 20) {
                className += ' darkTheme'
            }
            return className;
        },
        formatTime(num: number): string | number {
            const time = (num < 10) ? `0${num}` : num;
            if (time === 24) return '00'
            return time
        },
        hoverColor(num: number) {
            this.$emit('hoverColor', num)
            this.$store.commit({ type: 'setColorNum', num })
        },
        unHoverColor() {
            this.$emit('unhoverColor')
            this.$store.commit({ type: 'setColorNum', num: this.currColor })
        },
        setColor(num: number) {
            this.currColor = num;
            let className = 'sky-gradient-';
            className += (num < 10) ? `0${num}` : num;
            if (num <= 5 || num >= 20) {
                className += ' darkTheme'
            }
            this.$emit('setedColor')
            this.$store.commit({ type: 'setBgc', color: className })
            this.$store.commit({ type: 'setColorNum', num })
        }
    }

}
</script>
    
<style lang="scss" scoped>
@import "./src/styles/setup/_mixins.scss";
@import "./src/styles/setup/_typography.scss";
@import "./src/styles/setup/_variables.scss";

.color-picker {

    display: flex;
    flex-direction: column;
    height: 100vh;
    text-align: center;
    overflow: hidden;
    transition: 0.4s ease-out;
    position: fixed;
    z-index: 33;

    @include for-normal-layout {
        position: relative;
        z-index: 0;
    }
    .sky-gradient {
        color: black;
        min-width: 250px;
        height: 4%;
        cursor: pointer;
        transition:
            box-shadow 150ms,
            z-index 0ms;
    }

    .sky-gradient:hover {
        box-shadow: 0 -5px 10px black;
    }

    .darkTheme {
        color: rgb(167, 167, 167);
    }

}
</style>