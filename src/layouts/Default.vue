<template>
    <v-app>
        <app-head></app-head>
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>
<script>
import appHead from './includes/header.vue'
export default {
    components:{
        appHead,
    }
}
</script>
