<template>
    <v-card
        flat
    >
        <v-data-table
            :headers="headers"
            :items="centers"
            :search="search"
            hide-default-header
            hide-default-footer
            item-key="name"
            :items-per-page="-1"
            class="elevation-1"
        >
            <template v-slot:body="{ items }">
                <tbody>
                    <tr v-for="item in items" :key="item.name"
                         @click="$router.push({name: 'view_center', params: { id: item.id },})"
                    >
                        <td>
                            <v-list-item class="table_list">
                                <v-list-item-icon>
                                    <v-avatar max-width="none" height="40px" width="40px">
                                        <img src="@/assets/images/logo-securauto-150.png" alt="">
                                    </v-avatar>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <h3 class="table-title text-uppercase">
                                            {{item.name}}
                                        </h3>
                                    </v-list-item-title>
                                    <v-list-item-title>
                                        <h5 class="table-title text-capitalize title-color">
                                            {{item.address ? item.address : 'NON DÉFINI'}}
                                        </h5>
                                    </v-list-item-title>
                                </v-list-item-content>
                                <v-card-actions>
                                    <v-btn icon>
                                        <v-icon small>
                                            mdi-greater-than
                                        </v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-list-item>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-data-table>
    </v-card>
</template>
<script>
export default {
    data(){
        return {
            headers: [
                { text: 'Nom', value: 'name', width: '20%'},
                { text: 'Addresse', value: 'address', width: '40%'},
                { text: 'Numèro', value: 'mobile', width: '20%'},
                { text: 'Email', value: 'email', width: '30%'},
            ],
        }
    },
    props: {
        centers:{
            required:true,
            type:Array
        },
        search: {
            required:true,
            type:String
        }
    }
}
</script>