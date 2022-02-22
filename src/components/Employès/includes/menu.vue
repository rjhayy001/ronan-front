<template>
    <div style="position: fixed; z-index: 2; bottom: 10px; right: 10px;">
        <v-btn class="mx-2" 
            fab
            dark
            color="#005075"
            @click="btn"
            @click.prevent="click()"
        >
            <v-icon>
                {{view_list ? 'mdi-window-close' : 'mdi-plus'}}
            </v-icon>
        </v-btn>
        <div v-if="button" style="position: fixed;">
           
        </div>
    </div>
</template>

<script>
export default {
      data() {
        return {
            button: false,
            view_list: false,
      };
    },
    methods: {
        reset(){
            this.button=false;
            this.view_list=false
        },
        btn(){
            if(this.view_list == true){
                this.view_list = false
            }else{
                this.view_list = true
            }
        },
        click(){
            if(this.button==false){
                this.button=true;
                this.$emit('add')
            }else{
                this.button=false
                this.$emit('cancel')
            }
        }
    },
    props:{
        menu:{
            type: Boolean
        }
    },
    watch:{
        "menu"(val){
            if(val){
                this.view_list = false
                this.button = false
            }
        }
    },
};
   
</script>