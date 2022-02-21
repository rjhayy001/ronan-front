<template>
<div id="app">
<v-app>
      <v-data-table
          :headers="headers"
          :items="demand"
          class="elevation-5"
      >
       <template v-slot:item.subtract="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-minus
          </v-icon>
        
        </template>
        <template v-slot:item.add="{ item }">
        
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-plus
          </v-icon>
        </template>
      </v-data-table>
      </v-app>
</div>
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
              { text: '', value: 'subtract',width: '1%', align: 'start', },
              { text: 'Demande', value: 'demands' },
              { text: '', value: 'add',width: '1%', align: 'start' },
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