<template>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      right
      width="300px"
      height="120vh"
      @input="test($event)"
      class="right-drawer"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Filter:</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content class="right">
          <v-list-item-title class="text1">Réinitialiser</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Région:</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item class="drawer-list">
          <v-col class="list-list">
            <v-checkbox
              v-for="(region, index) in regions" :key="index"
              :label="region.name"
              :value="region.id"
              v-model="selectedRegion"
              color="#005075"
              hide-details
            ></v-checkbox>
          </v-col>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item class="drawer-list">
          <v-col class="list-list list1">
            <v-list-item-content>
              <v-list-item-title class="list1-text">Vue des employés:</v-list-item-title>
            </v-list-item-content>
            <v-checkbox
              color="#005075"
              v-model="viewEmployee"
              hide-details
            ></v-checkbox>
          </v-col>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
  import { GetRawRegions } from '@/repositories/region.api'
  export default {
    props: ['drawer'],
    data() {
      return {
          // drawer: false,
          regions: [],
          selectedRegion:[],
          viewEmployee:false
      }
    },
     watch:{
        'selectedRegion': function(value) {
            this.$emit('filter', value)
        }
    },
    created(){
      this.initialize()
    },
    methods: {
      initialize(){
        GetRawRegions().then(({data}) => {
          this.regions = data
          console.log(data,'test')
        })
      },
      test(payload){
        if(payload===false){
          console.log(payload)
          this.$emit('close')
        }
      }
    },
  }
</script>

