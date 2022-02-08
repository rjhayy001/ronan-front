<template>
    <v-container style="margin:0; padding:0; max-width:100%; justify-content:center">
        <div style="width: 100%; margin:auto; text-align: left; display:flex;">
            <Sidebar/>
            <div style="width: 80%; margin-right:20px;background-color:#eeeeee;">
                <router-view></router-view>
            </div>
        </div>
    </v-container>
</template>
<script>
import Sidebar from './include/sidebar.vue';
// import tableRtt from './all_RTT.vue';
// import tableLeave from './all_Leave.vue';
export default {
    components: {
        Sidebar,
        // tableRtt,
        // tableLeave
    },
    data(){
        return{
            general:true,
            security_connection:false,
            employee_management :false,
        }
    },
    methods: {

    }
}
</script>

<style scoped>
.v-btn__content {
    justify-content: normal!important;
}
</style>