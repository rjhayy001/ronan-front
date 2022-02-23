<template>
    <div>
        <div class="d-flex" style="padding-top: 20px">
            <div class="d-flex" style="margin-right: auto" >
                <div style="margin: auto 0 auto 15px;">
                    <h4 style="font-weight: 400">
                        Affichage
                    </h4>
                </div>
                <div style="width: 5.5em" >
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
                <div class="d-flex" style="gap: 5px;margin: auto 0;">
                    <h4 style="font-weight: 400">
                        sur
                    </h4>
                    <h4 style="font-weight: 400">
                        99
                    </h4>
                </div>
            </div>
            <div class="d-flex" style="padding: 0 10px; margin: auto 0">
                <div>
                    <v-btn icon>
                        <v-icon>
                            mdi-arrow-collapse-left
                        </v-icon>
                    </v-btn>
                </div>
                <div style="margin: auto 0">
                    <h3 style="padding: 0 20px; margin: auto 0; color:#3fa6d9; font-weight: 400">
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
            class="mx-auto"
            flat
            style="background-color:#fafafa"
        >
            <v-list>
                <v-list-item class="table_list">
                    <v-list-item-icon style="margin: auto 20px auto 10px">
                        <v-avatar max-width="none" height="50px" width="50px">
                            <img src="@/assets/images/logo-securauto-150.png" alt="">
                        </v-avatar>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            <h2 style="font-weight: 400">
                            asd
                            </h2>
                        </v-list-item-title>
                        <v-list-item-title>
                            <h4 style="font-weight: 400; color: gray">
                            asd
                            </h4>
                        </v-list-item-title>
                        <v-list-item-title class="d-flex" style="gap: 5px">
                            <h4 style="font-weight: 400; color: gray">
                            asd
                            </h4>
                            <h4 style="font-weight: 400; color: gray">
                            asdasd
                            </h4>
                        </v-list-item-title>
                        <v-list-item-title>
                            <h4 style="font-weight: 400; color: gray">
                            asd
                            </h4>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card>
    </div>
</template>
<script>
export default {
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


<style scoped>

.table_list:hover {
  background-color: #f0f0f0;
}
</style>