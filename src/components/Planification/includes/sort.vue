<template>
    <v-dialog
        v-model="dialog"
        width="700"
        persistent
    >
        <v-card>
            <v-toolbar dense flat class="pb-4 pt-2">
                <v-toolbar-title>Sort {{myArray.name}} Centers</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-icon @click="$emit('close')">mdi-close</v-icon>
            </v-toolbar>
            <v-container>
                <v-card flat class="ma-3">
                    <draggable v-model="myArray.centers" @change="update">
                        <template v-for="(item) in myArray.centers">
                            <v-list-item :key="item.id" class="name-holder mt-2" dense>
                                
                                <v-list-item-content>
                                    <span >
                                        <v-icon class="mr-3">
                                            mdi-sort
                                        </v-icon>
                                        {{item.name}}
                                        <v-tooltip right>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-chip
                                                    color="gray"
                                                    small
                                                    class="float-right"
                                                    v-bind="attrs"
                                                    v-on="on"
                                                >
                                                    {{item.users.length}}
                                                </v-chip>
                                            </template>
                                            <span>
                                                Employees Count
                                            </span>
                                        </v-tooltip>
                                    </span>
                                </v-list-item-content>
                                <!-- <v-list-item-action>
                                     <v-chip
                                        class="ma-2"
                                        label
                                        >
                                        Label
                                        </v-chip>
                                </v-list-item-action> -->
                            </v-list-item>
                        </template>
                    </draggable>
                    <v-card-actions class="mt-2">
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="save" block dark>save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-container>
        </v-card>
    </v-dialog>
</template>
<script>
import draggable from 'vuedraggable'
import { GetRegions, SortCenters } from '@/repositories/region.api'
export default {
    components: {
        draggable,
    },
    data () {
        return {
            myArray:[]
        }
    },
    props: {
        dialog: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
        },
    },
    methods:{
        initialize(){
            GetRegions(this.data.id).then(({data}) => {
                this.myArray = data
                console.log(data, 'tessss')
            })
        },
        update(){
            this.myArray.centers.map((center, index) => {
                center.order = index+1
            })
        },
        save(){
            SortCenters(this.myArray).then(({data}) => {
                this.$emit('success')
                this.$emit('close')
                this.$toast.success(data.message)
            })
        }
    },
    watch:{
        'dialog': function(value) {
            if(value){
                this.initialize()
            }
        }
    },
  }
</script>
<style scoped>
.name-holder{
    border: 1px solid gray !important;
    cursor: move !important;
}
</style>