<template>
    <header class="header_profile">
        <div class="content">
            <v-btn to="/" large icon>
                <v-avatar class="logo_img">
                    <img src="@/assets/images/logo-securauto-150.png" alt="">
                </v-avatar>
            </v-btn>
            <div class="header_title">
                <h2>
                    RÉGLAGES
                </h2>
            </div>
        </div>
        <!-- <v-spacer></v-spacer>
        <div style="margin: auto 0">
            <v-btn  icon>
                <v-icon color="#005075">
                    mdi-cog
                </v-icon>
            </v-btn>
        </div> -->
    </header>
</template>

<script>
export default {
    data(){
        return{
            dialog:true,
        }
    },
    methods: {

    }
}
</script>