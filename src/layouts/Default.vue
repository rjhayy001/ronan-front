<template>
    <v-app>
        <app-head></app-head>
        <v-main class="mt-6">
            <router-view></router-view>
        </v-main>
    </v-app>
</template>
<script>
import appHead from './includes/Appheader.vue'
export default {
    components:{
        appHead,
    }
}
</script>
