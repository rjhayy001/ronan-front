<template>
  <v-data-table
    :headers="headers"
    :items="rtts"
    :items-per-page="50"
    class="elevation-1"
    v-if="!loading"
  >
    <template v-slot:item.date="{ item }">
      {{$DateWithMonthTextfr(item.date)}}
    </template>
    <!-- <template v-slot:item.start_time="{ item }">
      {{item.start_time}}
    </template> -->
    <template v-slot:item.status="{ item }">
      <v-icon :color="statusColor(item.status)">
        mdi-checkbox-blank-circle
      </v-icon>
      <span class="font-italic"> ( {{item.status_text}} ) </span> 
    </template>
  </v-data-table>
  <table-loader v-else></table-loader>
</template>

<script>
  import { GetAllRtts } from "@/repositories/rtt.api"
  export default {
    data () {
      return {
        rtts:[],
        loading: false,
        headers: [
          {
            text: 'ID',
            align: 'start',
            value: 'id',
            width:'10%'
          },
          { text: 'Name of employee', align: 'start', value: 'user.full_name' },
          { text: 'date', align: 'start', value: 'date',  width:'20%' },
          { text: 'Start Time', align: 'start', value: 'start_time',  width:'20%' },
          { text: 'End Time', align: 'start', value: 'end_time',  width:'15%' },
          { text: 'status', align: 'start', value: 'status',  width:'10%' },
        ],
      }
    },
    created(){
      this.initialize()
    },
    methods:{
      initialize(){
        this.loading = true;
        GetAllRtts().then(({data}) => {
          console.log(data, 'rtt')
          this.rtts = data
          this.loading = false
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