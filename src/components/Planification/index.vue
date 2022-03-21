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
    <!-- center view -->
    <template v-if="!emp_view">
      <div v-if="selected==1">
        <planning-jours
          :selected="selected"
          :reqDaily="month"
          :success="updateReload"
          @test="updateReload= false"
          :filter="filter"
        />
      </div>
      <div style="margin: 40px 0 0 0"  v-else-if="selected==2">
        <planning-semaine
          :selected="selected"
          :reqWeek="currentReqweek"
          :success="updateReload"
          @test="updateReload= false"
          :filter="filter"
          @currentmonthyear="monthyear"
        />
      </div>
      <div style="margin: 40px 0 0 0" v-else>
        <planning-mois
          :selected="selected"
          :reqYear="currentReqyear"
          :success="updateReload"
          @test="updateReload= false"
          :filter="filter"
          @currentmonthyear="monthyear"
        />
      </div>
    </template>
     <!-- employee view -->
      <template v-else>
        <employee-view @openFilter="drawer = true"/>
      </template>
    <menu-button v-if="menu" @success="reloadTable()"/>
    <filter-planning 
      @filter="filter=$event"
      @changeView="test"
      :drawer="drawer" 
      @close="drawer=false"
    />
  </div>
</template>
<script>
import planningJours from './includes/jours/jours.vue';
import employeeView from './employee_view/index.vue'
import planningSemaine from './includes/semaine/semaine.vue';
import planningMois from './includes/mois/mois.vue';
import filterPlanning from './includes/filter.vue';
import moment from 'moment' 
import menuButton from './includes/menu.vue';
import tagsPlanning from './includes/tags/tags.vue';
  export default {
    components:{
      tagsPlanning,
      planningJours,
      planningSemaine,
      planningMois,
      menuButton,
      filterPlanning,
      employeeView
    },
    data() {
      return {
        emp_view:false,
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
    methods: {
      initialize(){
        this.getMonthyear();
      },
      getMonthyear(){
        if(this.selected==3){
          this.month=moment().format('YYYY');
        }else{
          this.month;
          this.year;
          this.monthIndex;
        }
      },
      increment() {
        if(this.selected==1) {
          let updateCurrentMonth = moment(this.month).add(1, 'M').format('MMM YYYY');
          this.month = updateCurrentMonth;
        }else if(this.selected==2){
          let updateCurrentweek = moment(this.currentReqweek).add(1, 'weeks').startOf('isoWeek')
          this.currentReqweek = updateCurrentweek;
        }else{
          let updateCurrentMonth = moment(this.currentReqyear).add(1, 'Y');
          this.currentReqyear = updateCurrentMonth;
          this.month=moment(this.currentReqyear).format('YYYY')
        }
      },
      decrement() {
        if(this.selected==1) {
          let updateCurrentMonth = moment(this.month).subtract(1, 'M').format('MMM YYYY');
          this.month = updateCurrentMonth;
        }else if(this.selected==2) {
          let updateCurrentweek = moment(this.currentReqweek).subtract(1, 'weeks').startOf('isoWeek')
          this.currentReqweek = updateCurrentweek;
        }else {
          let updateCurrentMonth = moment(this.currentReqyear).subtract(1, 'Y');
          this.currentReqyear = updateCurrentMonth;
          this.month=moment(this.currentReqyear).format('YYYY')
        }
      },
      test(view){
        this.emp_view = view
      },
      reloadTable() {
        this.updateReload = true
      },
      monthyear(value) {
       this.month= moment(value).format('MMM YYYY')
      }
    },
    watch: {
      'changeView' : {
        handler(val) {
          console.log(val, "changeView")
        }
      },
      'drawer' : {
        handler(val) {
          console.log(val, "drawerIndex")
        }
      },
      'currentmonthyear' : {
        handler(val) {
          console.log(val, "currentmonthyear")
        }
      },
    }
  };
</script>
