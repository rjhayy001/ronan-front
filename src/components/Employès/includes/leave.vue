<template>
      <v-data-table
          :headers="headers"
          :items="demand"
          class="elevation-5"
      ></v-data-table>
</template>
<script>
import { GetUserDemand } from '@/repositories/employee.api'
export default {
    data(){
        return{
            headers: [
              {
                text: 'Repartition',
                align: 'start',
                sortable: false,
                value: 'request_name',
              },
              { text: 'Solde actuel(jours)', value: 'current_balance' },
              { text: 'Demande', value: 'demands' },
              { text: 'Jours poses', value: 'days_posed' },
              { text: 'Jours restants', value: 'days_remaining' },
            ],
            demand: [],
        }
    },
    created(){
      this.initialize()
    },
    methods:{
      initialize(){
        let id = this.$route.params.id
        GetUserDemand(id).then(({data}) => {
          console.log(data, 'test')
          this.demand = data
        })

      }
    }
}
</script>