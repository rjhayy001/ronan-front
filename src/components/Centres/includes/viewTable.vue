<template>
    <v-card
        class="mx-auto center-tablelist"
        flat
    >
        <v-list>
            <v-list-item 
                class="table_list" v-for="(center,index) in centers" 
                :key="index+center.id+'cent'+center.name"
                @click="$router.push({name: 'view_center', params: { id: center.id },})"
            >
                <v-list-item-icon>
                    <v-avatar max-width="none" height="40px" width="40px">
                        <img src="@/assets/images/logo-securauto-150.png" alt="">
                    </v-avatar>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>
                        <h3 class="table-title text-uppercase">
                            {{center.name}}
                        </h3>
                    </v-list-item-title>
                    <v-list-item-title>
                        <h5 class="table-title text-capitalize title-color">
                            {{center.address}}
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
        </v-list>
    </v-card>
</template>
<script>
export default {
    props: {
        centers:{
            required:true,
            type:Array
        }
    }
}
</script>