<template>
    <div>
        <div class="d-flex">
            <div class="d-flex mr-auto">
                <div class="my-auto mr-0 ml-5">
                    <h4 class="font-weight-light">
                        Affichage
                    </h4>
                </div>
                <div class="width_employe-view">
                    <v-select
                        hide-details="false"
                        class="select-data"
                        v-model="e2"
                        :items="selects"
                        menu-props="auto"
                        solo
                        flat
                    ></v-select>
                </div>
                <div class="d-flex my-auto mx-0 employee_view_gap">
                    <h4 class="font-weight-light">
                        sur
                    </h4>
                    <h4 class="font-weight-light">
                        99
                    </h4>
                </div>
            </div>
            <div class="d-flex py-0 px-10px my-aut0 mx-0">
                <div>
                    <v-btn icon>
                        <v-icon>
                            mdi-arrow-collapse-left
                        </v-icon>
                    </v-btn>
                </div>
                <div class="my-auto mx-0">
                    <h3 class="py-0 px-5 mx-0 mt-0 mb-3 font-weight-light employee_paginate-count">
                        1
                    </h3>
                </div>
                <div>
                    <v-btn icon>
                        <v-icon>
                            mdi-arrow-collapse-right
                        </v-icon>
                    </v-btn>
                </div>
            </div>
        </div>
        <v-card
            class="mx-auto employee_view_background"
            flat
        >
            <v-list>
                <v-list-item class="table_list" v-for="(item, index) in employees" :key="index+item.id+'employeelist'"
                    @click="$router.push({name: 'view_employee', params: { id: item.id },})"
                >
                    <v-list-item-icon class="my-auto ml-3 mr-2">
                        <v-avatar max-width="none" height="40px" width="40px">
                            <img src="@/assets/images/logo-securauto-150.png" alt="">
                        </v-avatar>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            <h3 class="font-weight-light">
                            {{item.full_name}}
                            </h3>
                        </v-list-item-title>
                        <v-list-item-title>
                            <h5 class="font-weight-light employee_view-color-text">
                            {{item.address  ? item.address : 'null'}}
                            </h5>
                        </v-list-item-title>
                        <v-list-item-title class="d-flex employee_view_gap">
                            <h5  class="font-weight-light employee_view-color-text">
                            {{item.zip_code ? item.zip_code : 'null'}} {{item.city ? item.city : 'null'}}
                            </h5>
                        </v-list-item-title>
                        <v-list-item-title>
                            <h5  class="font-weight-light employee_view-color-text">
                            {{item.mobile ? item.mobile : 'null'}}
                            </h5>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card>
    </div>
</template>
<script>
export default {
    props:{
        employees: {
            required: true,
            type: Array
        }
    },
    data(){
        return{
            e2:'100',
            selects: [
            '100', '200', '300', '400', '500' 
          ],
        }
    },
}
</script>