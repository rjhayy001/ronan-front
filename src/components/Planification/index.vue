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
                    v-model="e2"
                    :items="selects"
                    menu-props="auto"
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
                  @click.stop="drawer=true"
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
      <div class="tags">
        <div class="tags-container">
          <div class="container">
            <div class="tags-color travaille"></div>
            <div class="tags-name">Travaillé</div>
          </div>
          <div class="container">
            <div class="tags-color absence"></div>
            <div class="tags-name">Absence</div>
          </div>
          <div class="container">
            <div class="tags-color conflit"></div>
            <div class="tags-name">Conflit</div>
          </div>
          <div class="container">
            <div class="tags-color vacances"></div>
            <div class="tags-name">Vacances</div>
          </div>
          <div class="container">
            <div class="tags-color rtt"></div>
            <div class="tags-name">RTT</div>
          </div>
          <div class="container">
            <div class="tags-color dimanche"></div>
            <div class="tags-name">Dimanche</div>
          </div>
          <div class="container">
            <div class="tags-color jour"></div>
            <div class="tags-name">Jour férié</div>
          </div>
        </div>
      </div>
    </v-subheader>
    <div class="table_scroll" v-if="!loading">
      <div class="css_table css_table2">
        <div class="css_th"  style="border-bottom:none!important;"></div>
        <div class="css_thead">
          <div class="css_tr">
            <div></div>
            <div v-for="date in date" :key="date.text + date.number"  class="css_th">{{date.text}}</div>
          </div>
          <div class="css_tr ">
            <div class="css_th sub_th border_table"></div>
              <div  v-for="date in date" :key="date.number" class="css_th sub_th" style="background-color:white;">
                <div v-if="$isSameDate(date.date,currentDay)" class="currentDay">
                  {{ date.number }}
                </div>
                <div v-else :class="[date.text=='Sun' ? 'sunday': '']">
                  {{ date.number }}
                </div>
              </div>
          </div>
        </div>
        <div class="css_tbody" v-for="(region, index) in regions" :key="index + region.id">
          <div class="css_tr">
            <div class="css_sd header_sd width_sd">
              {{region.name}}
            </div>
            <div class="css_td" v-for="date in date" :key="date.number">
              <div id="data" v-if="$isSameDate(date.date,currentDay)" class="currentDay">
                <p :style="date.text=='Sun' ? 'color:rgb(97 97 97)' : 'color:white'" class="date-hidden">.</p>
              </div>
              <div id="data" v-else-if="date.text=='Sun'" style="background-color:rgb(97 97 97)">
                <p :style="date.text=='Sun' ? 'color:rgb(97 97 97)' : 'color:white'" class="date-hidden">.</p>
              </div>
            </div>
          </div>
          <template v-for="(center, center_index) in region.centers">
            <div class="css_tr"  :key="'center' + center_index">
              <div class="css_sd subheader_sd width_sd">
                {{center.name}}
              </div>
              <div class="css_td" v-for="date in date" :key="date.number">
                <div id="data"  v-if="$isSameDate(date.date,currentDay)" class="currentDay">
                  <p :style="date.text=='Sun' ? 'color:rgb(97 97 97)' : 'color:white'" class="date-hidden">.</p>
                </div>
                <div id="data"  v-else-if="date.text=='Sun'" style="background-color:rgb(97 97 97)">
                  <p :style="date.text=='Sun' ? 'color:rgb(97 97 97)' : 'color:white'" class="date-hidden">.</p>
                </div>
              </div>
            </div>
            <div class="css_tr" v-for="(user, user_index) in center.users" :key="user.id+user_index+center.name+user_index+center.id">
              <div class="css_sd content_sd width_sd">
                {{user.first_name}}, {{user.last_name}}
              </div>
              <div class="css_td position-relative" v-for="date in date" :key="date.number">
                <div id="data"  v-if="date.text=='Sun'" style="background-color:rgb(97 97 97)" >
                  <p :style="date.text=='Sun' ? 'color:rgb(97 97 97)' : 'color:white'" class="date-hidden">.</p>
                </div>
                <div id="data" v-else-if="$isSameDate(date.date,currentDay)" class="currentDay position-absolute-fixed pointer" @click="addWork(user,center,date.date)">
                  <p :style="date.text=='Sun' ? 'color:rgb(97 97 97)' : 'color:white'" class="date-hidden">.</p>
                </div>
                <div v-else class="empty-day position-absolute-fixed" @click="addWork(user,center,date.date)">
                  <p :style="date.text=='Sun' ? 'color:rgb(97 97 97)' : 'color:white'" class="date-hidden">.</p>
                </div>
                <!-- for planning -->
                <template v-if="user.planning && date.text !='Sun'">
                  <template v-for="(planning, plann_index) in user.planning">
                    <div 
                      v-if="$isBetween(
                        planning.start_date, 
                        planning.end_date, 
                        date.date
                      )" 
                      :key="plann_index + 'asdplann'" 
                      :class="['work-full pointer', $checkWorkFullDate(planning, date)]"
                      :style="planning.is_conflict == 1 ? 'background:#6a1b9a !important' : ''"
                      @click="editWork(user, center, planning)"
                    >
                      <p class="date-hidden" >.</p>
                    </div>
                  </template>
                </template>
                <!-- for employee holidays -->
                <template v-if="user.holidays && date.text !='Sun'">
                  <template v-for="(holiday, holi_index) in user.holidays">
                    <div 
                      @click="editHoliday(holiday, user)"
                      v-if="$isBetween(
                        holiday.start_date, 
                        holiday.end_date, 
                        date.date
                      ) && holiday.status == 1" 
                      :key="holi_index + 'holiasd'" 
                      :class="['holiday-full pointer',$checkHolidayFullDate(holiday, date) ]"
                    >
                      <p class="date-hidden" >.</p>
                    </div>
                  </template>
                </template>
                <!-- for rtts -->
                <template v-if="user.rtts && date.text !='Sun'">
                  <template v-for="(rtt, rtt_index) in user.rtts">
                    <div 
                      @click="editRtt(rtt, user)"
                      v-if="$isSameDate(date.date, rtt.date)&& rtt.status == 1" 
                      :key="rtt_index + 'rttasd'" 
                      :class="['rtt-full','pointer']"
                    >
                      <p class="date-hidden" >.</p>
                    </div>
                  </template>
                </template>
                <!-- for national holidays -->
                <template v-for="(nat_holiday, nat_index) in national_holidays">
                    <div 
                      v-if="$isSameDate(
                        nat_holiday.date,
                        date.date
                      )" 
                      :key="nat_index + 'nat_holiday'" 
                      :class="['nat-holiday','pointer']"
                    >
                      <p class="date-hidden" >.</p>
                    </div>
                  </template>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <table-loader v-else></table-loader>
    <!-- filter -->
    <filter-planning 
      @filter="filter"
      :drawer="drawer" 
      @close="drawer = false"
    />
    <!-- plan or work -->
    <create-plan 
      v-if="dialog2" 
      :dialog="dialog2" 
      @close="closeDialog"
      :data="create_data"
    />
    <edit-plan
      v-if="edit_plan_dialog"
      :dialog="edit_plan_dialog"
      @close="edit_plan_dialog=false"
      :data="edit_data"
    />
    <!-- rtt -->
    <edit-rtt
      v-if="edit_rtt_dialog"
      :dialog="edit_rtt_dialog"
      @close="edit_rtt_dialog=false"
      :data="edit_rtt_data"
    />
    <!-- holiday -->
    <edit-holiday
      v-if="edit_holiday_dialog"
      :dialog="edit_holiday_dialog"
      @close="edit_holiday_dialog=false"
      :data="edit_holiday_data"
    />
    <menu-button v-if="menu" @success="forceReload"/>
  </div>
</template>
<script>
import { GetAllHolidays } from "@/repositories/holidays.api"
import filterPlanning from './includes/filter.vue';
import menuButton from './includes/menu.vue';
import createPlan from './create.vue';
import editPlan from './edit.vue';
import editRtt from './includes/rtt/editRtt.vue'
import editHoliday from './includes/holiday/editHoliday.vue'
  import moment from 'moment' 
  import { GetAllRegions } from "@/repositories/region.api"
  export default {
    components:{
      filterPlanning,
      createPlan,
      menuButton,
      editPlan,
      editRtt,
      editHoliday
    },
      data() {
        return {
          e2:'Jours',
          edit_holiday_dialog: false,
          edit_holiday_data:{},
          edit_rtt_dialog: false,
          edit_rtt_data:{},
          edit_plan_dialog:false,
          edit_data: {},
          create_data:{
            date:'',
            employee:{},
            center:{}
          },
          currentDay: moment().format('YYYY-MM-DD'),
          month: moment().format('MMM YYYY'),
          drawer: false,
          dialog2: false,
          dialog3: false,
          menu: true,
          monthIndex : this.month - 1,
          year: moment(this.month).format('YYYY'),
          monthly: moment(this.month).format('MMM'),
          month_digit:moment(this.month).format('MM'),
          date:[],
          info:[],
          datas: [
            { title: 'Home', icon: 'mdi-view-dashboard' },
            { title: 'About', icon: 'mdi-forum' },
          ],
          items: [
            { title: 'Jours' },
            { title: 'Semaine' },
            { title: 'Mois' },
          ],
          regions:[],
          loading: false,
          selects: [
            'Jours', 'Semaine', 'Mois' 
          ],
          national_holidays: []
      };
    },
    mounted() {
      this.initialize()

    },
    methods: {
      initialize(){
        this.getMonthyear();
        this.getmonthly();
        this.getNationalHoliday()
        this.getData()
      },
      forceReload(){
        GetAllRegions().then(({data}) => {
          this.regions = data
        })
      },
      getNationalHoliday(){
        GetAllHolidays().then(({data}) =>{
          this.national_holidays = data
          console.log(data,"holidays")
        })
      },
      getData(){
        this.loading = true
        GetAllRegions().then(({data}) => {
          this.regions = data
          this.loading = false
        })
      },
      getMonthyear(){
        this.month;
        this.year;
        this.monthIndex;
      },
      increment() {
        let updateIncrement = moment(this.month).add(1, 'M').format('MMM YYYY');
        this.month = updateIncrement;
        this.year=moment(this.month).format('YYYY');
        this.monthly= moment(this.month).format('MMM');
        this.month_digit =  moment(this.month).format('MM')
        this.getmonthly()
      },
      decrement() {
        let updateIncrement = moment(this.month).subtract(1, 'M').format('MMM YYYY');
        this.month = updateIncrement;
        this.year=moment(this.month).format('YYYY');
        this.monthly= moment(this.month).format('MMM');
        this.month_digit =  moment(this.month).format('MM')
        this.getmonthly()
      },
      getmonthly() { 
        var monthDate = moment(moment(this.year+'-'+this.month_digit), 'YYYY-MM'); 
        var daysInMonth = monthDate.daysInMonth() ; 
        var arrDays = []; 
        while(daysInMonth) {  
          var current = moment(this.month).date(daysInMonth); 
          arrDays.push({
            number: current.format('DD'),
            text: current.format('ddd'),
            date: current.format('YYYY-MM-DD')
          }); 
          daysInMonth--; 
        } 
        this.date = arrDays.reverse();
      },
      editWork(employee, center, planning) {
        console.log(employee, center, planning)
        this.edit_data = {
          employee: employee,
          center: center,
          planning: planning
        }
        this.$nextTick(function () {
          this.edit_plan_dialog = true
        })
      },
      addWork(employee, center, date){
        this.create_data = {
          center:center,
          employee:employee,
          date:date
        }
        this.$nextTick(function () {
          this.dialog2 = true
        })
      },
      editRtt(rtt, employee){
        this.edit_rtt_data = {
          rtt:rtt,
          employee:employee
        }
        this.$nextTick(function () {
          this.edit_rtt_dialog = true
        })
      },
      editHoliday(holiday, employee){
        this.edit_holiday_data = {
          holiday:holiday,
          employee:employee
        }
        this.$nextTick(function () {
          this.edit_holiday_dialog = true
        })
      },
      closeDialog(){
        this.dialog2 = false
      },
      showPendingApplication(){
        this.dialog3=true
      },
      filter(filters){
        if(filters.length){
          let storage =[]
          GetAllRegions().then(({data}) => {
            data.forEach(dat => {
              filters.forEach(filter => {
                if(filter === dat.id){
                  storage.push(dat)
                }
              })
            })
            console.log(storage, 'storage')
            this.regions = storage
          })
        }
        else{
          this.forceReload()
          console.log('else')
        }
      }
    },
  };
   
</script>

<style scoped>
#data2{
  background-color: red;
}
</style>
