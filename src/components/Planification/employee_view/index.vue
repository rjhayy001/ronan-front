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
                        @click.stop="$emit('openFilter')"
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
                        <div div v-for="date in date" :key="date.text + date.number"  class="css_th">{{date.text}}</div>
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
                            <div v-else :class="[date.text=='Sun' ? 'sunday': '']">
                                {{ date.number }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="css_tbody" v-for="(employee, emp_index) in employees" :key="'sad'+emp_index + employee.id">
                    <div class="css_tr">
                        <div class="css_sd content_sd width_sd">
                            {{employee.full_name}}
                        </div>
                        <div class="css_td" v-for="date in date" :key="date.number">
                            <div id="data" v-if="$isSameDate(date.date,currentDay)" class="currentDay">
                                <p :style="date.text=='Sun' ? 'color:rgb(97 97 97)' : 'color:white'" class="date-hidden">.</p>
                            </div>
                            <div v-else-if="$isHoliday(date.date)" class="holiday">
                                <p class="date-hidden">.</p>
                            </div>
                            <div id="data" v-else-if="date.text=='Sun'" style="background-color:rgb(97 97 97)">
                                <p :style="date.text=='Sun' ? 'color:rgb(97 97 97)' : 'color:white'" class="date-hidden">.</p>
                            </div>
                            <div v-else class="empty-day position-absolute-fixed" @click="addWork(employee,date.date)">
                                <p :style="date.text=='Sun' ? 'color:rgb(97 97 97)' : 'color:white'" class="date-hidden">.</p>
                            </div>
                            <!-- for planning -->
                            <template v-if="employee.planning && date.text !='Sun'">
                                <template v-for="(planning, plann_index) in employee.planning">
                                    <div 
                                        v-if="$isBetween(
                                            planning.start_date, 
                                            planning.end_date, 
                                            date.date
                                        )" 
                                        :key="plann_index + 'asdplann'" 
                                        :class="['work-full pointer', $checkWorkFullDate(planning, date)]"
                                        :style="planning.is_conflict == 1 ? 'background:#6a1b9a !important' : ''"
                                        @click="editWork(employee, planning)"
                                    >
                                        <p class="date-hidden" >.</p>
                                    </div>
                                </template>
                            </template>
                            <!-- for employee holidays -->
                            <template v-if="employee.holidays && date.text !='Sun'">
                                <template v-for="(holiday, holi_index) in employee.holidays">
                                <div 
                                    @click="editHoliday(holiday, employee)"
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
                            <template v-if="employee.rtts && date.text !='Sun'">
                                <template v-for="(rtt, rtt_index) in employee.rtts">
                                <div 
                                    @click="editRtt(rtt, employee)"
                                    v-if="$isSameDate(date.date, rtt.date)&& rtt.status == 1" 
                                    :key="rtt_index + 'rttasd'" 
                                    :class="['rtt-full','pointer']"
                                >
                                    <p class="date-hidden" >.</p>
                                </div>
                                </template>
                            </template>
                            <!-- absents -->
                            <template v-if="employee.absents && date.text !='Dim'">
                                <template v-for="(nat_holiday, nat_index) in employee.absents">
                                    <div 
                                    v-if="$isSameDate(
                                        nat_holiday.date,
                                        date.date
                                    )" 
                                    :key="nat_index + 'nat_holiday'" 
                                    :class="['nat-holiday','pointer']"
                                    style="background-color:red !important;"
                                    >
                                    <p class="date-hidden" >.</p>
                                    </div>
                                </template>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- rtt -->
        <edit-rtt
            v-if="edit_rtt_dialog"
            :dialog="edit_rtt_dialog"
            @close="edit_rtt_dialog=false"
            @success="forceReload2"
            :data="edit_rtt_data"
        />
        <!-- holiday -->
        <edit-holiday
            v-if="edit_holiday_dialog"
            :dialog="edit_holiday_dialog"
            @close="edit_holiday_dialog=false"
            :data="edit_holiday_data"
        />
        <!-- plan or work -->
        <create-plan 
            v-if="add_work_dialog" 
            :dialog="add_work_dialog" 
            @close="add_work_dialog=false"
            :data="add_work_data"
        />
        <edit-plan
            v-if="edit_work_dialog"
            :dialog="edit_work_dialog"
            @close="edit_work_dialog=false"
            :data="edit_work_data"
        />
    </div>
</template>
<script>
import { GetEmployeeView } from '@/repositories/planning.api'
import { GetAllHolidays } from "@/repositories/holidays.api"
import editRtt from '@/components/Planification/includes/rtt/editRtt.vue'
import editHoliday from '@/components/Planification/includes/holiday/editHoliday'
import CreatePlan from '@/components/Planification/employee_view/includes/planning/addWork'
import EditPlan from '@/components/Planification/employee_view/includes/planning/editWork'
import moment from 'moment' 
export default {
    components: {
        editHoliday,
        editRtt,
        CreatePlan,
        EditPlan
    },
    data(){
        return {
            add_work_dialog:false,
            add_work_data:{},
            edit_work_dialog:false,
            edit_work_data:{},
            edit_holiday_dialog: false,
            edit_holiday_data:{},
            edit_rtt_dialog: false,
            edit_rtt_data:{},
            loading:false,
            employees:[],
            month: moment().format('MMM YYYY'),
            year: moment(this.month).format('YYYY'),
            monthly: moment(this.month).format('MMM'),
            month_digit:moment(this.month).format('MM'),
            currentDay: moment().format('YYYY-MM-DD'),
            date:[],
            e2:'Jours',
            items: [
                { title: 'Jours' },
                { title: 'Semaine' },
                { title: 'Mois' },
            ],
            selects: [
                'Jours', 'Semaine', 'Mois' 
            ],
            national_holidays:[]
        }
    },
    created(){
        this.initialize()
    },
    computed:{
        forceReloadFlag(){
            return this.$store.getters['forceReloadFlag']
        }
    },
    watch:{
        'forceReloadFlag': function(value) {
            if(value){
                this.forceReload2()
            }
        }
    },
    methods: {
        initialize(){
            this.getMonthyear();
            this.getmonthly();
            this.getNationalHoliday()
            this.getData()
        },
        forceReload2(){
            GetEmployeeView().then(({data}) => {
                this.employees = data
                this.$store.commit('toggleForceReload', false)
            })
        },
        addWork(employee, date){
            this.add_work_data = {
                employee:employee,
                date:date
            }
            this.$nextTick(function () {
                this.add_work_dialog = true
            })
        },
        editWork(employee, planning) {
            this.edit_work_data = {
                employee:employee,
                planning: planning
            }
            this.$nextTick(function () {
                this.edit_work_dialog = true
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
        editRtt(rtt, employee){
            this.edit_rtt_data = {
                rtt:rtt,
                employee:employee
            }
            this.$nextTick(function () {
                this.edit_rtt_dialog = true
            })
        },
        getData(){
            this.loading = true
            GetEmployeeView().then(({data}) => {
                console.log(data, 'emp')
                this.employees = data
                this.loading = false
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
    }
}
</script>

