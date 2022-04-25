<template>
  <div>
    <v-subheader class="subheader" style="border-bottom:1px solid gray; z-index:2;">
      <div class="sub-container">
        <div class="date-container">
          <v-btn
            class="arrow-btn"
            icon
            @click="decrement()" 
          >
            <v-icon 
              small
              color="gray"
            >mdi-less-than</v-icon>
          </v-btn>
          <div solo class="date-field" readonly min="0.00">
            <p style="text-transform: uppercase; width:100px">{{month}}</p>
          </div>
          <v-btn
            class="arrow-btn"
            icon
            @click="increment()"
          >
            <v-icon 
              small
              color="gray"
            >mdi-greater-than</v-icon>
          </v-btn>
        </div>
        <div class="field">
          <div class="sub-field">
            <div>
              <v-row>
                  <v-select
                    class="select-data"
                    v-model="selected"
                    :items="selects"
                    item-text="title"
                    item-value="value"
                    menu-props="auto"
                    @change="initialize()"
                    hide-details="true"
                    solo
                    flat
                    height="47px"
                  ></v-select>
              </v-row>
            </div>
            <div>
              <v-row>
                <v-btn
                  class="sub-filter_btn"
                  elevation="0"
                  width="200px"
                  height="47px"
                  @click="drawer =true"
                >
                  <v-icon 
                    class="filter-icon"
                    small
                    color="gray"
                  >mdi-filter-outline</v-icon>
                  Filters
                </v-btn>
              </v-row>
            </div>
          </div>
        </div>
      </div>
      <tags-planning/>
    </v-subheader>
    <daily></daily>
  </div>
</template>
<script>
import Daily from '@/components/v2/planning/view/daily.vue'
import tagsPlanning from '@/components/Planification/includes/tags/tags.vue';
import moment from 'moment'
  export default {
    components:{
        tagsPlanning,
        Daily
    },
    data() {
      return {
        emp_view:false,
        sort_dialog: false,
        sort_data:{},
        currentReqweek: moment(),
        currentReqyear: moment(),
        drawer: false,
        menu: true,
        monthIndex : this.month - 1,
        month: moment().format('MMM YYYY'),
        year: moment(this.month).format('YYYY'),
        updateReload: false,
        date:[],
        loading: false,
        selects: [
          {value:1, title: 'Jours' },
          {value:2, title: 'Semaine' },
          {value:3, title: 'Mois' },
        ],
        selected:1,
        filter:[],
        employee_view:false,
        currentmonthyear:'',
      };
    },
    mounted() {
      this.initialize()
    },
    methods:{
        initialize(){
            this.getMonthyear();
        },
        getMonthyear(){
          this.month= moment().format('MMM YYYY');
          this.year;
          this.monthIndex;
      }
    }
  }
</script>
