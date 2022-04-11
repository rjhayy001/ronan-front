<template>
  <div>
    <div>
      <template v-if="!employee_view">
        <div class="table_scroll" v-if="!loading">
          <div class="css_table css_table2">
            <div class="css_th"  style="border-bottom:none!important;"></div>
            <div class="css_thead">
              <div class="css_tr">
                <div style="position:relative; width: 100%;">
                  <div style="width: 80%; position:absolute; left:10px; z-index:4; top: -10px">
                    <v-autocomplete
                      deletable-chips
                      class="user-option"
                      :items="users"
                      placeholder="Search Employee ..."
                      dense
                      solo
                      hide-details="auto"
                      prepend-inner-icon="mdi-plus"
                      :item-text="getItemText"
                      item-value="id"
                      v-model="search"
                    ></v-autocomplete>
                  </div>
                  <div style="width: 20%;position:absolute; right:-6px; z-index:4; top: -3px">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon 
                          @click="toggleNoWorkEmployees"
                          v-on="on"
                        >
                          mdi-filter-outline
                        </v-icon>
                      </template>
                      <span>toggle no work employes</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon
                          @click="initialize()"
                          v-on="on"
                        >mdi-refresh</v-icon>
                      </template>
                      <span>refresh</span>
                    </v-tooltip>
                    <!-- <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon 
                          v-on="on"
                        >
                          <v-icon>mdi-refresh</v-icon>
                        </v-icon>
                      </template>
                      <span>toggle no work employes</span>
                    </v-tooltip> -->
                  </div>
                </div>
                <div v-for="date in date" :key="date.text + date.number"  class="css_th">{{date.text}}</div>
              </div>
              <div class="css_tr ">
                <div class="css_th sub_th border_table"></div>
                <div  v-for="date in date" :key="date.number" class="css_th sub_th" style="background-color:white;">
                  <div v-if="$isSameDate(date.date,currentDay)" class="currentDay">
                    {{ date.number }}
                  </div>
                  <div v-else-if="$isHoliday(date.date)" class="holiday">
                    {{ date.number }}
                  </div>
                  <div v-else :class="[date.text=='Dim' ? 'sunday': '']">
                    {{ date.number }}
                  </div>
                </div>
              </div>
            </div>
            <div class="css_tbody" v-for="(region, index) in regions" :key="index + region.id">
              <div class="css_tr">
                <div class="css_sd header_sd width_sd">
                  {{region.name}}
                  <span class="float-right mr-1">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon 
                          dark
                          small
                          v-bind="attrs"
                          v-on="on"
                          @click="$openSort(region)"
                        >
                          mdi-sort
                        </v-icon>
                      </template>
                      <span>Sort {{region.name}} Centers</span>
                    </v-tooltip>
                  </span>
                </div>
                <div class="css_td" v-for="date in date" :key="date.number">
                  <div id="data" v-if="$isSameDate(date.date,currentDay)" class="currentDay">
                    <p :style="date.text=='Dim' ? 'color:rgb(97 97 97)' : 'color:white'" class="date-hidden position-absolute-fixed ">.</p>
                  </div>
                  <div v-else-if="$isHoliday(date.date)" class="holiday">
                    <p class="date-hidden">.</p>
                  </div>
                  <div id="data" v-else-if="date.text=='Dim'" style="background-color:rgb(97 97 97)" class="position-absolute-fixed">
                    <p :style="date.text=='Dim' ? 'color:rgb(97 97 97)' : 'color:white'" class="date-hidden ">.</p>
                  </div>
                </div>
              </div>

              <!-- <draggable v-model="region.centers" group="centers" @start="drag=true" @end="drag=false"> -->
              <template v-for="(center, center_index) in region.centers">
                <template >
                  <div class="css_tr"  :key="'center' + center_index">
                    <div class="css_sd subheader_sd width_sd">
                      {{center.name}}
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-icon 
                            style="position:absolute; right: 10px; top: 50%; bottom: 50%" 
                            dark 
                            v-on="on"
                            small 
                            @click="test(center)"
                          >
                            {{$isOnArray(center, center_storage) ? 'mdi-filter-off' : 'mdi-filter'}}
                          </v-icon>
                        </template>
                        <span>
                          {{$isOnArray(center, center_storage) ? 'show no work employee' : 'hide no work employee'}}
                        </span>
                      </v-tooltip>
                    </div>
                    <div class="css_td" v-for="date in date" :key="date.number+'cs'">
                      <div id="data"  v-if="$isSameDate(date.date,currentDay)" class="currentDay">
                        <p :style="date.text=='Dim' ? 'color:rgb(97 97 97)' : 'color:white'" class="date-hidden">.</p>
                      </div>
                      <div v-else-if="$isHoliday(date.date)" class="holiday">
                        <p class="date-hidden">.</p>
                      </div>
                      <div id="data"  v-else-if="date.text=='Dim'" style="background-color:rgb(97 97 97); " class="position-absolute-fixed">
                        <p :style="date.text=='Dim' ? 'color:rgb(97 97 97)' : 'color:white'" class="date-hidden">.</p>
                      </div>
                    </div>
                  </div>
                  <div class="css_tr" v-for="(user, user_index) in center.users" :key="user.id+user_index+center.name+user_index+center.id+'test'">
                    <div class="css_sd content_sd width_sd">
                      {{user.first_name}}, {{user.last_name}} 
                      <v-badge 
                        v-if="workCountChecker(user.work_count) > 0"
                        :content="workCountChecker(user.work_count)" color="orange" tile
                        style="position:absolute; right: 30px; top: 65%;"
                      ></v-badge>
                    </div>
                    <div class="css_td position-relative" v-for="date in date" :key="date.number">
                      <div id="data"  v-if="date.text=='Dim'" style="background-color:rgb(97 97 97)" class="position-absolute-fixed" >
                        <p :style="date.text=='Dim' ? 'color:rgb(97 97 97)' : 'color:white'" class="date-hidden">.</p>
                      </div>
                      <div id="data" v-else-if="$isSameDate(date.date,currentDay)" class="currentDay position-absolute-fixed pointer" @click="addWork(user,center,date.date)">
                        <p :style="date.text=='Dim' ? 'color:rgb(97 97 97)' : 'color:white'" class="date-hidden">.</p>
                      </div>
                      <div v-else class="empty-day position-absolute-fixed" @click="addWork(user,center,date.date)" @contextmenu.prevent="testing($event,date,user,center)">
                        <p :style="date.text=='Dim' ? 'color:rgb(97 97 97)' : 'color:white'" class="date-hidden">.</p>
                      </div>
                      <!-- for planning -->
                      <template v-if="user.planning && date.text !='Dim'">
                        <template v-for="(planning, plann_index) in user.planning">
                          <div 
                            v-if="$isBetween(
                              planning.start_date, 
                              planning.end_date, 
                              date.date
                            )" 
                            @contextmenu.prevent="workHandler(planning)"
                            :key="plann_index + 'asdplann'" 
                            :class="['work-full','pointer', $checkWorkFullDate(planning, date), $isOnArray(planning, to_delete) ?  'border-selected' : '']"
                            @click="editWork(user, center, planning)"
                          >
                            <p class="date-hidden" >.</p>
                          </div>
                        </template>
                      </template>
                      <!-- for employee holidays -->
                      <template v-if="user.holidays && date.text !='Dim'">
                        <template v-for="(holiday, holi_index) in user.holidays">
                          <div 
                            @click="editHoliday(holiday, user)"
                              v-if="$isBetween(
                              holiday.start_date, 
                              holiday.end_date, 
                              date.date
                            ) && holiday.status == 1" 
                            :key="holi_index + 'holiasd'" 
                            :class="['holiday-full pointer position-absolute-fixed',$checkHolidayFullDate(holiday, date) ]"
                          >
                            <p class="date-hidden" >.</p>
                          </div>
                        </template>
                      </template>
                      <!-- for rtts -->
                      <template v-if="user.rtts && date.text !='Dim'">
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
                      <!-- absents -->
                      <template v-if="user.absents && date.text !='Dim'">
                        <template v-for="(absent, absent_index) in user.absents">
                          <div 
                            v-if="$isSameDate(
                              absent.date,
                              date.date
                            )" 
                            @click="absentClick(absent, user)"
                            :key="absent_index + 'nat_holiday'" 
                            :class="['nat-holiday','pointer']"
                            style="background-color:red !important;"
                          >
                            <p class="date-hidden" >.</p>
                          </div>
                        </template>
                      </template>
                    </div>
                  </div>
                </template>
              </template>
              <!-- </draggable> -->
            </div>
          </div>
        </div>
        <table-loader v-else></table-loader>
      </template>
      <!-- employee view -->
      <template v-else>
        <employee-view @openFilter="drawer = true"/>
      </template>
    </div>
    <div v-if="to_delete.length > 0">
      <v-tooltip left >
        <template v-slot:activator="{ on, attrs }">
          <v-btn 
            class="d-button" 
            fab 
            color="red" 
            dark 
            v-bind="attrs"
            v-on="on"
            @click="multipleDelete"
          >
            <v-icon >mdi-delete-outline</v-icon>
          </v-btn>
        </template>
        <span>{{to_delete.length}} selected</span>
      </v-tooltip>
    </div>
    <!-- plan or work -->
    <create-plan 
      v-if="add_plan_dialog" 
      :dialog="add_plan_dialog" 
      @close="add_plan_dialog = false"
      @success="forceReload"
      :data="create_data"
    />
    <!-- edit plan or work -->
    <edit-plan
      v-if="edit_plan_dialog"
      :dialog="edit_plan_dialog"
      @close="edit_plan_dialog=false && forceReload"
      @success="forceReload"
      :data="edit_data"
    />
    <!-- rtt -->
    <edit-rtt
      v-if="edit_rtt_dialog"
      :dialog="edit_rtt_dialog"
      @close="edit_rtt_dialog=false"
      @success="forceReload"
      :data="edit_rtt_data"
    />
    <!-- holiday -->
    <edit-holiday
      v-if="edit_holiday_dialog"
      :dialog="edit_holiday_dialog"
      @close="edit_holiday_dialog=false"
      @success="forceReload"
      :data="edit_holiday_data"
    />
    <!-- test menu -->
    <v-menu v-model="right_menu.showMenu" :position-x="right_menu.x" :position-y="right_menu.y" absolute offset-y>
      <v-list dense>
        <v-list-item  @click="clickItem(item.value)" dense v-for="(item, index) in options" :key="index+'test'">
          <v-list-item-title v-model="option_selects">{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <!-- addAbsence -->
    <add-absence
      v-if="option_selects == 1"
      :dialog="absence_dialog"
      @close="absence_dialog=false"
      @success="forceReload"
      :data="right_menu"
    />
    <!-- addRTT -->
    <add-rtt
      v-if="option_selects == 2"
      :dialog="rtt_dialog"
      @close="rtt_dialog=false"
      @success="forceReload"
      :data="right_menu"
    />
    <!-- addHoliday -->
    <add-holiday
      v-if="option_selects == 3"
      :dialog="holiday_dialog"
      @close="holiday_dialog=false"
      @success="forceReload"
      :data="right_menu"
    />
    <delete-absence
      v-if="delete_absent_dialog"
      :dialog="delete_absent_dialog"
      :data="absent_data"
      @close="delete_absent_dialog=false"
    />
  </div>
</template>
<script>
// import draggable from 'vuedraggable'
import moment from 'moment' 
import { GetAllRegions, SearchRegions } from "@/repositories/region.api"
import { GetAllHolidays } from "@/repositories/holidays.api"
import { GetAllEmployeesHasCenter } from "@/repositories/employee.api"
// import filterPlanning from '../filter.vue';
import addHoliday from "../holiday/addHoliday.vue"
import editHoliday from '../holiday/editHoliday.vue'
import addRtt from "../rtt/addRtt.vue"
import editRtt from '../rtt/editRtt.vue'
import createPlan from '../../create.vue';
import editPlan from '../../edit.vue';
import employeeView from '../../employee_view/index.vue'
import addAbsence from "../absence/addAbsence.vue"
import { Delete } from "@/repositories/planning.api";
import deleteAbsence from "../absence/deleteAbsence.vue"
export default {
  components:{
    // filterPlanning,
    addHoliday,
    editHoliday,
    addRtt,
    editRtt,
    createPlan,
    editPlan,
    employeeView,
    addAbsence,
    deleteAbsence,
    // draggable
  },
  props: {
    selected: {
      type: Number,
      required: true,
    },
    reqDaily: {
      type: String,
      required: true
    },
    success: {
      type: Boolean,
    },
    filter: {
      type: Array,
    },
  },
  data() {
    return {
      absence_dialog:false,
      rtt_dialog: false,
      holiday_dialog: false,
      right_menu:{
        showMenu:false,
        x:0,
        y:0,
        date:'',
        user:{},
        center:{}
      },
      employee_view:false,
      edit_holiday_dialog: false,
      edit_holiday_data:{},
      edit_rtt_dialog: false,
      edit_rtt_data:{},
      delete_absent_dialog: false,
      absent_data:{},
      edit_plan_dialog:false,
      edit_data: {},
      add_plan_dialog: false,
      create_data:{
        date:'',
        employee:{},
        center:{}
      },
      currentDay: moment().format('YYYY-MM-DD'),
      drawer: false,
      option_selects: '',
      options: [
        { value:1, title: 'Absence' },
        { value:2, title: 'Rtt' },
        { value:3, title: 'Vacances' },
      ],
      regions:[],
      loading: false,
      center_storage:[],
      date:[],
      national_holidays: [],
      menu: true,
      monthIndex : this.month - 1,
      month: moment().format('MMM DD YYYY'),
      year: moment(this.month).format('YYYY'),
      month_digit:moment(this.month).format('MM'),
      to_delete:[],
      search:'',
      users:[],
    };
  },
  created() {
    this.initialize()
  },
  methods: {
    multipleDelete(){
      let message = `AVoulez vous vraiment supprimer la sélection ?`
        this.$root
          .$confirm(message,'#ff5252')
          .then(result => {
              if(result){
                this.to_delete.forEach(del => {
                  Delete(del.id).then(() =>{
                    
                  })
                  .finally(() => {
                    this.to_delete = []
                    this.forceReload()
                  })
                })
                this.$toast.success('success')
              }
          })
    },
    workCountChecker(works = []){
      let ret = 0
      if(works.length){
        works.forEach(work => {
          let work_data = moment(work.month+ '-01-'+work.year).format('MMM DD YYYY')
          if(moment(work_data).isSame(moment(this.month), 'month')){
            ret = work.data
          }
        })
      }
      return ret
    },
    workHandler(planning){
      if(this.$isOnArray(planning, this.to_delete)){
        this.$arraysplicer(planning, this.to_delete)
        return
      }
      this.$arrayupdater(planning, this.to_delete)
    },
    testing(e,date, user, center) {
      if(!this.$canAccess()) {
        return
      }
      this.right_menu.showMenu = false;
      this.right_menu.x = e.clientX;
      this.right_menu.y = e.clientY;
      this.right_menu.date = date.date
      this.right_menu.user = user
      this.right_menu.center = center
      this.$nextTick(() => {
        this.right_menu.showMenu = true;
      });
    },
    clickItem(item){
      this.option_selects = item
      if(this.option_selects==1) {
        this.absence_dialog=true
        this.forceReload()
      }
      else if(this.option_selects==2) {
        this.rtt_dialog=true
        this.forceReload()
      }
      else if(this.option_selects==3) {
        this.holiday_dialog=true
        this.forceReload()
      }else{
        alert("error")
      }
    },
    initialize() {
      this.getmonthly();
      // this.getData()
      this.getNationalHoliday()
      this.getAllUsers()
      this.getDataSearch()
    },
    getAllUsers() {
      GetAllEmployeesHasCenter().then(({data})=>{
        this.users = data
        console.log(this.users,"users")
      })
    },
    getItemText(item) {
      return `${item.first_name} ${item.last_name}`;
    },
    toggleNoWorkEmployees() {
      this.regions.forEach(region => {
        region.centers.forEach(center =>
          this.test(center)
        )
      })
    },
    test(center) {
      let curr_center = this.center_storage.find(store => store.id === center.id);
      if(curr_center != undefined) {
        center.users = curr_center.users
        this.$arraysplicer(curr_center  , this.center_storage)
        return
      }
      this.center_storage.push(JSON.parse(JSON.stringify(center)))
      let start = moment(this.month).startOf('month').format("YYYY-MM-DD")
      let end = moment(this.month).endOf('month').format("YYYY-MM-DD")
      let data = []
      center.users.forEach(user => {
        user.planning.forEach(plan => {
          if(this.$isBetween(start,end,plan.start_date)) {
            if(!data.some( u => u.id === user.id)) {
              data.push(user);
            }
          }
        })
      })
      center.users = data

      console.log(center, 'test')
    },
    changeView2(view) {
      this.employee_view = view
      this.$emit('close')
    },
    forceReload(){
      if(!this.search=='' || !this.search==null){
          SearchRegions(this.search).then(({data}) => {
            this.regions = data
          })
          return 
      }
      GetAllRegions().then(({data}) => {
        this.regions = data
      })
    },
    getNationalHoliday() {
      GetAllHolidays().then(({data}) =>{
        this.national_holidays = data
      })
    },
    getData() {
      this.loading = true
      GetAllRegions().then(({data}) => {
        this.regions = data
        console.log(data, 'test')
        this.loading = false
      })
    },
    getDataSearch() {
      if(!this.search=='' || !this.search==null){
        this.loading = true
        SearchRegions(this.search).then(({data}) => {
          this.regions = data
          this.loading = false 
          this.center_storage = []
        })
      }else{
        this.getData()
      }
    },
    getmonthly() { 
      var monthDate = moment(moment(this.year+'-'+this.month_digit), 'YYYY-MM'); 
      var daysInMonth = monthDate.daysInMonth(); 
      var arrDays = []; 
      while(daysInMonth) {  
        var current = moment(this.month).date(daysInMonth); 
        arrDays.push({
          number: current.format('DD'),
          text: current.format('ddd'),
          date: current.format('YYYY-MM-DD'),
        }); 
        daysInMonth--; 
      } 
      this.date = arrDays.reverse();
    },
    editWork(employee, center, planning) {
      this.edit_data = {
        employee: employee,
        center: center,
        planning: planning
      }
      this.$nextTick(function () {
        this.edit_plan_dialog = true
      })
    },
    addWork(employee, center, date) {
      this.create_data = {
        center:center,
        employee:employee,
        date:date
      }
      this.$nextTick(function () {
        this.add_plan_dialog = true
      })
    },
    editRtt(rtt, employee) {
      this.edit_rtt_data = {
        rtt:rtt,
        employee:employee
      }
      this.$nextTick(function () {
        this.edit_rtt_dialog = true
      })
    },
    absentClick(absent, employee) {
      this.absent_data = {
        absent:absent,
        employee:employee
      }
      this.$nextTick(function () {
        this.delete_absent_dialog = true
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
    $isHoliday(date){
      let flag = false
      this.national_holidays.forEach(hol => {
        if(this.$isSameDate(hol.date,date)) {
          flag = true
        }
      })
      return flag
    },
    $isAbsence(date) {
      let flag = false
      this.absences.forEach(absen => {
        if(this.$isSameDate(absen.date,date)) {
          flag = true
        }
      })
      return flag
    },
    filter2(filters) {
      if(filters.length) {
        this.loading = true
        let storage =[]
        GetAllRegions().then(({data}) => {
          data.forEach(dat => {
            filters.forEach(filter => {
              if(filter === dat.id) {
                storage.push(dat)
              }
            })
          })
          this.loading = false
          this.regions = storage
        })
      }
      else{
        this.initialize()
      }
    }
  },
  watch:{
    "reqDaily": {
      handler(val) {
        this.year =moment(val).format('YYYY')
        this.month_digit =moment(val).format('MM')
        this.month =moment(val).format('MMM YYYY')
        this.getmonthly()
      },
      deep: true,
    },
    'success': function(value) {
      if(value) {
        this.forceReload()
        this.$emit('test')
      }
    },
    "filter": {
      handler(val) {
        this.filter2(val)
      }
    },
    '$store.getters.newDataIndex'(newVal) {
      if(newVal) {
        console.log(newVal,"JoursStore")
        this.$store.commit('UPDATE_NEW',false)
        this.forceReload()
      }
    },
    'search' : {
      handler(val) {
        console.log(val)
        this.initialize ()
      }
    }
  }
};
</script>