<script>
import moment from "moment"
export default {

    methods: {

        $arraysplicer(item, array_given) {
            array_given.splice(array_given.indexOf(item), 1);
        },
        $arrayupdater(item, array_given) {
            array_given.unshift(item);
        },
        $isOnArray(item, array_given){
            let found = array_given.find(arr => arr.id === item.id);
            let flag = false

            if(found != undefined) {
                flag = true
            }

            return flag
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

        $canAccess(){
            let flag = false
            let user = this.$store.getters['user']
            if(user.role_id != 3){
                 flag = true
            }

            return flag
        },

        $isAdmin(){
            let flag = false
            let user = this.$store.getters['user']
            if(user.role_id == 1){
                 flag = true
            }

            return flag
        },

        $isEmployee(){
            let flag = false
            let user = this.$store.getters['user']
            if(user.role_id == 3){
                 flag = true
            }

            return flag
        },

        $isManager(){
            let flag = false
            let user = this.$store.getters['user']
            if(user.role_id == 2){
                 flag = true
            }

            return flag
        },

        $statusColor(status){
            switch(status)
            {
            case 0:
                return 'gray'
            case 1:
                return 'green'
            case 2:
                return 'red'
            }
        },
        $notifColor(item){
            let colors = [
                {value: 0, color: 'green', hint: 'Basse'},
                {value: 1, color: 'orange', hint: 'Moyenne'},
                {value: 2, color: 'red', hint: 'Haute'},
            ]

            let selected = colors.find(color => {
                return item.data.type === color.value
            })

            return selected
        },

        $DateWithMonthTextfr(date){
            return moment(date).locale('fr').format('DD MMMM YYYY');
        },

        $timeFormat(time){
            return moment(time, "HH:mm").format('hh:mm')
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
        },
    }

}
</script>
