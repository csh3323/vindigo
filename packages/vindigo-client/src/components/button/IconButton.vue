<template>
    <component :is="btnTag"
        v-wave
        class="icon-button mdi cursor-pointer inline-flex items-center justify-center align-middle select-none p-4 relative rounded-full text-xl"
        :style="iconStyle"
        :class="iconClass"
        :to="to"
    />
</template>

<script lang="ts">
import Vue from 'vue';
import { cleanInt } from '../../util';

export default Vue.extend({
    name: 'IconButton',
    props: {
        icon: {
            type: String,
            required: true
        },
        size: {
            type: [String, Number],
            default: 34
        },
        to: {
            type: String
        }
    },

    computed: {
        btnTag(): any {
            return this.to ? 'router-link' : 'span';
        },
        iconClass(): any {
            return [this.icon] 
        },
        iconStyle(): any {
            const size = cleanInt(this.size);

            return {
                width: size + 'px',
                height: size + 'px',
                fontSize: (size - 6) + 'px'
            }
        }
    }
})
</script>

<style lang="postcss">
.icon-button {
    font-feature-settings: "liga";
    text-indent: 0;
    transition: .3s cubic-bezier(.25,.8,.5,1), visibility 0s;
}
</style>