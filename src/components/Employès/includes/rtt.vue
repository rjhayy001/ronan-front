<template>
      <v-data-table
          :headers="headers"
          :items="rtt"
          class="elevation-5"
          :hide-default-footer="true"
      >
        <template v-slot:item.status="{item}">
          <p v-if="item.status = 1">Actifs <v-icon color="success">mdi-circle-medium</v-icon></p>
          <p v-else>Inactif</p>
        </template>
      </v-data-table>
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