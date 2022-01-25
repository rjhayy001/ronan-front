<template>
    <div class="ma-2">
        <v-row class="row" v-if="!loading">
            <v-flex sm2>
              <center-details :center="center"></center-details>
            </v-flex>
            <v-flex sm10>
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
                console.log(data, 'info')
                this.center = data
                this.loading = false
            })
        }
    }
}
</script>