<template>
  <div>
    <v-subheader class="subheader">
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
                      height="48px"
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
                  height="48px"
                  @click.stop="drawer = !drawer"
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
    <div class="table_scroll">
      <div class="css_table css_table2">
          <div></div>
          <div class="css_thead">
            <div class="css_tr">
              <div></div>
              <div v-for="date in date" :key="date.text + date.number"  class="css_th">{{date.text}}</div>
            </div>
          </div>
          <div class="css_thead">
            <div class="css_tr">
              <div class="css_th sub_th"></div>
                <div  v-for="date in date" :key="date.number" class="css_th sub_th">
                  <div :class="[date.text=='Sun' ? 'sunday': '']">
                    {{ date.number }}
                  </div>
                </div>
            </div>
          </div>
        <div class="css_tbody" v-for="i in counts" :key="i">
          <div class="css_tr">
            <div class="css_sd header_sd width_sd">
              Secteur Nord
            </div>
            <div class="css_td" v-for="date in date" :key="date.number">
              <div v-if="date.text=='Sun'" style="background-color:rgb(97 97 97)">
                <p style="color:rgb(97 97 97); margin:0 ">.</p>
              </div>
            </div>
          </div>
          <div class="css_tr">
            <div class="css_sd subheader_sd width_sd">
              MORLAIX JARLOT
            </div>
            <div class="css_td" v-for="date in date" :key="date.number">
              <div v-if="date.text=='Sun'" style="background-color:rgb(97 97 97)">
                <p style="color:rgb(97 97 97); margin:0 ">.</p>
              </div>
            </div>
          </div>
          <div class="css_tr">
            <div class="css_sd content_sd width_sd">
              Arnaud LARUE
            </div>
            <div class="css_td" v-for="date in date" :key="date.number">
              <div v-if="date.text=='Sun'" style="background-color:rgb(97 97 97)">
                <p style="color:rgb(97 97 97); margin:0 ">.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      right
      width="300px"
      class="right-drawer"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Filter:</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content class="right">
          <v-list-item-title class="text1">Réinitialiser</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Région:</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item class="drawer-list">
          <v-col class="list-list">
            <v-checkbox
              label="Secteur Nord"
              color="#005075"
              value="Secteur Nord"
              hide-details
            ></v-checkbox>
          </v-col>
          <v-col class="list-list">
            <v-checkbox
              label="Secteur Sud"
              color="#005075"
              value="Secteur Sud"
              hide-details
            ></v-checkbox>
          </v-col>
          <v-col class="list-list">
            <v-checkbox
              label="Autonome"
              color="#005075"
              value="Autonome"
              hide-details
            ></v-checkbox>
          </v-col>
          <v-col class="list-list">
            <v-checkbox
              label="Normandie"
              color="#005075"
              value="Normandie"
              hide-details
            ></v-checkbox>
          </v-col>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item class="drawer-list">
          <v-col class="list-list list1">
            <v-list-item-content>
              <v-list-item-title class="list1-text">Vue des employés:</v-list-item-title>
            </v-list-item-content>
            <v-checkbox
              color="#005075"
              value="Secteur Nord"
              hide-details
            ></v-checkbox>
          </v-col>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
  import moment from 'moment' 
  export default {
      data() {
        return {
          counts: 10,
          month: moment().format('MMM YYYY'),
          drawer: null,
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
      };
    },
    mounted() {
      this.getMonthyear();
      this.getmonthly();
    },
    methods: {
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
        console.log(monthDate,'sad')
        var daysInMonth = monthDate.daysInMonth() ; 
        console.log(daysInMonth, 'test')
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
      }
    },
  };
</script>
