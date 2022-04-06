<template>
	<v-dialog v-model="dialog" width="650" :max-width="options.width" :style="{ zIndex: options.zIndex }" @keydown.esc="cancel">
		<v-card>
            <v-card-title class="headline lighten-1 white--text text-capitalize" :style="'background-color:' +color" primary-title>{{title}}</v-card-title>
            <v-card-text class="pa-3" v-show="!!message" v-html="message"></v-card-text>
            <v-card-actions class="pt-0">
                <!-- <v-spacer></v-spacer> -->
                <v-btn class="ma-2 px-5" tile large color="#c1c1c1" @click.native="cancel" dark width="48%">
                    <v-icon left>mdi-cancel</v-icon> Non
                </v-btn>
                <v-btn class="ma-2 px-5" tile large :color="color" @click.native="agree" dark width="48%">
                    <v-icon left>mdi-check</v-icon> Oui 
                </v-btn>
            </v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
    export default {
        data: () => ({
            dialog: false,
            resolve: null,
            reject: null,
            message: null,
            title: null,
            options: {
				color: 'primary',
				width: 700,
				zIndex: 200
            },
            color:'primary'
        }),
        methods: {
            open( message , color='primary', title='Confirmer') {
                this.dialog = true
                this.title = title
                this.message = message
                this.color = color
                return new Promise((resolve, reject) => {
                    this.resolve = resolve
                    this.reject = reject
                })
            },
            agree() {
                this.resolve(true)
                this.dialog = false
            },
            cancel() {
                this.resolve(false)
                this.dialog = false
            },
            design(){
                return {
                    'background-color': this.color,
                }
            }
        }
    }
</script>
<style>
.v-dialog .v-card {
    border-radius:0px !important;
}

.v-dialog .v-card__text {
    font-size: 19px;
    padding: 25px!important;
}
</style>
