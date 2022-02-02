<template>
    <v-dialog
        v-model="dialog"
        width="700"
        persistent
    >
        <v-card>
           <div class="mx-5">
                <v-list dense>
                    <v-list-item>
                        <v-list-item-avatar>
                            <v-img :src="employee.image"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                        <v-list-item-title class="item-title">{{employee.first_name}}, {{employee.last_name}}</v-list-item-title>
                        <v-list-item-subtitle>{{employee.email}}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                     <v-list-item>
                        <v-icon color="primary" dark class="mr-2">
                            mdi-information
                        </v-icon>
                       
                        
                        <span class="info-text">
                            Add {{employee.first_name}}, {{employee.last_name}} to the center?
                        </span>
                    </v-list-item>
                </v-list>
           </div>


            <v-card-actions>
                <v-btn
                    class="mx-1"
                    @click="$emit('close')"
                    width="48%"
                >
                    cancel
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    class="mx-1"
                    color="#0486c2"
                    width="48%"
                    dark
                    @click="addEmployee"
                >
                    okay
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { AddEmployee } from '@/repositories/center.api'
export default {
    props:{
        dialog:{
            required: true,
            type:Boolean
        },
        employee:{
            type:Object,
            required: true,
        },
        center:{
            type:Object,
            required: true,
        }
    },
    methods:{
        addEmployee(){
            let payload = {
                center_id: this.center.id,
                users: this.employee.id
            }

            AddEmployee(payload).then(response =>{
                console.log(response,'response')
                this.$arrayupdater(this.employee, this.center.users)
                this.$emit('close')
                this.$toast.success("Successfully added!");
            })
        }
    }
}
</script>
<style scoped>
.btn-holder{
  text-align: center;
}
.item-title{
  font-size:18px !important;
}
.card-container{
  position: sticky;
    top: 85px;
}
.info-text {
    font-style: italic;
}
</style>