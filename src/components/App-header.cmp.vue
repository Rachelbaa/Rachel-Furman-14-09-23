<template>
    <header :class="setBgcColor">
        <svg class="navBar-icon" @click.prevent="changeTemp" fill="white" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
                d="M5 7h14c.6 0 1-.4 1-1s-.4-1-1-1H5c-.6 0-1 .4-1 1s.4 1 1 1zm0 6h14c.6 0 1-.4 1-1s-.4-1-1-1H5c-.6 0-1 .4-1 1s.4 1 1 1zm0 6h14c.6 0 1-.4 1-1s-.4-1-1-1H5c-.6 0-1 .4-1 1s.4 1 1 1z" />
        </svg>
        <div class="temp-controller">
            <span :class="(clickedTemp === 'c') ? 'clickedTemp' : ''">°C</span>
            <el-switch @change="setTemp" v-model="clickedTemp" active-color="#3c3c3c54" inactive-color="#3c3c3c54"
                active-value="f" inactive-value="c"></el-switch>
            <span :class="(clickedTemp === 'f') ? 'clickedTemp' : ''">°F</span>
        </div>
        <nav>
            <router-link to="/">Weather</router-link>
            <router-link to="/favorites">Favorites</router-link>
        </nav>
    </header>
</template>


<script lang="ts">

export default {
    name: "App",
    props: {
        colorPickerClicked: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            clickedTemp: null
        }
    },
    created() {
        this.clickedTemp = this.$store.getters.tempType
    },
    methods: {
        async setTemp() {
            await this.$store.commit({ type: 'setTempType', temp: this.clickedTemp })

        },
        changeTemp() {
            this.$emit('colorPClicked', !this.colorPickerClicked)
        }
    },
    computed: {
        setBgcColor(): string {
            let num = this.$store.getters.colorNum;
            return (num <= 5 || num >= 20) ? 'darkTheme' : 'lightTheme';
        }

    }
}
</script>


<style lang="scss" scoped>
@import "./src/styles/setup/_mixins.scss";
@import "./src/styles/setup/_variables.scss";

header {
    display: flex;
    justify-content: space-between;
    box-shadow: 0 4px 8px -8px;
    height: 60px;
    line-height: 60px;

    &.lightTheme {
        color: black;
        background-color: rgb(173 173 173 / 50%);

        .navBar-icon {
            &:hover {
                background-color: rgba(224, 224, 224, 0.6);
            }
        }

        span {
            color: #70707054;

            &.clickedTemp {
                color: rgb(0, 0, 0);
            }

        }

        a {
            color: black;

            &:hover {
                background-color: rgba(224, 224, 224, 0.6);
                color: rgb(255, 255, 255);
            }
        }

        nav a.router-link-exact-active {
            background-color: rgba(224, 224, 224, 0.6);
            color: rgb(0, 0, 0);
            display: none;

            @include for-narrow-layout {
                display: inline;
            }
        }
    }

    &.darkTheme {
        color: white;
        background-color: rgba(28 31 32 / 70%);

        .navBar-icon {
            &:hover {
                background-color: rgba(37, 37, 37, 0.7);
            }
        }

        .temp-controller {
            span {
                color: #70707054;

                &.clickedTemp {
                    color: rgb(255, 255, 255);
                }

            }
        }

        a {
            color: rgb(255, 255, 255);

            &:hover {
                background-color: rgba(112, 112, 112, 0.7);
            }
        }

        nav a.router-link-exact-active {
            background-color: rgba(37, 37, 37, 0.7);
            color: rgb(255, 255, 255);
            display: none;

            @include for-narrow-layout {
                display: inline;
            }
        }
    }

    .navBar-icon {
        width: 60px;
        min-height: 60px;
        padding: 13px;
        cursor: pointer;
        transition: border-color .3s, background-color .3s, color .3s;


    }

    .temp-controller {
        padding: 6px 9px 6px 6px;
        align-items: center;
        display: flex;
        cursor: pointer;

        span {
            padding: 5px 9px 5px 5px;
        }
    }

    nav {
        padding: 30px;
        align-self: center;

        a {
            text-decoration: none;
            transition: border-color .3s, background-color .3s, color .3s;
            font-size: 14px;
            line-height: 60px;
            padding: 22px;

        }
    }

}
</style>