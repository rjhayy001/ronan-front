<template>
    <v-menu
        bottom
        left
        offset-y
        min-height="300px"
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
        <div style="background-color:#ffffff; min-height: 500px; min-width: 430px">
            <v-subheader class="py-5 mb-3">
                <p class="sub_title">Notifications</p>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon class="mt-5" 
                            v-bind="attrs"
                            v-on="on"
                            @click="markAsRead"
                        >
                            <v-icon>
                            mdi-email-check-outline
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>
                        Tout marquer comme lu
                    </span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon class="mt-5"                           
                            v-bind="attrs"
                            @click.stop="initialize"
                            v-on="on">
                            <v-icon>
                            mdi-refresh
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>
                        Rafraichir
                    </span>
                </v-tooltip>
            </v-subheader>
            <template v-if="loading">
                <table-loader></table-loader>
            </template>
            <v-list
            v-else
                dense
                class="clicker"
                style="width: 430px; min-height: 1vh; max-height: 80vh; overflow: auto;"
            >
                <v-list-item
                    v-for="(item, index) in notifications" :key="index+item"
                    dense
                    class="text-capitalize d-flex"
                    link
                    @click.stop="openDialog(item)"
                >   
                    <div :class="item.is_read.is_read == 0 ? 'unread-background': ''" style="display:flex;width: 100%; position: relative; padding: 10px 5px; text-transform: initial;">
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
                            <v-icon v-if="item.is_read.is_read == 1">
                                mdi-check
                            </v-icon>
                            <v-icon v-else>
                                mdi-email-outline
                            </v-icon>
                        </div>
                    </div>
                </v-list-item>
            </v-list>
        </div>
        <pending-application
            v-if="pending_dialog2" 
            :dialog="pending_dialog2" 
            :hint="value"
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

.unread-background{
    background-color:#e1e1e1;
}

.clicker::-webkit-scrollbar {
  width: 5px;
}
</style>

<script>
import { GetAllNotifications , MarkAllAsRead, MarkasRead } from "@/repositories/notifications.api"
import pendingApplication from '../../components/Planification/includes/dialogs/pendingApplication.vue';
export default {
    components:{
        pendingApplication,
    },
    data() {
        return {
            value: 'congés',
            content: 0,
            loading: false,
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
        markAsRead(){
            MarkAllAsRead().then(({data}) => {
                this.$toast.success(data.message)
                this.getNotifications()
            })
        },
        getNotifications() {
            this.content = 0
            this.loading=true
            GetAllNotifications().then(({data}) =>{
                this.notifications = data
                data.forEach(el => {
                    if(el.is_read.is_read ==0 ){
                        this.content++
                    }
                })
                this.loading=false
            })
        },
        openDialog(item) {
            MarkasRead(item.id).then(() =>{
                this.initialize()
            })
            this.value = item.type == "holiday_request" ? 'congés': 'rtt'
            this.$nextTick(function (){
                this.pending_dialog2 = true
            })
        }
    }
}
</script>