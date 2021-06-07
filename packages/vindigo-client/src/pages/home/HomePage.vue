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
				:src="require('/src/assets/profile.png')"
			/>
            <div class="pl-6">
                <h2 class="font-extrabold text-2xl">Welcome back,</h2>
                <h1 class="font-extrabold text-2xl">Julian</h1>
            </div>
        </div>
        <main class="container grid grid-cols-6 laptop:gap-24">
            <div class="col-span-full laptop:col-span-4 pt-8">
                <section-title icon="mdi-clock-outline">
                    Recent projects
                </section-title>
                <section class="grid grid-cols-6 gap-5 pt-4">
                    <board-tile
                        v-for="i in 6"
                        class="col-span-12 laptop:col-span-3 desktop:col-span-2"
                        :name="getBoardName()" 
                        :key="i"
                    />
                </section>
                <section-title class="mt-10" icon="mdi-briefcase">
                    Your teams
                </section-title>
                <section class="grid grid-cols-6 gap-5 pt-4">
                    <board-tile
                        v-for="i in 3"
                        class="col-span-12 laptop:col-span-3 desktop:col-span-2"
                        :name="getTeamName()" 
                        :key="i"
                    />
                </section>
            </div>
            <div class="col-span-full laptop:col-span-2 order-first laptop:order-none -mt-20">
                <section-title icon="mdi-chart-line-variant">
                    Activity
                </section-title>
                <activity-box class="bg-purple-500 h-52"/>
            </div>
        </main>
	</section>
</template>

<script lang="ts">
import Vue from 'vue';
import { commerce } from 'faker';
import ActivityBox from './ActivityCard.vue';

export default Vue.extend({
	components: { ActivityBox },
    name: 'HomePage',
    
    data: () => ({
        
    }),

    computed: {
        logoUrl() {
            return require('../../assets/vindigo-black.svg');
        }
    },

    methods: {
        getBoardName() {
            return commerce.productName();
        },
        getTeamName() {
            return commerce.department() + ' Team';
        }
    }
})
</script>

<style lang="postcss">
.home-page {
    .activity-card { 
        @mixin emissive theme('colors.purple.500');
    }
}
</style>