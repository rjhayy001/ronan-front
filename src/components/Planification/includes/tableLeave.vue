<template>
  <v-sheet>
    <v-data-table
      :headers="headers"
      :items="pending_leaves"
      :items-per-page="50"
      class="elevation-1 index-table"
      :hide-default-footer="true"
    >
      <template v-slot:item.start_date="{ item }">
        {{$DateWithMonthTextfr(item.start_date)}}
      </template>
      <template v-slot:item.end_date="{ item }">
        {{$DateWithMonthTextfr(item.end_date)}}
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon color="success" class="mr-4" @click="approve(item)">mdi-check</v-icon>
        <v-icon color="error" @click="reject(item)">mdi-cancel</v-icon>
      </template>
    </v-data-table>
    <!-- reject dialog -->
    <v-dialog
      v-model="reject_dialog"
      transition="dialog-left-transition"
      class="menu_"
      width="800px"
      @click:outside="reject_dialog=false"
    >
      <v-card>
        <v-container>
          <v-row>
             <div class="ml-3">
                <h3
                  style="letter-spacing:2px; color:#058cd1;" class="mb-2">REJETER LA DEMANDE DE CONGE?</h3>
                <p style="font-weight:200;">Pour rejeter completement la demande, vous devez fournir une raison valable</p>
              </div>
            <v-col
              cols="12"
            >
              <v-textarea
                placeholder="Raison"
                solo
                rows="1"
                auto-grow
                v-model="reject_comment"
                row-height="100"
                prepend-inner-icon="mdi-note-edit-outline"
              ></v-textarea>
            </v-col>
            <v-col>
              <v-btn 
                @click="reject_dialog=false" 
                height="50px" 
                color="rgb(238 238 238)"
                width="48%" 
                class="mr-2"
              >
                ANNULER
              </v-btn>
              <v-btn
                width="49%"
                dark
                height="50px"
                color="#005075!important"
                class="ml-2"
                @click="DeclineHoliday"
              >
                VALIDER
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>
<script>
import { GetPendingHolidays, DeclineHoliday, ApproveHoliday } from "@/repositories/holidays.api"
  export default {
    data () {
      return {
        reject_dialog:false,
        headers: [
          {
            text: 'ID',
            align: 'start',
            value: 'id',
            width:'10%'
          },
          { text: 'Name of employee', align: 'start', value: 'user.full_name' },
          { text: 'Start Date', align: 'start', value: 'start_date' },
          { text: 'End Date', align: 'start', value: 'end_date' },
          { text: 'Actions', align: 'start', value: 'action',  width:'10%' },
        ],
        selected_leave:{},
        pending_leaves:[],
        reject_comment:'developer test raison for rejecting holiday'
      }
    },
    created(){
      this.initialize()
    },
    methods:{
      initialize(){
         GetPendingHolidays().then(({data}) => {
          this.pending_leaves = data
          console.log(data, 'holidays')
        })
      },
      approve(item){
        ApproveHoliday(item.id).then(({data}) => {
          console.log(data, 'holidays')
          this.$toast.success('Leave Approved Successfully')
          this.$arraysplicer(item, this.pending_leaves)
          this.$emit('success')
        })
      },
      reject(item){
        this.selected_leave = item
        this.$nextTick(function () {
          this.reject_dialog = true
        })
      },
      DeclineHoliday(){
        let payload = {
          id: this.selected_leave.id,
          admin_comment: this.reject_comment
        }
        DeclineHoliday(payload).then(({data}) =>{
          console.log(data)
          this.$toast.success('Leave Declined Successfully')
          this.$arraysplicer(this.selected_leave, this.pending_leaves)
        })
      }
    }
  }
</script>