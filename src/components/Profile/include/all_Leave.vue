<template>
  <v-data-table
    :headers="headers"
    :items="holidays"
    :items-per-page="50"
    class="elevation-1"
  >
     <template v-slot:item.start_date="{ item }">
      {{$DateWithMonthTextfr(item.start_date)}}
    </template>
     <template v-slot:item.end_date="{ item }">
      {{$DateWithMonthTextfr(item.end_date)}}
    </template>
     <template v-slot:item.status="{ item }">
      <v-icon :color="statusColor(item.status)">
        mdi-checkbox-blank-circle
      </v-icon>
      <span class="font-italic"> ( {{item.status_text}} ) </span> 
    </template>
  </v-data-table>
</template>

<script>
import { GetEmployeeHolidays } from "@/repositories/holidays.api"
  export default {
    data () {
      return {
        holidays:[],
        headers: [
          {
            text: 'ID',
            align: 'start',
            value: 'id',
            width:'10%'
          },
          { text: 'Nom de la employé', align: 'start', value: 'user.full_name' },
          { text: 'Date de debut', align: 'start', value: 'start_date' },
          { text: 'Date de fin', align: 'start', value: 'end_date' },
          { text: 'Statut', align: 'start', value: 'status',  width:'15%' },
        ],
      }
    },
    created(){
      this.initialize()
    },
    methods:{
      initialize(){
        GetEmployeeHolidays().then(({data}) => {
          this.holidays = data
        })
      },
      statusColor(status){
        switch(status)
        {
          case 0:
            return 'gray'
          case 1:
            return 'green'
          case 2:
            return 'red'
        }
      }
    }
  }
</script>