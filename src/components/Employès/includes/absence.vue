<template>
    <v-row>
        <!-- <v-sheet v-if="add" color="secondary" width="100%">
            <p>adasdsadad</p>
        </v-sheet> -->
        <v-sheet elevation="0" width="100%" v-for="(attendance, index) in data" :key="index">
            <v-row>
                <v-col cols="10">
                    <h3 style="color:#005075">{{$DateWithMonthTextfr(attendance.date)}}</h3>
                    <p>{{attendance.status_text || capitalize}}</p>
                </v-col>
                <v-col cols="2">
                    <v-icon v-if="attendance.status == 0" color="success" class="float-end" style="font-size:30px;margin-top:15px">mdi-check</v-icon>
                    <v-icon v-else color="error" class="float-end" style="font-size:30px;margin-top:15px">mdi-delete</v-icon>
                </v-col>
            </v-row>
        </v-sheet>
        <menu-button @add="addNew" @cancel="cancel"></menu-button>
    </v-row>
</template>
<script>
import menuButton from "./menu.vue"
export default {
    data(){
        return{
            add: false
        }
    },
    methods:{
        addNew(){
            this.add = true
        },
        cancel(){
            this.add = false
        }
    },
    components:{
        menuButton
    },
    props:{
        data:{
            type: Array
        }
    }
}
</script>