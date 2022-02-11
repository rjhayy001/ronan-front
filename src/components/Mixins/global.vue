<script>
import moment from "moment"
export default {
    data() {
        return {
            nameRules: [
                v => !!v || 'Le nom est requis',
            ],
            dateRules: [
                v => !!v || 'Le nom est requis',
            ],
        }
    },

    methods: {

        $arraysplicer(item, array_given) {
            array_given.splice(array_given.indexOf(item), 1);
        },
        $arrayupdater(item, array_given) {
            array_given.unshift(item);
        },
        $defaultDate(date){
            return moment(date).format('DD-MM-YYYY');
        },
        $datePickerDate(date){
            return moment(date).format('YYYY-MM-DD');
        },
        // $DateWithMonthText(date){
        //     return moment(date).format('DD MMMM YYYY');
        // },
        $DateWithMonthTextfr(date){
            return moment(date).locale('fr').format('DD MMMM YYYY');
        },

        // date
        $isBetween(date1, date2, calendarDate){
            let today = moment(calendarDate)
            let day1 = moment(date1)
            let day2 = moment(date2)
            return today.isBetween(day1, day2, undefined, [])
        },
        $isSameDate(date1, date2){
            return moment(date1).isSame(moment(date2))
        }
    }

}
</script>
