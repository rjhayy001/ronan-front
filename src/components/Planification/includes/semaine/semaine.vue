<template>
    <div>
        <div>
            <template v-if="!employee_view">
                <div class="table_scroll" v-if="!loading">
                <div class="css_table css_table2">
                    <div class="css_th"  style="border-bottom:none!important;"></div>
                    <div class="css_thead">
                        <div class="css_tr">
                            <div style="position:relative">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-icon 
                                            style="position:absolute; right:10px; z-index:4; top: -6px"
                                            @click="toggleNoWorkEmployees"
                                            v-on="on"
                                        >
                                            mdi-filter
                                        </v-icon>
                                    </template>
                                    <span>toggle no work employes</span>
                                </v-tooltip>
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
                            <template v-for="(center, center_index) in region.centers">
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
                                    <div class="css_td" v-for="date in date" :key="date.number">
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
                                <div class="css_tr" v-for="(user, user_index) in center.users" :key="user.id+user_index+center.name+user_index+center.id">
                                    <div class="css_sd content_sd width_sd">
                                    {{user.first_name}}, {{user.last_name}}
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
                        </div>
                    </div>
                </div>
                <table-loader v-else></table-loader>
            </template>
            <template v-else>
                <employee-view @openFilter="drawer = true"/>
            </template>
        </div>
        <v-menu v-model="right_menu.showMenu" :position-x="right_menu.x" :position-y="right_menu.y" absolute offset-y>
            <v-list dense>
                <v-list-item  @click="clickItem(item.value)" dense v-for="(item, index) in options" :key="index+'test'">
                <v-list-item-title v-model="option_selects">{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <add-absence
            v-if="option_selects == 1"
            :dialog="absence_dialog"
            @success="forceReload"
            :data="right_menu"
            @close="absence_dialog=false"
        />
        <add-rtt
            v-if="option_selects == 2"
            :dialog="rtt_dialog"
            :data="right_menu"
            @close="rtt_dialog=false"
            @success="forceReload"
        />
        <add-holiday
            v-if="option_selects == 3"
            :dialog="holiday_dialog"
            :data="right_menu"
            @close="holiday_dialog=false"
            @success="forceReload"
        />
        <edit-holiday
            v-if="edit_holiday_dialog"
            :dialog="edit_holiday_dialog"
            @close="edit_holiday_dialog=false"
            :data="edit_holiday_data"
            @success="forceReload"
        />
        <edit-rtt
            v-if="edit_rtt_dialog"
            :dialog="edit_rtt_dialog"
            @close="edit_rtt_dialog=false"
            @success="forceReload"
            :data="edit_rtt_data"
        />
        <create-plan 
            v-if="dialog2" 
            :dialog="dialog2" 
            @close="closeDialog"
            @success="forceReload"
            :data="create_data"
        />
        <edit-plan
            v-if="edit_plan_dialog"
            :dialog="edit_plan_dialog"
            @success="forceReload"
            @close="edit_plan_dialog=false"
            :data="edit_data"
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
import moment from 'moment'
import { GetAllRegions } from "@/repositories/region.api"
import { GetAllHolidays } from "@/repositories/holidays.api"
// import filterPlanning from '../filter.vue';
import addHoliday from '../holiday/addHoliday.vue'
import editHoliday from '../holiday/editHoliday.vue'
import addRtt from "../rtt/addRtt.vue"
import createPlan from '../../create.vue';
import editRtt from '../rtt/editRtt.vue'
import employeeView from '../../employee_view/index.vue'
import editPlan from '../../edit.vue';
import addAbsence from "../absence/addAbsence.vue"
import deleteAbsence from "../absence/deleteAbsence.vue"
export default {
    components:{
        // filterPlanning,
        addHoliday,
        addRtt,
        editHoliday,
        createPlan,
        editPlan,
        editRtt,
        addAbsence,
        employeeView,
        deleteAbsence
    },
    props: {
        selected: {
            type: Number,
            required: true,
        },
        reqWeek: {
            type: Object,
            required: true,
        },
        filter: {
            type: Array,
        },
        employee_view2: {
            type: [Boolean, Object]
        },
        success: {
            type: Boolean,
        },
  },
    data() {
        return {
            date:[],
            regions:[],
            center_storage:[],
            loading: false,
            currentWeek: moment(),
            currentDay: moment().format('YYYY-MM-DD'),
            month: moment().format('MMM YYYY'),
            edit_holiday_dialog: false,
            edit_holiday_data:{},
            dialog2: false,
            create_data:{
                date:'',
                employee:{},
                center:{}
            },
            edit_rtt_dialog: false,
            edit_rtt_data:{},
            edit_plan_dialog:false,
            edit_data: {},
            delete_absent_dialog: false,
            absent_data:{},
            national_holidays: [],
            right_menu:{
                showMenu:false,
                x:0,
                y:0,
                date:'',
                user:{},
                center:{}
            },
            option_selects: '',
            absence_dialog:false,
            rtt_dialog:false,
            holiday_dialog:false,
            options: [
                {value:1, title: 'Absence' },
                {value:2, title: 'Rtt' },
                {value:3, title: 'Vacances' },
            ],
            drawer:false,
            employee_view:false,
        }
    },
    created() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.getweekly()
            this.getData()
            this.getNationalHoliday()
            console.log(this.selected,"selected")
        },
        testing(e,date, user, center){
            if(!this.$canAccess()){
            return
            }
            console.log(date,"value e")
            this.right_menu.showMenu = false;
            this.right_menu.x = e.clientX;
            this.right_menu.y = e.clientY;
            this.right_menu.date = date.date
            this.right_menu.user = user
            this.right_menu.center = center
            console.log(this.right_menu.date,"date")
            this.$nextTick(() => {
                this.right_menu.showMenu = true;
            });
        },
        clickItem(item){
            this.option_selects = item
            console.log(this.option_selects, "option")
            if(this.option_selects==1) {
                this.absence_dialog=true
            }
            else if(this.option_selects==2) {
                this.rtt_dialog=true
            }
            else if(this.option_selects==3) {
                this.holiday_dialog=true
            }else{
                alert("error")
            }
        },
        toggleNoWorkEmployees(){
            this.regions.forEach(region => {
                region.centers.forEach(center =>
                    this.test(center))
            })
        },
        test(center){
            let curr_center = this.center_storage.find(store => store.id === center.id);
            console.log(curr_center, 'curr')

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
                    if(this.$isBetween(start,end,plan.start_date)){
                        if(!data.some( u => u.id === user.id)){
                            data.push(user);
                        }
                    }
                })
            })
            center.users = data
        },
        getweekly() { 
            var currentDate = this.currentWeek;
            console.log(currentDate,"currentdate")
            var weekStart = currentDate.clone().startOf('isoWeek');
            console.log(moment(weekStart).add(i, 'days').format("YYYY-MM-DD"), "currendatefetch")
            this.CurrentMonthYear=moment(weekStart).add(i, 'days').format("YYYY-MM-DD")
            this.$emit('currentmonthyear', this.CurrentMonthYear)
            var days = [];
            for (var i = 0; i <= 6; i++) {
                days.push({
                    number: moment(weekStart).add(i, 'days').format("DD"),
                    text: moment(weekStart).add(i, 'days').format("ddd"),
                    date: moment(weekStart).add(i, 'days').format("YYYY-MM-DD")
                });
            }
            this.date = days;
        },
        getData(){
            this.loading = true
            GetAllRegions().then(({data}) => {
                this.regions = data
                this.loading = false
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
        closeDialog(){
            this.dialog2 = false
        },
        forceReload(){
            GetAllRegions().then(({data}) => {
                this.regions = data
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
        getNationalHoliday(){
            GetAllHolidays().then(({data}) =>{
                this.national_holidays = data
            })
        },
        $isHoliday(date){
            let flag = false
            this.national_holidays.forEach(hol => {
                if(this.$isSameDate(hol.date,date)){
                    flag = true
                }
            })
            return flag
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
        filter2(filters){
            if(filters.length){
                this.loading = true
                let storage =[]
                GetAllRegions().then(({data}) => {
                    data.forEach(dat => {
                        filters.forEach(filter => {
                            if(filter === dat.id){
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
        },
        changeView2(view) {
            this.employee_view = view
        },
    },
    watch:{
        "reqWeek": {
            handler(val) {
                this.currentWeek = val
                console.log(this.currentDay,"reqweek")
                this.getweekly()
            },
            deep: true,
        },
        "filter": {
            handler(val) {
                console.log(val,"filter")
                this.filter2(val)
            }
        },
        "employee_view2": {
            handler(val) {
                console.log(val,"filter")
                this.changeView2(val)
            }
        },
        'success': {
            handler(val) {
                if(val){
                    console.log("sadsss")
                    this.forceReload()
                    this.$emit('test')
                }
            }
        },
        '$store.getters.newDataIndex'(newVal) {
            if(newVal) {
                console.log(newVal,"JoursStore")
                this.$store.commit('UPDATE_NEW',false)
                this.forceReload()
            }
        },
    }
}
</script>