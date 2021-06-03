<template>
    <div>
        <section class="bg-yellow-600 w-100 px-6 py-3">
            <ol class="list__container">
                <li class="list__item">
                    <div class="list__item_left">
                        <i class="mdi mdi-check"></i>
                        <h1 class="font-bold">Completed</h1>
                    </div>
                    <div class="list__item_right">
                        <i class="mdi mdi-plus"></i>
                        <i class="mdi mdi-chevron-down"></i>
                    </div>
                </li>
            </ol>
        </section>
        ss
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'vindigo-list',
    data: () => ({
        list: [{
            name: 'Completed',
            icon: 'mdi-checkmark',
            order: 0,
            items: [
                { title: 'This task represents a crittical product bug '}
            ]
        }]
    })
})
</script>

<style lang="postcss" scoped>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    .list__container {
        @apply flex flex-row text-gray-50;
    }

    .list__container > .list__item {
        
    }

</style>