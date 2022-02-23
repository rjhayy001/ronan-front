<template>
    <v-card min-height="90vh" class="card-container">
    <v-img
      :src="center.image"
      lazy-src="https://picsum.photos/id/11/10/6"
      height="200px"
      dark
    >
      <v-row class="fill-height">
        <v-card-title>
          <v-btn
            color="transparent"
            rounded
            class="ml-2"
            style="position: absolute;
            left: 0;
            top: 12px;"
            width="130"
            @click="$router.go(-1)"
          >
            <v-icon left >mdi-chevron-left</v-icon>
            <span>retour</span>
          </v-btn>
        </v-card-title>
        <v-spacer></v-spacer>
      </v-row>
    </v-img>

    <div>
      <div class="text-center mt-4 ">
        <v-btn 
          class="mr-4 text-body-1"  
          rounded
          color="primary"
          dark
          @click="editCenter"
        >
          <v-icon left>mdi-pencil</v-icon>
          <span style="font-size:13px">Editer</span>
        </v-btn>
        <v-btn
          rounded
          color="error"
          dark
          @click="deleteCenter"
        >
          <v-icon left>mdi-delete</v-icon>
          <span style="font-size:13px">Supprimer</span>
        </v-btn>
      </div>
    </div>

    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title style="font-size: 22px;color: #0486c2;">{{center.name}}</v-list-item-title>
          <v-list-item-subtitle>{{center.email ? center.email : 'undefined'}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list dense>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-phone-outline
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="item-title">{{center.mobile}}</v-list-item-title>
          <v-list-item-subtitle>Mobile</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider ></v-divider>

      <v-list-item class="my-1">
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-map-marker-outline
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="item-title">{{center.address}}</v-list-item-title>
          <v-list-item-subtitle>Address</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item class="my-1">
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-office-building-outline
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="item-title">{{center.city}}</v-list-item-title>
          <v-list-item-subtitle>City</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item class="my-1">
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-email-outline
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="item-title">{{center.zip_code}}</v-list-item-title>
          <v-list-item-subtitle>Zip Code</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item class="my-1">
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-star-box-outline
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <template v-if="!editing_region">
            <v-list-item-title class="item-title">{{center.region.name}}</v-list-item-title>
            <v-list-item-subtitle>Region</v-list-item-subtitle>
          </template>
          <template v-else>
            <v-select
              dense
              item-text="name"
              item-value="id"
              :items="regions"
              v-model="current_region"
              return-object
              solo
            ></v-select>
          </template>
        </v-list-item-content>

        <v-list-item-action>
          <v-icon color="primary" v-if="!editing_region" @click="editing_region=true">mdi-pencil</v-icon>
          <v-icon color="primary" v-else @click="saveRegion">mdi-download</v-icon>
        </v-list-item-action>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item class="my-1">

        <v-list-item-content>
          <template v-if="!editing_manager">
            <v-list-item-title class="item-title">{{center.manager ? center.manager.full_name : 'Non'}}</v-list-item-title>
            <v-list-item-subtitle>Manager</v-list-item-subtitle>
          </template>
          <template v-else>
            <v-select
              dense
              item-text="full_name"
              item-value="id"
              :items="employees"
              v-model="current_manager"
              return-object
              solo
            ></v-select>
          </template>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
          <v-icon color="primary" v-if="!editing_manager" @click="editing_manager=true">mdi-pencil</v-icon>
          <v-icon color="primary" v-else @click="editManager">mdi-download</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

    </v-list>
  <edit-form :dialog="dialog" @close="dialog=false" :center="center" @success="$emit('success')"></edit-form>
  </v-card>
</template>
<script>
import editForm from '../edit.vue'
import { GetRawRegions } from "@/repositories/region.api"
import { updateCenterRegion, AssignManager } from "@/repositories/center.api"
import { GetAllEmployees } from "@/repositories/employee.api";
export default {
      components: {
        editForm,
    },
  data(){
    return {
      dialog:false,
      editing_region: false,
      editing_manager: false,
      regions: [],
      current_region:{},
      current_manager:{},
      employees: [],
    }
  },
  props: {
    center: {
      type: Object,
      required: true,
    },
  },
  created(){
  },
  methods:{
    test(){
      alert('sad')
    },
    initialize(){
      this.getRegions()
      this.getEmployees()
      this.current_region = this.center.region
      this.current_manager = this.center.manager
    },
    editCenter(){
        this.$nextTick(function (){
          this.dialog = true
        })
    },
    getRegions(){
      GetRawRegions().then(({data}) => {
        this.regions = data
      })
    },
    getEmployees(){
      GetAllEmployees().then(({data}) => {
        this.employees = data
        console.log(this.employees,"employee")
      })
    },
    saveRegion(){
      let payload = {
        region_id: this.current_region.id
      }

      this.center.region = this.current_region
      this.$nextTick(function () {
        updateCenterRegion(this.center.id, payload).then(({data}) => {
          this.$toast.success(data.message)
        })
        this.editing_region = false
      })
    },
    deleteCenter(){
        let message = `Are you sure you want to DELETE CENTER ${this.center.name} ?`
       this.$root
          .$confirm(message,'#ff5252')
          .then(result => {
              if(result)(
                  alert('NO FUNCTIONALITY USED')
              )
          })
    },
    editManager(){
      let payload = {
        user_id: this.current_manager.id,
        center_ids: this.center.id
      }

      this.center.manager = this.current_manager
      this.center.manager.id = this.current_manager.id

      this.$nextTick(function () {
        AssignManager(payload).then(({data}) =>{
          console.log(data, 'sad')
          this.$toast.success(data.message)
        })
        this.editing_manager = false
      })
    },
    // view(center){
    //   console.log(center,"for update")
    //   // this.$router.push({name: 'view_center', params: { id: item.id },})
    // }
  }
}
</script>
<style scoped>
.btn-holder{
  text-align: center;
}
.item-title{
  font-size:15px !important;
}
.card-container{
  position: sticky;
    top: 85px;
}
</style>