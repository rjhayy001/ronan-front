<template>
  <div>
    <v-subheader class="subheader" style="border-bottom:1px solid gray">
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
              <v-row >
                <v-menu
                  bottom
                  origin="center center"
                  transition="scale-transition"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="sub-dropdown_btn"
                      v-bind="attrs"
                      v-on="on"
                      elevation="0"
                      width="200px"
                      height="47px"
                    >
                      Jours
                      <v-icon 
                      class="dropdown-icon"
                      small
                          color="gray"
                      >mdi-menu-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(item, i) in items"
                      :key="i"
                    >
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
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
        </div>
        <div class="css_thead">
          <div class="css_tr ">
            <div class="css_th sub_th border_table"></div>
              <div  v-for="date in date" :key="date.number" class="css_th sub_th" style="background-color:white;">
                <div :class="[date.text=='Sun' ? 'sunday': '']">
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
              <div id="data"  v-if="date.text=='Sun'" style="background-color:rgb(97 97 97)">
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
                <div id="data"  v-if="date.text=='Sun'" style="background-color:rgb(97 97 97)">
                  <p :style="date.text=='Sun' ? 'color:rgb(97 97 97)' : 'color:white'" class="date-hidden">.</p>
                </div>
              </div>
            </div>
            <div class="css_tr" v-for="(user, user_index) in center.users" :key="user.id+user_index+center.name+user_index+center.id">
              <div class="css_sd content_sd width_sd">
                {{user.first_name}}, {{user.last_name}}
              </div>
              <div class="css_td" v-for="date in date" :key="date.number">
                <div id="data"  v-if="date.text=='Sun'" style="background-color:rgb(97 97 97)">
                  <p :style="date.text=='Sun' ? 'color:rgb(97 97 97)' : 'color:white'" class="date-hidden">.</p>
                </div>
                <template v-else>
                    <div v-if="user.attendance">

                    </div>
                    <p class="date-hidden">.</p>
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <table-loader v-else></table-loader>
    <filter-planning :drawer="drawer" @close="drawer = false"/>
    <create-plan :dialog="dialog2" @close="closeDialog"/>
    <menu-button v-if="menu"/>
  </div>
</template>
<script>
import filterPlanning from './includes/filter.vue';
import menuButton from './includes/menu.vue';
import createPlan from './create.vue';
  import moment from 'moment' 
  import { GetAllRegions } from "@/repositories/region.api"
  export default {
    components:{
      filterPlanning,
      createPlan,
      menuButton
    },
      data() {
        return {
          counts: 20,
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
          loading: false
      };
    },
    mounted() {
      this.initialize()

    },
    methods: {
      initialize(){
        this.getMonthyear();
        this.getmonthly();
        this.getData()
      },
      getData(){
        this.loading = true
        GetAllRegions().then(({data}) => {
          console.log(data, 'regions')
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
            text: current.format('ddd')
          }); 
          daysInMonth--; 
        } 
        this.date = arrDays.reverse();
        console.log(this.date,"date");
      },
      click(){
        // alert(date);
        this.dialog2 = true
      },
      closeDialog(){
        this.dialog2 = false
      },
      showPendingApplication(){
        this.dialog3=true
      }
    },
  };
   
</script>

<style scoped>
#data2{
  background-color: red;
}
</style>
