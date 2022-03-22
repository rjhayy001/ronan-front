<template>
    <div class="ma-2">
        <v-row class="row" v-if="!loading">
            <v-flex sm2 style="height: 85vh">
              <center-details :center="center" @success="hardReload"></center-details>
            </v-flex>
            <v-flex sm10 style="overflow-y:scroll; height: 85vh">
              <employee-lists :center="center"></employee-lists>
            </v-flex>
        </v-row>
        <table-loader v-else></table-loader>
    </div>
</template>
<script>
import centerDetails from '@/components/Centres/includes/centerDetails'
import employeeLists from '@/components/Centres/includes/employeeLists'
import { GetCenterInfo } from "@/repositories/center.api";

export default {
    components:{
      centerDetails,
      employeeLists
    },
    data(){
        return {
            center:{},
            loading:false
        }
    },
    created(){
        this.initialize()
    },
    methods:{
        initialize(){
            this.loading =true
            GetCenterInfo(this.$route.params.id).then( ({data}) => {
                this.center = data
                this.loading = false
            })
        },
        hardReload(){
            GetCenterInfo(this.$route.params.id).then( ({data}) => {
                this.center = data
            })
        }
    }
}
</script>