<template>
    <div class="ma-2">
        <v-row class="row">
            <v-flex xs2
           >
              <center-details></center-details>
            </v-flex>
            <v-flex xs10>
              <employee-lists></employee-lists>
            </v-flex>
        </v-row>
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
        }
    },
    created(){
        this.initialize()
    },
    methods:{
        initialize(){
            GetCenterInfo(this.$route.params.id).then( ({data}) => {
                console.log(data, 'info')
                this.center = data
            })
        }
    }
}
</script>