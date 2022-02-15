<template>
  <v-sheet>
    <v-data-table
      :headers="headers"
      :items="pending_rtts"
      :items-per-page="50"
      class="elevation-1 index-table"
      :hide-default-footer="true"
    >
      <template v-slot:item.date="{ item }">
        {{$DateWithMonthTextfr(item.date)}}
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
                  style="letter-spacing:2px; color:#058cd1;" class="mb-2">REJETER LA DEMANDE DE RTT?</h3>
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
                @click="DeclineRtt"
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
import { GetPendingRtts, DeclineRtt, ApproveRtt } from "@/repositories/rtt.api"
  export default {
    data () {
      return {
        headers: [
          {
            text: 'ID',
            align: 'start',
            value: 'id',
            width:'10%'
          },
          { text: 'Name of employee', align: 'start', value: 'user.full_name', width:'30%' },
          { text: 'date', align: 'start', value: 'date', width:'30%'},
          { text: 'Number of Hours', align: 'start', value: 'no_of_hrs', width:'20%'},
          { text: 'action', align: 'start', value: 'action',  width:'10%' },
        ],
        selected_rtt:[],
        pending_rtts:[],
        reject_dialog: false,
        reject_comment:'developer test raison for rejecting rtt'
      }
    },
    created(){
      this.initialize()
    },
    methods:{
      initialize(){
         GetPendingRtts().then(({data}) => {
          this.pending_rtts = data
          console.log(data, 'rtts')
        })
      },
      approve(item){
        ApproveRtt(item.id).then(() => {
          this.$toast.success('Rtt Approved Successfully')
          this.$arraysplicer(item, this.pending_rtts)
          this.$emit('success')
        })
      },
      reject(item){
        this.selected_rtt = item
        this.$nextTick(function () {
          this.reject_dialog = true
        })
      },
      DeclineRtt(){
        let payload = {
          id: this.selected_rtt.id,
          admin_comment: this.reject_comment
        }

        DeclineRtt(payload).then(({data}) =>{
          console.log(data)
          this.$toast.success('Rtt Declined Successfully')
          this.$arraysplicer(this.selected_rtt, this.pending_rtts)
        })
      }
    }
  }
</script>