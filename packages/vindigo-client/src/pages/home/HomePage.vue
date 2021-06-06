<template>
    <div>
        <div>Coming soon</div>
        <o-button tag="router-link" to="/project/demo">Go to board</o-button>
        <icon-btn icon=">mdi-chevron-down"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'HomePage'
})
</script>