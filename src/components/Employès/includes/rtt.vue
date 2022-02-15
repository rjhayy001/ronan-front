<template>
      <v-data-table
          :headers="headers"
          :items="rtt"
          class="elevation-5"
      ></v-data-table>
</template>
<script>
export default {
    data(){
        return{
            headers: [
              {
                text: 'Commentaire',
                align: 'start',
                sortable: false,
                value: 'admin_comment',
              },
              { text: 'Date', value: 'date' },
              { text: 'Heure de debut', value: 'start_time' },
              { text: 'Heure de fin', value: 'end_time' },
              { text: "Nombre d'heures", value: 'no_of_hrs' },
              { text: 'Statut', value: 'status' },
            ]
        }
    },
    props:{
      rtt:{
        type: Array
      }
    }
}
</script>