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
              label="Secteur Nord"
              color="#005075"
              value="Secteur Nord"
              hide-details
            ></v-checkbox>
          </v-col>
          <v-col class="list-list">
            <v-checkbox
              label="Secteur Sud"
              color="#005075"
              value="Secteur Sud"
              hide-details
            ></v-checkbox>
          </v-col>
          <v-col class="list-list">
            <v-checkbox
              label="Autonome"
              color="#005075"
              value="Autonome"
              hide-details
            ></v-checkbox>
          </v-col>
          <v-col class="list-list">
            <v-checkbox
              label="Normandie"
              color="#005075"
              value="Normandie"
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
              value="Secteur Nord"
              hide-details
            ></v-checkbox>
          </v-col>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
  export default {
    props: ['drawer'],
    data() {
      return {
          // drawer: false,
      }
    },
    created(){
      alert('sad')
    },
    methods: {
      test(payload){
        if(payload===false){
          console.log(payload)
          this.$emit('close')
        }
      }
    },
  }
</script>

