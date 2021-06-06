<template>
    <section class="home-page">
        <toolbar class="pl-0">
            <img :src="logoUrl" class="h-10"/>
        </toolbar>
        <div class="h-64 bg-white flex items-center justify-center">
            <!-- Display just "Welcome" when user is signed out -->
            <avatar
				:user="10"
                :size="85"
				src="https://firebasestorage.googleapis.com/v0/b/cao-master-v2.appspot.com/o/avatars%2F3KuBif2UEReCgzW7LRaBdTIkiQA3?alt=media&token=1a54f0ed-0e0f-412d-9f0b-3cc83e93ba89"
			/>
        </div>
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