<template>
    <div class="component_container">
        <div class="title_head" style="color:black;">
            <h2 class="text_fw pad_header">
                Annonce
            </h2>
            <v-spacer></v-spacer>
            <v-btn 
                class="parameter_btn" 
                @click="addRegions=true" 
                solo 
                text 
                icon
            >
            </v-btn>
        </div>
        <div style="display:flex; width: 100%; height: 86vh; ">
            <div style="color:black; width: 80%; height: 60px;">
                <div style="height: 85vh; position:relative; width: 100%">
                    <div class="data-scroll">
                        <div style="width: 95%; justify-content: center; margin:auto">
                            <div v-if="EmptyMessages">
                                <h2 class="text_fw pad_header title_head border_none">
                                    Tout
                                </h2>
                            </div>
                            <div v-else style="width: 100%; flex-wrap: wrap;" class="d-flex" >
                                <div v-for="(message, index) in Messages" :key="index" class="d-flex text_fw pad_header title_head border_none" style="width: 15em">
                                    <div>
                                        <v-avatar>
                                            <img :src="message.image" alt="">
                                        </v-avatar>
                                    </div>
                                    <div class="d-flex" style="line-height: 1.2;margin: auto 0 auto 10px; width: 10em">
                                        <h4 style="font-weight: 400">
                                            {{message.full_name}}
                                        </h4>
                                    </div>
                                    <div>
                                        <v-btn icon @click="removeEmploye(message)">
                                            <v-icon color="red">
                                                mdi-close
                                            </v-icon>
                                        </v-btn>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="width: 95%; display:flex; justify-content:center; margin:auto">
                            <div style="width: 100%; height: 100%">
                                <div class="advertise_field" style="padding-bottom: 10px">
                                    <v-text-field 
                                        outlined 
                                        prepend-inner-icon="mdi-alpha-t"
                                        label="Titre de l'annonce *"
                                        placeholder="Votre titre"
                                    ></v-text-field>
                                </div>
                                <div class="advertise_field text_box" style="padding-bottom: 10px">
                                    <v-text-field 
                                        outlined 
                                        prepend-inner-icon="mdi-text-box-multiple-outline"
                                        label="Contenu de l'annonce *"
                                        placeholder="Contenu"
                                    ></v-text-field>
                                </div>
                                <div class="advertise_field" style="padding-bottom: 10px">
                                    <span>
                                        Importance de l'annonce
                                    </span>
                                    <v-row>
                                        <v-select
                                            class="select-data"
                                            v-model="e2"
                                            :items="selects"
                                            menu-props="auto"
                                            solo
                                            flat
                                            height="47px"
                                        ></v-select>
                                    </v-row>
                                    <span>
                                        Ceci est un avis de base, pas d'interruptiona et pas de données à voir
                                    </span>
                                </div>
                                <div style="padding: 10px 0">
                                    <v-btn large
                                        :loading="isSelecting" 
                                        @click="handleFileImport"
                                        style="text-transform: none; width: 100%; background-color:#e0e0e0!important;">
                                        Choisissez l'image
                                    </v-btn>
                                    <input 
                                        ref="uploader" 
                                        class="d-none" 
                                        type="file" 
                                        @change="onFileChanged"
                                    />
                                </div>
                                <div>
                                    <div style="height: 100%">
                                        <v-img :src="selectedFile" contain>

                                        </v-img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="position: absolute; bottom: 10px; width: 100%; display: flex; justify-content: center; margin: auto">
                        <v-btn width="95%" large color="primary" dark >
                            Publier
                        </v-btn>
                    </div>
                </div>
            </div>
            <div style="width: 20%; color: black;  background-color:#e0e0e0; ">
                <div  style="padding-bottom: 5px">
                    <h2 class="title_head" style=" padding-left: 15px">
                        Contacts
                    </h2>
                </div>
                <div class="example">
                    <div  v-for="(employee, index) in employees" :key="index">
                        <v-btn @click="click(employee)" text width="100%" style="border-radius:0!important; height: 60px; justify-content:initial!important">
                            <div>
                                 <v-avatar>
                                    <img :src="employee.image" alt="">
                                </v-avatar>
                            </div>
                            <div  style="line-height: 1.2;margin: auto 0 auto 10px">
                                <h4 style="font-weight: 700">
                                    {{employee.full_name}}
                                </h4>
                                <h5 style="justify-content: initial; display: flex; font-weight: 400">
                                    {{employee.mobile}}
                                </h5>
                            </div>
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { GetAllEmployeesSort } from "@/repositories/employee.api";
export default {
    data(){
        return{
            imageData: null,
            EmptyMessages: true,
            Messages: [],
            employees:[],
            e2:'Basse',
            selects: [
                'Basse', 'Moyenne', 'Haute' 
            ],
            isSelecting: false,
            selectedFile: null
        }
    },created(){
        this.initialize()
    },
    methods: {
        initialize(){
            this.loading = true
            GetAllEmployeesSort().then(({data}) => {
                console.log(data)
                this.employees = data
                this.loading = false
            })
        },
        view(item){
            this.$router.push({name: 'view_employee', params: { id: item.id },})
        },
        click(employee) {
            if(!this.Messages.includes(employee)){
                this.Messages.push(employee);           
            }else{
                this.Messages.splice(this.Messages.indexOf(employee), 1);  
            }
            console.log(this.Messages,"Message");
            this.showHide()

        },
        removeEmploye(message) {
            this.Messages.splice(this.Messages.indexOf(message), 1);
            this.showHide() 
        },
        showHide() {
            if(this.Messages!=""){
                this.EmptyMessages = false
            }else {
                this.EmptyMessages = true
            }
        },
        handleFileImport() {
                this.isSelecting = true;

                // After obtaining the focus when closing the FilePicker, return the button state to normal
                window.addEventListener('focus', () => {
                    this.isSelecting = false
                }, { once: true });
                
                // Trigger click on the FileInput
                this.$refs.uploader.click();
            },
            onFileChanged(e) {
                const file = e.target.files[0];
                this.selectedFile = URL.createObjectURL(file)
                // Do whatever you need with the file, liek reading it with FileReader
            },
    }
}
</script>

<style scoped>
#app {
  padding: 20px;
}

#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}
</style>