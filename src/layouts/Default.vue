<template>
    <v-app>
        <app-confirm ref="app_confirm" />
        <app-head></app-head>
        <v-main class="mt-6">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </v-main>
    </v-app>
</template>
<script>
import appHead from './includes/Appheader.vue'
export default {
    components:{
        appHead,
    },
    mounted(){
        this.$root.$confirm = this.$refs.app_confirm.open
    }
}
</script>
