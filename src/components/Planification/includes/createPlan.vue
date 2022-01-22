<template style="border-radius:25px">
   <div>
        <v-card>
            <v-form>
                <v-container>
                    <v-row class="row" style="  border: 2px solid black; border-radius: 25px;">
                        <div style="display:flex; position:relative; width: 100%">
                            <h3>
                                Créer un planification
                            </h3>
                            <div style="position:absolute; right: 0">
                                <v-btn  
                                    @click="close" 
                                    class="mx-2"
                                    fab
                                    small
                                    height="20px"
                                    width="20px"
                                    style="box-shadow: none;background-color:transparent"
                                >
                                    <v-icon
                                        flat
                                        solo
                                    >
                                        mdi-window-close
                                    </v-icon>          
                                </v-btn>
                            </div>
                        </div>
                        <div style="display:flex; width:100%; padding: 5px">
                            <div style="width: 50%;">
                                <div>
                                    <div style="display:flex; flex-direction:column;margin:auto; line-height:1">
                                        <div style="    margin: 0 auto!important;height: 120px;">
                                            <img style="width:90px; height: 120px" src="@/assets/images/logo-securauto-150.png" >
                                        </div>
                                        <div style="margin:auto;font-size: 16px">
                                            employés nom
                                        </div>
                                        <div style="margin:auto; font-size: 14px; color:gray">
                                            employés email
                                        </div>
                                    </div>
                                    <div style="display:flex; padding-left: 10px; gap: 30px; margin-top: 2em">
                                        <div>
                                            <v-icon>
                                                mdi-filter-variant
                                            </v-icon>
                                        </div>
                                        <div style="line-height:1.1">
                                            <div style="margin:auto;font-size: 20px">
                                                Secteur Nord
                                            </div>
                                            <div style="margin:auto;font-size: 14px;color:gray">
                                                MORLAIX JARLOT
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="width: 50%;">
                                <div style="line-height:1">
                                    <span>
                                        Date de début
                                    </span>
                                    <div style="padding-left:10px">
                                    <v-btn class="sad" flat solo style="box-shadow:none; height: 100%">
                                        {{date}}
                                    </v-btn>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            red
                        </div>
                    </v-row>
                </v-container>
            </v-form>
        </v-card>
    </div>
</template>

<script>
  import moment from 'moment' 
export default {
    data(){
        return {
            regions: [],
            date: moment().format('MMM. DD YYYY')
        }
    },
    methods:{
        close(){
            this.$emit('close')
        }
    }
}
</script>

<style scoped>


</style>