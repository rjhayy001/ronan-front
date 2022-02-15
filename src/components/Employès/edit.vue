<template>
<v-row>
    <v-col cols="12">
        <v-text-field
            v-model="data.email"
            label="Email"
            outlined
            clearable
            prepend-inner-icon="mdi-email-outline"
        ></v-text-field>
        <v-text-field
            v-model="data.first_name"
            label="Name"
            outlined
            clearable
            prepend-inner-icon="mdi-account"
        ></v-text-field>
        <v-text-field
            v-model="data.last_name"
            label="Last Name"
            outlined
            clearable
            prepend-inner-icon="mdi-account"
        ></v-text-field>
        <v-text-field
            v-model="data.address"
            label="Address"
            outlined
            clearable
            prepend-inner-icon="mdi-map-marker"
        ></v-text-field>
        <v-text-field
            v-model="data.city"
            label="City"
            outlined
            clearable
            prepend-inner-icon="mdi-office-building"
        ></v-text-field>
        <v-text-field
            v-model="data.mobile"
            label="Contact Number"
            outlined
            clearable
            prepend-inner-icon="mdi-card-account-phone-outline"
        ></v-text-field>
        <v-select
            v-model="data.role_id"
            :items="roles"
            item-text="name"
            item-value="id"
            label="Role"
            outlined
        ></v-select>
        <!-- <v-text-field
            label="Password"
            outlined
            clearable
            prepend-inner-icon="mdi-lock-outline"
        ></v-text-field> -->
    </v-col>
    <v-col cols="12">
        <v-btn
            @click="$emit('update', data)"
            elevation="3"
            color="primary"
            dark
        >
            Save
        </v-btn>
        <v-btn
            @click="$emit('edit')"
            elevation="3"
            color="error"
            dark
        >
            Cancel
        </v-btn>
    </v-col>
</v-row>
</template>
<script>
import {
    GetAllRoles
} from "@/repositories/employee.api"
export default {
    data(){
        return{
           roles:[]
        }
    },
    mounted(){
        this.getRoles()
    },
    methods:{
        getRoles(){
            GetAllRoles().then((data) => {
                console.log(this.data)
                this.roles = data.data
            })
        }
    },
    props:{
        show:{
           type: Boolean
        },
        data:{
            type: Object
        }
    }
}
</script>