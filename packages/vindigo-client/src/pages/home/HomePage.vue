<template>
    <section class="home-page">
        <toolbar class="pl-0">
            <img :src="logoUrl" class="h-10"/>
        </toolbar>
        <div class="h-80 laptop:h-72 -mt-14 bg-white flex items-center justify-center">
            <!-- Display just "Welcome" when user is signed out -->
            <avatar
				:user="10"
                :size="80"
				src="https://firebasestorage.googleapis.com/v0/b/cao-master-v2.appspot.com/o/avatars%2F3KuBif2UEReCgzW7LRaBdTIkiQA3?alt=media&token=1a54f0ed-0e0f-412d-9f0b-3cc83e93ba89"
			/>
            <div class="pl-6">
                <h2 class="font-extrabold text-2xl">Welcome back,</h2>
                <h1 class="font-extrabold text-2xl">Julian</h1>
            </div>
        </div>
        <main class="container grid grid-cols-7 gap-4">
            <div class="col-span-full laptop:col-span-5 pt-8">
                <section-title icon="mdi-clock-outline">
                    Recent projects
                </section-title>
                <section class="grid grid-cols-3">
                    <div class="">

                    </div>
                </section>
            </div>
            <div class="col-span-full laptop:col-span-2 order-first laptop:order-none -mt-20">
                <section-title icon="mdi-chart-line-variant">
                    Activity
                </section-title>
                <div class="activity-card bg-purple-500 h-48 mt-2 rounded-3xl">

                </div>
            </div>
        </main>
	</section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'HomePage',
    computed: {
        logoUrl() {
            return require('../../assets/vindigo-black.svg');
        }
    }
})
</script>

<style lang="postcss">
.activity-card { 
    @mixin emissive theme('colors.purple.500');
}
</style>