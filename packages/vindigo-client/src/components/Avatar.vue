<template>
    <router-link :to="profileUrl">
        <div class="avatar inline-flex rounded-full bg-gradient-to-b from-yellow-600 to-pink-600">
            <div class="avatar__space rounded-full bg-white">
                <img :src="src" :style="imgStyle" class="rounded-full"/>
            </div>
        </div>
    </router-link>
</template>

<script lang="ts">
import Vue from 'vue';
import { cleanInt } from '../util';

export default Vue.extend({
    name: 'Icon',
    props: {
        user: {
            type: Number,
            required: true
        },
        src: {
            type: String,
            required: true
        },
        size: {
            type: [String, Number],
            default: 34
        }
    },

    computed: {
        profileUrl(): string {
            return `/profile/${this.user}`;
        },
        imgStyle(): any {
            const size = cleanInt(this.size);

            return {
                width: size + 'px',
                height: size + 'px'
            }
        }
    }
})
</script>

<style lang="postcss">
.avatar, .avatar__space {
    padding: 2px;
}
</style>