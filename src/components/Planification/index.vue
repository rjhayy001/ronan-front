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
          <div flat solo class="date-field" readonly min="0.00"><p class="displaymonth">{{displayMonth}}</p><p>{{year}}</p></div>
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
                      flat
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
                  flat
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
      <div class="css_table" style="text-align:center; margin:auto;">
        <div class="css_thead">
          <div class="css_tr">
            <div></div>
            <div class="css_th">Sam</div>
            <div class="css_th">Dim</div>
            <div class="css_th">Lun</div>
            <div class="css_th">Mar</div>
            <div class="css_th">Mer</div>
            <div class="css_th">Jeu</div>
            <div class="css_th">Ven</div>
            <div class="css_th">Sam</div>
            <div class="css_th">Dim</div>
            <div class="css_th">lun</div>     
            <div class="css_th">Lun</div>
            <div class="css_th">Mar</div>
            <div class="css_th">Mer</div>
            <div class="css_th">Jeu</div>
            <div class="css_th">Ven</div>
            <div class="css_th">Sam</div>
            <div class="css_th">Dim</div>
            <div class="css_th">lun</div>     
            <div class="css_th">Lun</div>
            <div class="css_th">Mar</div>
            <div class="css_th">Mer</div>
            <div class="css_th">Jeu</div>
            <div class="css_th">Ven</div>
            <div class="css_th">Sam</div>
            <div class="css_th">Dim</div>
            <div class="css_th">lun</div>     
            <div class="css_th">Lun</div>
            <div class="css_th">Mar</div>
            <div class="css_th">Mer</div>
            <div class="css_th">Jeu</div>
            <div class="css_th">Ven</div>   
          </div>
        </div>
        <div class="css_thead">
          <div class="css_tr">
            <div class="css_th sub_th"></div>
            <div class="css_th sub_th">1</div>
            <div class="css_th sub_th" style="background-color:#616161">2</div>
            <div class="css_th sub_th">3</div>
            <div class="css_th sub_th">4</div>
            <div class="css_th sub_th">5</div>
            <div class="css_th sub_th">6</div>
            <div class="css_th sub_th">7</div>
            <div class="css_th sub_th">8</div>
            <div class="css_th sub_th" style="background-color:#616161">9</div>
            <div class="css_th sub_th">10</div>     
            <div class="css_th sub_th">11</div>
            <div class="css_th sub_th">12</div>
            <div class="css_th sub_th">13</div>
            <div class="css_th sub_th">14</div>
            <div class="css_th sub_th">15</div>
            <div class="css_th sub_th" style="background-color:#616161">16</div>
            <div class="css_th sub_th">17</div>
            <div class="css_th sub_th">18</div>
            <div class="css_th sub_th">19</div>
            <div class="css_th sub_th">20</div>     
            <div class="css_th sub_th">21</div>
            <div class="css_th sub_th">22</div>
            <div class="css_th sub_th" style="background-color:#616161">23</div>
            <div class="css_th sub_th">24</div>
            <div class="css_th sub_th">25</div>
            <div class="css_th sub_th">26</div>
            <div class="css_th sub_th">27</div>
            <div class="css_th sub_th">28</div>
            <div class="css_th sub_th">29</div>
            <div class="css_th sub_th" style="background-color:#616161">30</div>     
            <div class="css_th sub_th">31</div>     
          </div>
        </div>
        <div class="css_tbody">
          <div class="css_tr">
            <div class="css_sd" style="background-color:#424242">Secteur Nord</div>
            <div class="css_td"></div>
            <div class="css_td" style="background-color:#616161"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td" style="background-color:#616161"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td" style="background-color:#616161"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td" style="background-color:#616161"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td" style="background-color:#616161"></div>
            <div class="css_td"></div>
          </div>
          <div class="css_tr">
            <div class="css_sd" style="background-color:#0086c2">MORLAIX JARLOT</div>
            <div class="css_td"></div>
            <div class="css_td" style="background-color:#616161"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td" style="background-color:#616161"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td" style="background-color:#616161"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td" style="background-color:#616161"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td" style="background-color:#616161"></div>
            <div class="css_td"></div>
          </div>
          <div class="css_tr">
            <div class="css_sd" style="background-color:white; color:black">Arnaud LARUE</div>
            <div class="css_td"></div>
            <div class="css_td" style="background-color:#616161"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td" style="background-color:#616161"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td" style="background-color:#616161"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td" style="background-color:#616161"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td"></div>
            <div class="css_td" style="background-color:#616161"></div>
            <div class="css_td"></div>
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
          <v-list-item-title class="text">Réinitialiser</v-list-item-title>
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
              v-model="ex4"
              label="Secteur Nord"
              color="#005075"
              value="Secteur Nord"
              hide-details
            ></v-checkbox>
          </v-col>
          <v-col class="list-list">
            <v-checkbox
              v-model="ex4"
              label="Secteur Sud"
              color="#005075"
              value="Secteur Sud"
              hide-details
            ></v-checkbox>
          </v-col>
          <v-col class="list-list">
            <v-checkbox
              v-model="ex4"
              label="Autonome"
              color="#005075"
              value="Autonome"
              hide-details
            ></v-checkbox>
          </v-col>
          <v-col class="list-list">
            <v-checkbox
              v-model="ex4"
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
              v-model="ex4"
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
  export default {
      data() {
        return {
          month: new Date().getMonth(),
          year: new Date().getFullYear(),
          date2:'',
          date1:'',
          displayMonth: '',
          count: 0,
          drawer: null,
          request: '',
          datas: [
            { title: 'Home', icon: 'mdi-view-dashboard' },
            { title: 'About', icon: 'mdi-forum' },
          ],
          items: [
            { title: 'Jours' },
            { title: 'Semaine' },
            { title: 'Mois' },
          ],
          months: ['JANV.','FÉRV.','MARS.','AVR.','MAI.','JUIN.','JUIL.','AOÛT.','SEPT.','OCT.','NOV.','DÉC.']
      };
    },
    mounted() {
      this.getMonthyear();
      this.getmonthly();
    },
    methods: {
      getMonthyear(){
        let months = this.months;
        let monthcount = this.month;
        this.displayMonth= months[monthcount];
      },
      increment() {
        this.count++
        this.computeIncreament();
      },
      computeIncreament(){
        let months = this.months;
        let numberCount = this.count;
        if(this.count<=11 && this.count>=0){
          let monthcount = numberCount;
          this.displayMonth = months[monthcount]
        }else if(this.count==12){
          this.count=0;
          this.year++
          this.displayMonth = months[0]
        }else{
            alert("error")
        }
      },
      decrement() {
        this.count--
        this.computesDecrement();
      },
      computesDecrement() {
        let months = this.months;
        let numberCount = this.count;
        if(this.count<=11 && this.count>=0){
          let monthcount = numberCount;
          this.displayMonth = months[monthcount]
        }else if(this.count<=0){
          this.count=11;
          this.year--
          this.displayMonth = months[11]
        }else{
          alert("error")
        }
      },

      getmonthly() {
        var months = this.month;
        var year = this.year;
        this.request = new Date(year, months, 0).getDate();    
      }
    },
  };
</script>

<style scoped>
.subheader{
  margin-top: 16px;
  width:100%; margin-top: 20px;
  padding: 0;
}

.subheader .sub-container {
  height: 100%;
  width:50%;
  display:flex; 
  justify-content:center;
}

.subheader .sub-container .date-container{
  display:flex; 
  justify-content:center;
}

.subheader .sub-container .date-container .arrow-btn{
  margin: auto 0;
}

.subheader .sub-container .date-container .date-field{
  text-align:center; 
  margin: 15px 10em; 
  padding: 0!important; 
  display:flex;
}

.subheader .sub-container .date-container .date-field p{
  margin: 0!important;
}

.subheader .sub-container .date-container .date-field .displaymonth{
  padding-right: 5px; 
}

.sub-container .field {
  position:relative;  
  width: 100%;
}

.sub-container .field .sub-field{
  position:absolute; 
  right:14px; 
  display:flex;
  bottom:0; 
  top:0; 
  align-items:center;
}

.sub-container .field .sub-field .sub-dropdown_btn {
  color:black; 
  background-color:white;
}

.sub-container .field .sub-field .sub-dropdown_btn .dropdown-icon{
  margin-left: 20px
}

.sub-container .field .sub-field .sub-filter_btn{
  color:black; 
  background-color:white; 
  padding:0!important;
} 

.sub-container .field .sub-field .sub-filter_btn{
  margin-right: 10px;
}

.subheader .tags {
  height: 100%;
  width:50%; 
  position:relative; 
  display:flex;
  align-items: center;
}

.subheader .tags .tags-container {
  position:absolute; 
  right:10px; 
  display:flex; 
  align-items:center;
}

.subheader .tags .tags-container .container{
  display:flex;
  align-items: center; 
  width: 7.6em;
}

.subheader .tags .tags-container .container .tags-color{
  width:15px; 
  height:8px; 
  border-radius: 10px
}

.subheader .tags .tags-container .container .tags-name{
  padding-left:5px;
  pointer-events: none;
}

.subheader .tags .tags-container .container .travaille{
  background-color: #2196f3; 
}

.subheader .tags .tags-container .container .absence{
  background-color: #f44336; 
}

.subheader .tags .tags-container .container .conflit{
  background-color: #6a1b9a; 
}

.subheader .tags .tags-container .container .vacances{
  background-color: #4caf50; 
}

.subheader .tags .tags-container .container .rtt{
  background-color: #ffeb3a; 
}

.subheader .tags .tags-container .container .dimanche{
  background-color: #757575; 
}

.subheader .tags .tags-container .container .jour{
  background-color: #ff9801; 
}

.right-drawer {
  right:0; 
  padding: 20px; 
  margin-top: 20px;
}
.right-drawer .right{
  margin-left: 60px;
}
.right-drawer .right .text{
  color:#2196f3;
}

.right-drawer .drawer-list {
  display:flex;
  flex-direction: column;
}
.right-drawer .drawer-list .list-list{
  padding:0!important;
}

.right-drawer .drawer-list .list1 {
  display: flex;
}

.right-drawer .drawer-list .list1 .list1-text {
  font-size:16px
}

.v-menu__content{
    min-width: 110px!important;
}

/*Limit Height & Resize*/
.table_scroll {
  min-height: 300px;
  overflow: auto;
  margin: auto;
  resize: vertical;
  width: 100%;
  /* box-shadow: 0px 35px 50px rgba( 0, 0, 0, 0.2 ); */
}

/*Div Table Setting*/
.css_table {
  display: table;
  position: relative;
  width:100%;
}

.css_tr {
  display: table-row;
}

.css_tr:nth-child(even) .css_td {
  background: #fafafa;
}

.css_tr:nth-child(odd) .css_td {
  background: #fafafa;
}

.css_td,
.css_th,
.css_sd{
  display: table-cell;
  white-space:nowrap; 
  border-bottom: 0.2px solid #fff;
  border-right: 0.2px solid #fff;
}

.css_thead {
  display: table-header-group;
  font-weight: bold;
  z-index:1;
}

.css_tfoot {
  background-color: #eee;
  display: table-footer-group;
  font-weight: bold;
}

.css_tbody {
  display: table-row-group;
}

/*Table Header Fixed */
.css_th, .css_sd{
  position: sticky;
  background-color: #005075;
  color: #fff;
}

.css_th{
  top: 0;
}

.css_sd{
  left: 0;
}

.css_thead div.css_th:first-child,
.css_tfoot div.css_th:first-child{
  left:0;
  z-index:1;
}

.css_tfoot .css_th{
  bottom:0
}

.sub_th {
    background-color: white;
    color: black;
}

.v-input--selection-controls {
  margin:auto!important;
}
</style>