<template>
    <v-dialog
        transition="dialog-left-transition"
        v-model="dialog"
        class="menu_"
        width="800px"
    >
        <v-card style="border:1px solid black; border-radius: 5px">
            <v-form>
                <v-container>
                    <v-row style="padding: 30px">
                        <div style="display:flex">
                            <div>
                                <v-icon style="font-size: 50px; margin:auto; color:#41c1e1;">
                                    mdi-alert-circle
                                </v-icon>
                            </div>
                            <div class="">
                                <h3>Créer une centre</h3>
                                <p>L'action ne peut pas être annulée</p>
                            </div>
                        </div>
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                label="Nom de la demande"
                                placeholder="Nom de la demande"
                                outlined
                                dense
                                prepend-inner-icon="mdi-rename-box"
                            ></v-text-field>
                        </v-col>
                       <v-col
                            cols="12"
                        >
                            <v-textarea
                                label="Raison"
                                placeholder="Raison"
                                auto-grow
                                outlined
                                rows="1"
                                class="area"
                                row-height="100"
                                prepend-inner-icon="mdi-rename-box"
                            ></v-textarea>
                        </v-col>
                        <v-col
                            cols="12"
                            style="margin-bottom: 10px;
                            display:flex"
                        >
                            <!-- <v-btn 
                            class="button-date"
                                outlined
                                dense
                                width="50%"
                                height="45px"
                                style="border:none;  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2); text-transform:none; font-weight:400"
                                v-on:click.native="clickStart()"
                                
                            >
                                <v-icon 
                                    color="#005075!important"
                                >
                                    mdi-calendar-blank-outline
                                </v-icon>
                                {{LabelStart}}
                            </v-btn>
                            <v-select
                            class="select-dropdown"
                                style="width:50%;"
                                 v-model="start"
                                :items="DateStart"
                                item-text="state"
                                label="Solo field"
                                dense
                                solo
                                flat
                                height="45px"
                            ></v-select> -->
                                  <v-toolbar-items>
            <v-menu
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            >
          <template v-slot:activator="{ on, attrs }">


             
            <v-text-field
              class="date mt-1"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker
            locale="ph"
            @change="datePicker()"
            :allowed-dates="allowedDates"
          ></v-date-picker>
        </v-menu>
      </v-toolbar-items>
                        </v-col>
                        <v-col
                            cols="12"
                            style="margin-bottom: 10px;
                            display:flex"
                        >
                            <v-btn 
                            class="button-date"
                                outlined
                                dense
                                width="50%"
                                height="45px"
                                style="border:none;  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2); text-transform:none; font-weight:400"
                                v-on:click.native="clickEnd()"
                            >
                                <v-icon 
                                    color="#005075!important"
                                >
                                    mdi-calendar-blank-outline
                                </v-icon>
                                {{LabelEnd}}
                            </v-btn>
                            <v-select
                                class="select-dropdown"
                                style="width:50%;"
                                 v-model="end"
                                :items="DateEnd"
                                item-text="state"
                                label="Solo field"
                                dense
                                solo
                                flat
                                height="45px"
                            ></v-select>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                           <v-select
                                class="select-dropdown"
                                style="width:100%;"
                                 v-model="select"
                                :items="items"
                                item-text="state"
                                dense
                                outlined
                                height="45px"
                            ></v-select>
                        </v-col>
                        <v-btn 
                            @click="closeDialog" 
                            height="50px" 
                            depressed 
                            color="rgb(238 238 238)"
                            width="46%" 
                            class="ma-2 btn-dialog"
                        >
                            ANNULER
                        </v-btn>
                        <v-btn
                            width="46%"
                            depressed
                            dark
                            height="50px"
                            color="#005075!important"
                            class="btn-dialog ma-2"
                        >
                            VALIDER
                        </v-btn>
                    </v-row>
                </v-container>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
import moment from 'moment'
export default {
    props:{
        dialog:{
            type:Boolean,
            required:true
        }
    },
    data() {
        return {
            start: { state: 'Toute la journée' },
            DateStart: [
                { state: 'Toute la journée' },
                { state: 'Demi-journée-Matin' },
                { state: 'Demi-journée-Après-midi' },
            ],
            end: { state: 'Toute la journée' },
            DateEnd: [
                { state: 'Toute la journée' },
                { state: 'Demi-journée-Matin' },
                { state: 'Demi-journée-Après-midi' },
            ],
            select: { state: 'Toute la journée' },
            items: [
                { state: 'Toute la journée' },
                { state: 'Demi-journée-Matin' },
                { state: 'Demi-journée-Après-midi' },
            ],
            searchInput:"",
            LabelStart:"Date de début",
            LabelEnd:"Date de fin",
            availableDates: [],
        };
    },
    methods: {
        closeDialog() {
            this.$emit('close', false);
        },
        clickStart(){
            if(this.LabelStart!="Date de début"){
                this.LabelStart="Date de début"
            }else{
                this.LabelStart="HI"
            }
        },
        clickEnd(){
            if(this.LabelEnd!="Date de fin"){
                this.LabelEnd="Date de fin"
            }else{
                this.LabelEnd="HI"
            }
        },      allowedDates(a) {
        return this.availableDates.includes(a);

      },
      
      pickerUpdate: function(val) {

        let totalDay = moment(val, "YYYY-MM").daysInMonth()
        console.log(totalDay)
        
        let availableDates = []
          
        let monthNow = moment().format('M')
        let monthSelected = moment(val).format('M')
        let day

        if(monthNow == monthSelected)
          day = moment().format('D')
        else
          day = 1
        
        for (let i = day; i <= totalDay ; i++) {
            let date = moment().date(i).format("YYYY-MM-DD")
              availableDates.push(date)
        }
        this.availableDates = availableDates;
        this.allowedDates();
      },
    },
};
</script>

<style scoped>
.v-input__prepend-inner {
    margin:auto 0;
}

    .centered-input >>> input {
      text-align: center
    }

    #input-84::-webkit-input-placeholder {
 position: absolute;
 top: 0;  bottom: 0;
  transform: translateY(30%);
}

.v-card .v-form .container .row .col .select-dropdown {
    margin:0!important;
    padding:0!important;
}

.button-start .v-btn__content {
    justify-content: flex-start!important;
}
</style>