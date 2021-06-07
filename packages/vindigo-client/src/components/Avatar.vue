<template>
    <router-link :to="profileUrl">
        <div class="avatar inline-flex rounded-full bg-gradient-to-b from-yellow-500 to-pink-600" :style="borderStyle">
            <div class="avatar__space rounded-full bg-white" :style="borderStyle">
                <img :src="src" :style="imgStyle" class="rounded-full" style="image-rendering: crisp-edges;"/>
            </div>
        </div>
    </router-link>
</template>

<script lang="ts">
import Vue from 'vue';
import { cleanInt } from '../util';

export default Vue.extend({
    name: 'Avatar',
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
        },
        openProfile: {
            type: Boolean,
            default: true
        }
    },

    computed: {
        profileUrl(): string|undefined {
            return this.openProfile ? `/profile/${this.user}` : undefined;
        },
        borderStyle(): any {
            return {
                padding: Math.ceil(cleanInt(this.size) / 24) + 'px'
            }
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