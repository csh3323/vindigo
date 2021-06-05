<template>
    <section>
        <ol class="sidebar__container">
            <li class="sidebar__item">
                <router-link class="flex justify-center mt-2" to="/">
                    <img src="../../../public/icon.png" alt="" width="28px">
                </router-link>
            </li>
            <li v-for="(item, index) in listItems" :key="index" :class="['sidebar__item', $route.path.substr(1, $route.path.length) === item.href ? 'active' : '' ]">
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

    .sidebar__container > .sidebar__item {
        @apply py-1 text-center relative;
    }

    .sidebar__container > .sidebar__item:first-child {
        @apply mb-2;
    }

    .sidebar__container > .sidebar__item.active::before {
        left: 0;
        top: 0;
        height: 100%;
        width: 3px;
        display: block;
        content: ' ';
        @apply absolute bg-blue-300;
    }

    .sidebar__container > .sidebar__item:not(:first-child):hover,
    .sidebar__container > .sidebar__item.active {
        background-color: #293238;
    }

    .sidebar__container > .sidebar__item span {
        @apply text-white;
        font-size: 1.75rem;
    }

    .sidebar__container > .sidebar__item span:hover {
        @apply text-indigo-400 cursor-pointer;
    }

</style>