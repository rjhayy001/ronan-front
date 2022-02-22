<template>
      <v-data-table
          :headers="headers"
          :items="demand"
          class="elevation-5"
          :hide-default-footer="true"
      >
        <template v-slot:item.demands="{item}">
          <v-row>
            <v-col cols="4">
              <v-icon @click="minus(item)">mdi-minus</v-icon>
            </v-col>
            <v-col cols="4">
              {{item.demands}}
            </v-col>
            <v-col cols="4">
              <v-icon @click="add(item)">mdi-plus</v-icon>
            </v-col>
          </v-row>
        </template>
      </v-data-table>
</template>
<script>
import { 
  GetUserDemand,
  UpdateUserDemand
  } from '@/repositories/employee.api'
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
              { text: 'Solde actuel(jours)', align: 'center', value: 'current_balance' },
              { text: 'Demande', align: 'center', value: 'demands' },
              { text: 'Jours poses', align: 'center', value: 'days_posed' },
              { text: 'Jours restants', align: 'center', value: 'days_remaining' },
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
          // console.log(data, 'test')
          this.demand = data
        })
      },

      add(item){
        var extended = parseInt(item.demands + 1)
        let datas = {
          holiday_id: item.holiday_id,
          days_extended: extended,
          demand_id: item.id
        }
        UpdateUserDemand(datas).then((data) => {
          console.log(data)
        })

        this.initialize()
      },
      minus(item){
        var extended = parseInt(item.demands - 1)
        let datas = {
          holiday_id: item.holiday_id,
          days_extended: extended,
          demand_id: item.id
        }
        UpdateUserDemand(datas).then((data) => {
          console.log(data)
        })

        this.initialize()
      }
    }
}
</script>