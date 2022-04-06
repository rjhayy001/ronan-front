<script>
export default {
    methods: {
        $checkWorkFullDate(planning,date){
            // 1 = full 2 morning 3 afternoon
            if(this.$isSameDate(date.date, planning.start_date) && planning.start_Date_Type == 2){
                if(planning.is_conflict == 1){
                    return 'work-half-morning, morning-conflict'
                }
               return 'work-half-morning'
            }
            if(this.$isSameDate(date.date, planning.start_date) && planning.start_Date_Type == 3){
                if(planning.is_conflict == 1){
                    return 'work-half-afternoon, afternoon-conflict'
                }
               return 'work-half-afternoon'
            }
            if(this.$isSameDate(date.date, planning.end_date) && planning.end_Date_Type == 2){
                if(planning.is_conflict == 1){
                    return 'work-half-morning, morning-conflict'
                }
                return 'work-half-morning'
            }
            if(this.$isSameDate(date.date, planning.end_date) && planning.end_Date_Type == 3){
                if(planning.is_conflict == 1){
                    return 'work-half-afternoon, afternoon-conflict'
                }
                return 'work-half-afternoon'
            }
            else if(this.$isSameDate(date.date, planning.start_date) && planning.is_conflict == 1){
               return 'conflict'
            }
        },

        $checkHolidayFullDate(holiday,date){
            // 1= halfday
            if(this.$isSameDate(date.date, holiday.start_date) && holiday.startDate_isHalf_day == 1){
               return 'holiday-half-morning'
            }
            if(this.$isSameDate(date.date, holiday.start_date) && holiday.startDate_isHalf_day == 2){
               return 'holiday-half-afternoon'
            }
            if(this.$isSameDate(date.date, holiday.end_date) && holiday.endDate_isHalf_day == 1){
                return 'holiday-half-morning'
            }
            if(this.$isSameDate(date.date, holiday.end_date) && holiday.endDate_isHalf_day == 2){
                return 'holiday-half-afternoon'
            }
        }
    }
}
</script>