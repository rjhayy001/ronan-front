<template>
    <div>
        <template v-if="!loading">
            <create-form :dialog="dialog" @close="dialog=false" @success="hardReload"></create-form>
            <v-subheader class="my-2">
                <p class="sub_title">Centres</p>
                <v-spacer></v-spacer>
                <v-text-field
                    class="my-2 mr-2 shrink"
                    small
                    width="100px"
                    dense
                    :search="search"
                    :hide-details="true"
                    label="Centre de recherche"
                    solo
                    v-model="search"
                    append-icon="mdi-magnify"
                    single-line 
                ></v-text-field>
                <!-- <v-btn depressed>
                    <v-icon
                        color="black"
                    >
                        mdi-magnify
                    </v-icon>          
                </v-btn> -->
                <v-btn depressed @click="view_list=!view_list" class="mx-2" icon>
                    <v-icon
                    
                        color="black"
                    >
                    {{view_list ? 'mdi-format-list-bulleted' : 'mdi-view-compact'}}
                    </v-icon>          
                </v-btn>
                <v-btn depressed v-if="$canAccess()"  @click="dialog = true" icon class="mr-2">
                    <v-icon
                        color="black"
                        v-if="$isAdmin()"
                    >
                        mdi-plus
                    </v-icon>          
                </v-btn>
            </v-subheader>
                <v-data-table
                    v-if="view_list"
                    :search="search"
                    class="elevation-1 mx-4 index-table"
                    :headers="headers"
                    :items="centers"
                    :items-per-page="50"
                    @click:row="view($event)"
                ></v-data-table>

                <ViewTable
                    v-if="!view_list"
                    :centers="centers"
                    :search="search"
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
        createForm,
    },
    data(){
        return{
            search:'',
            dialog:false,
            edit:false,
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
        hardReload(){
            GetAllCenters().then(({data}) => {
                console.log(data, 'centers')
                this.centers = data
            })
        },
        view(item){
            this.$router.push({name: 'view_center', params: { id: item.id },})
        }
    },
}
</script>