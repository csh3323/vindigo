<template>
    <section>
        <ol class="list-container">
            <li v-for="(item, index) in listItems" :key="index"  class="list-item">
                <router-link :to="item.href">
                    <span :class="['mdi', item.icon]"></span>
                </router-link>
            </li>
            
        </ol>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'sideBar',
    props: {
        open: {
            required: true,
            type: Boolean
        }
    },
    data: () => ({
        listItems: {
            a: {
                icon: 'mdi-format-list-bulleted-square',
                href: 'list'
            },
            b: {
                icon: 'mdi-calendar-blank',
                href: 'calendar'
            },
            c: {
                icon: 'mdi-brush',
                href: 'edit'
            },
            d: {
                icon: 'mdi-backup-restore',
                href: 'restore'
            },
            e: {
                icon: 'mdi-account-supervisor',
                href: 'organization'
            },
            f: {
                icon: 'mdi-plus-circle-outline',
                href: '#'
            }
        }
    }),
    computed: {
        
    }
});

</script>

<style lang="postcss" scoped>

    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    .list-container > .list-item {
        @apply py-4 text-center;
    }

    .list-container > .list-item span {
        @apply text-white;
        font-size: 1.75rem;
    }

    .list-container > .list-item span:hover {
        @apply text-indigo-400 cursor-pointer;
    }

</style>