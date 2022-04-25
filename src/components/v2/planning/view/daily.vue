<template>
  <div>
    <div>
      <template>
        <div class="table_scroll">
          <div class="css_table css_table2">
            <div
              class="css_th"
              style="border-bottom:none!important;"
            ></div>
            <div class="css_thead">
              <div class="css_tr">
                <div style="position:relative; width: 300px;">
                  <div style="width: 80%; position:absolute; left:10px; z-index:4; top: -10px">
                    <v-autocomplete
                      deletable-chips
                      class="user-option"
                      placeholder="Search Employee ..."
                      dense
                      solo
                      hide-details="auto"
                      prepend-inner-icon="mdi-plus"
                    ></v-autocomplete>
                  </div>
                  <div style="width: 20%;position:absolute; right:-6px; z-index:4; top: -3px">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on">
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
                  </div>
                </div>
                <div
                  v-for="date in date"
                  :key="date.text + date.number"
                  class="css_th"
                >{{date.text}}</div>
              </div>
              <div class="css_tr ">
                <div class="css_th sub_th border_table"></div>
                <div
                  v-for="date in date"
                  :key="date.number"
                  class="css_th sub_th"
                  style="background-color:white;"
                >
                  <div
                    v-if="$isSameDate(date.date,$today())"
                    class="currentDay"
                  >
                    {{ date.number }}
                  </div>
                  <div
                    v-else-if="$isHoliday(date.date)"
                    class="holiday"
                  >
                    {{ date.number }}
                  </div>
                  <div
                    v-else
                    :class="[date.text=='Dim' ? 'sunday': '']"
                  >
                    {{ date.number }}
                  </div>
                </div>
              </div>
            </div>
            <div class="css_tbody">
              <v-virtual-scroll
                :bench="benched"
                :items="regions"
                height="800"
                style="position: absolute; width: 100%;"
                item-height="150"
              >
                <template v-slot:default="{ item }">
                  <div :key="item.id">
                    <div class="css_tr">
                      <div class="css_sd header_sd width_sd">
                        {{item.name}}
                        <span class="float-right mr-1">
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-icon
                                dark
                                small
                                v-bind="attrs"
                                v-on="on"
                              >
                                mdi-sort
                              </v-icon>
                            </template>
                            <span>Sort {{item.name}} Centers</span>
                          </v-tooltip>
                        </span>
                      </div>
                      <div
                        class="css_td"
                        style="width:51px;"
                        v-for="date in date"
                        :key="date.number"
                      >
                        <div
                          id="data"
                          v-if="$isSameDate(date.date,currentDay)"
                          class="currentDay"
                        >
                          <p
                            :style="date.text=='Dim' ? 'color:rgb(97 97 97)' : 'color:white'"
                            class="date-hidden position-absolute-fixed "
                          >.</p>
                        </div>
                        <div
                          v-else-if="$isHoliday(date.date)"
                          class="holiday"
                        >
                          <p class="date-hidden">.</p>
                        </div>
                        <div
                          id="data"
                          v-else-if="date.text=='Dim'"
                          style="background-color:rgb(97 97 97)"
                          class="position-absolute-fixed"
                        >
                          <p
                            :style="date.text=='Dim' ? 'color:rgb(97 97 97)' : 'color:white'"
                            class="date-hidden "
                          >.</p>
                        </div>
                      </div>
                    </div>
                    <template v-for="(center, center_index) in item.centers">
                      <template>
                        <div
                          class="css_tr"
                          :key="'center' + center_index"
                        >
                          <div class="css_sd subheader_sd width_sd">
                            {{center.name}}
                          </div>
                          <div
                            class="css_td"
                            v-for="date in date"
                            :key="date.number+'cs'"
                          >
                            <div
                              id="data"
                              v-if="$isSameDate(date.date,currentDay)"
                              class="currentDay"
                            >
                              <p
                                :style="date.text=='Dim' ? 'color:rgb(97 97 97)' : 'color:white'"
                                class="date-hidden"
                              >.</p>
                            </div>
                            <div
                              v-else-if="$isHoliday(date.date)"
                              class="holiday"
                            >
                              <p class="date-hidden">.</p>
                            </div>
                            <div
                              id="data"
                              v-else-if="date.text=='Dim'"
                              style="background-color:rgb(97 97 97); "
                              class="position-absolute-fixed"
                            >
                              <p
                                :style="date.text=='Dim' ? 'color:rgb(97 97 97)' : 'color:white'"
                                class="date-hidden"
                              >.</p>
                            </div>
                          </div>
                        </div>
                      </template>
                    </template>
                  </div>
                </template>
              </v-virtual-scroll>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { GetAllRegions, SearchRegions } from "@/repositories/region.api"
import moment from 'moment'
export default {
  data () {
    return {
      regions: [],
      benched: 0,
      date: [],
      loading: false,
      national_holidays: [],
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.getData()
      this.getDateData()
    },
    getData () {
      this.loading = true
      GetAllRegions().then(({ data }) => {
        this.regions = data
        console.log(data, 'test')
        this.loading = false
      })
    },
    getDateData () {
      var monthDate = moment(moment(), 'YYYY-MM');
      let month = moment().format('MMM DD YYYY')
      var daysInMonth = monthDate.daysInMonth();
      var arrDays = [];
      while (daysInMonth) {
        var current = moment(month).date(daysInMonth);
        arrDays.push({
          number: current.format('DD'),
          text: current.format('ddd'),
          date: current.format('YYYY-MM-DD'),
        });
        daysInMonth--;
      }
      this.date = arrDays.reverse();
      console.log(this.date)
    },
    $isHoliday (date) {
      let flag = false
      this.national_holidays.forEach(hol => {
        if (this.$isSameDate(hol.date, date)) {
          flag = true
        }
      })
      return flag
    },
  }
}
</script>