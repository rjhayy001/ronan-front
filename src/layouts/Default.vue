<template>
    <v-app>
        <app-head></app-head>
        <app-side></app-side>
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>
<script>
import appHead from './includes/header.vue'
import appSide from './includes/sidebar.vue'
export default {
    components:{
        appHead,
        appSide
    }
}
</script>
