<template>
    <v-app>
         <app-confirm ref="app_confirm" />
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>
<script>
export default {
    mounted(){
        this.$root.$confirm = this.$refs.app_confirm.open
    }
}
</script>
