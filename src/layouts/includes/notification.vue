<template>
    <v-menu
        bottom
        left
        offset-y
        style="position: relative;left: 1430px;!important"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                class="mx-2"
                fab
                dark
                small
                v-bind="attrs"
                v-on="on"
                color="primary"
            >
                <v-icon
                v-if="content==0"
                    color="white"
                >
                    mdi-bell
                </v-icon>  
                <v-badge
                    v-else
                    color="red"
                    :content="content"
                >
                    <v-icon
                        color="white"
                    >
                        mdi-bell
                    </v-icon>    
                </v-badge>      
            </v-btn>
        </template>
        <div style="background-color:#ffffff">
            <div style="background-color:transparent;width: 100%">
                <div>
                    <h3 class="px-3 pt-3 text-lg-h4">
                        Notifications
                    </h3>
                </div>
            </div>
            <v-list
                dense
                class="clicker"
                style="width: 430px; min-height: 1vh; max-height: 80vh; overflow: auto;"
            >
                <v-list-item
                    v-for="(item, index) in notifications" :key="index+item"
                    dense
                    class="text-capitalize d-flex"
                    link
                    @click.prevent="openDialog()"
                >   
                    <div class="d-flex" style="width: 100%; position: relative; padding: 10px 0; text-transform: initial">
                        <v-list-item-icon style="margin: auto 40px auto 10px">
                            <v-avatar max-width="none" height="40px" width="40px">
                                 <v-img :src="item.user.image"></v-img>
                            </v-avatar>
                        </v-list-item-icon>
                        <div>
                            <div class="font-weight-bold" style="font-size: 18px">
                                {{item.title}}
                            </div>
                            <div style="font-size: 14px" class="ellipse two-lines font-weight-medium">
                                {{item.message}}
                            </div>
                            <div class="font-italic font-weight-bold" style="font-size: 12px; color: gray">
                                {{item.time}}
                            </div>
                        </div>
                        <div style="margin: auto 0 auto auto;">
                            <v-icon>
                                mdi-check
                            </v-icon>
                        </div>
                    </div>
                </v-list-item>
            </v-list>
        </div>
        <pending-application
            v-if="pending_dialog2" 
            :dialog="pending_dialog2" 
            
            @close="pending_dialog2=false"
            @success="$emit('success')"
        />
    </v-menu>
</template>

<style scoped>
.ellipse {
    white-space: nowrap;
    display:inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
 }

.two-lines {
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    white-space: normal;
}

.clicker::-webkit-scrollbar {
  width: 5px;
}
</style>

<script>
import { GetAllNotifications } from "@/repositories/notifications.api"
import pendingApplication from '../../components/Planification/includes/dialogs/pendingApplication.vue';
export default {
    components:{
        pendingApplication,
    },
    data() {
        return {
            content: 1,
            notifications: [],
            pending_dialog2: false,
            dialog65:false,

        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.getNotifications();
        },
        getNotifications() {
            GetAllNotifications().then(({data}) =>{
                this.notifications = data
                console.log(this.notifications, "notifications")
            })
        },
        openDialog() {
            this.pending_dialog2 = true
            console.log(this.pending_dialog2)
        }
    }
}
</script>