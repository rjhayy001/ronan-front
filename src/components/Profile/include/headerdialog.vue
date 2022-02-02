<template>
    <v-tabs>
        <div style="margin:auto 0; padding-left: 20px; display:flex;">
            <v-btn large icon>
                <v-avatar class="logo_img" @click="clickHome()">
                    <img src="@/assets/images/logo-securauto-150.png" alt="">
                </v-avatar>
            </v-btn>
            <div style="margin:auto 0; padding-left: 10px; color:black;">

            <h3 style="font-weight:400">
                Mes Profil
            </h3>
            </div>
        </div>
        <v-spacer></v-spacer>
        <div style="margin: auto 0">
            <v-btn  icon>
                <v-icon color="#005075">
                    mdi-settings
                </v-icon>
            </v-btn>
        </div>
    </v-tabs>
</template>

<script>
export default {
    data(){
        return{
            dialog:true,
        }
    },
    methods: {
        clickHome() {
            this.$emit('close')
        }
    }
}
</script>

<style scoped>
.main_tabs {
    flex:0
}

.main_tabs .tabs_img {
    padding: 0 5px; 
    justify-content:center; 
    margin:auto 0; 
    text-align:center;
}

.main_tabs .tabs_img .logo_img {
     size:60px;
}

.main_tabs .tabs {
    display:flex; 
    padding: 0 5px;
    transition: 0;
}

.subtabs.v-tab.v-tab--active{
    color: orange !important;
}

.tabs .subtabs{
    width: 280px;
    font-size: 18px;
    text-transform:capitalize;
}

</style>