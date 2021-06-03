<template>
    <div class="container mx-auto mt-5">
        <h1 class="h-1 flex align-middle items-center">
            <span class="mdi mdi-clock-outline text-2xl mt-[-1px] mr-1"></span>
            Projects
        </h1>
        <div class="grid grid-cols-6 grid-rows-6 mt-3">
            <div class="w-64 px-4" v-for="n in 10" :key="n">
                <article class="relative py-6 px-6 rounded my-4 shadow-md border cursor-pointer">
                    <p class="mt-[-14px] mb-10 font-bold text-white font-sans">Title</p>
                </article>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { IWorkspace } from '../workspace';

export default Vue.extend({
    name: 'Home',
    components: {
        
    },
    data: () => ({
        workspaces: Object as PropType<IWorkspace[]>
    }),
    mounted() {

    }
});
</script>

<style lang="postcss" scoped>

    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    article
    {
        background-image: url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x360/0f3b61d73a4028608dfa43344ad0302a/photo-1620839954053-e446ef13fa2e.jpg); 
        background-size: cover;
    }

</style>