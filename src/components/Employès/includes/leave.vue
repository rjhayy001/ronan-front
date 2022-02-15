<template>
      <v-data-table
          :headers="headers"
          :items="desserts"
          class="elevation-5"
      ></v-data-table>
</template>
<script>
export default {
    data(){
        return{
            headers: [
              {
                text: 'Repartition',
                align: 'start',
                sortable: false,
                value: 'repartition',
              },
              { text: 'Solde actuel(jours)', value: 'solde_actuel' },
              { text: 'Demande', value: 'demande' },
              { text: 'Jours poses', value: 'jours_poses' },
              { text: 'Jours restants', value: 'jourse_restants' },
            ],
        }
    }
}
</script>