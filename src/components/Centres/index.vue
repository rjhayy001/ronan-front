<template>
    <div>
        <template v-if="!loading">
            <create-form :dialog="dialog" @close="dialog=false"></create-form>
            <v-subheader class="">
                <p class="sub_title">Centres</p>
                <v-spacer></v-spacer>
                <v-btn depressed>
                    <v-icon
                        color="black"
                    >
                        mdi-magnify
                    </v-icon>          
                </v-btn>
                <v-btn depressed @click="view_list=!view_list">
                    <v-icon
                    
                        color="black"
                    >
                    {{view_list ? 'mdi-format-list-bulleted' : 'mdi-view-compact'}}
                    </v-icon>          
                </v-btn>
                <v-btn depressed  @click="dialog = true">
                    <v-icon
                        color="black"
                    >
                        mdi-plus
                    </v-icon>          
                </v-btn>
            </v-subheader>
                <v-data-table
                    v-if="view_list"
                    class="elevation-1 mx-4"
                    :headers="headers"
                    :items="centers"
                    :items-per-page="50"
                    @click:row="view($event)"
                ></v-data-table>

                <ViewTable
                    v-if="!view_list"
                />
        </template>
        <table-loader v-else></table-loader>
    </div>
</template>
<script>
import createForm from './create.vue'
import ViewTable from './includes/viewTable.vue'
import { GetAllCenters } from "@/repositories/center.api";
export default {
    components: {
        ViewTable,
        createForm
    },
    data(){
        return{
            dialog:false,
            centers:[],
            headers: [
                { text: 'Nom', value: 'name', width: '20%'},
                { text: 'Addresse', value: 'address', width: '40%'},
                { text: 'Numèro', value: 'mobile', width: '20%'},
                { text: 'Email', value: 'email', width: '30%'},
            ],
            loading:false,
            view_list: true,
            iconText: 'format-list-bulleted',
            items: ['Secteur Nord','Secteur Sud', 'Autonome', 'Normandie'],
        }
    },
    created(){
        this.initialize()
    },
    methods:{
        initialize(){
            this.loading =  true
            GetAllCenters().then(({data}) => {
                console.log(data, 'centers')
                this.centers = data
                this.loading = false
            })
        },
        view(item){
            this.$router.push({name: 'view_center', params: { id: item.id },})
        }
    },
}
</script>
