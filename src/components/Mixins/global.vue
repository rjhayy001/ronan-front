<script>
import moment from "moment"
export default {
    data() {
        return {
            nameRules: [
                v => !!v || 'Le nom est requis',
            ],
            passwordRules: [
                v => !!v || 'Le mot de passe est requis',
            ],
            dateRules: [
                v => !!v || 'La date est requise',
            ],
            emailRules: [
                v => !!v || "L'e-mail est nécessaire",
                v => /.+@.+\..+/.test(v) || "L'e-mail doit être valide",
            ],
            generalRules: {
                firstName: [
                   v => !!v || 'Le nom est requis', 
                ],
                lastName: [
                   v => !!v || 'Le dernier est requis', 
                ],
                contact: {
                    required: [
                        v => !!v || 'Le dernier est requis', 
                        v => {
                            const pattern = /^\d+$/;
                            return pattern.test(v) || 'Chiffres uniquement'
                        }
                    ],
                    min: [
                        v => v.length >= 8 || 'Min 8 characters',
                    ]
                }
            },
            loginRules: {
                email: [
                    v => !!v || "L'e-mail est nécessaire",
                    v => /.+@.+\..+/.test(v) || "L'e-mail doit être valide",
                ],
                password: [
                    v => !!v || 'Le mot de passe est requis',
                ],
                code: [
                    v => !!v || "Le code est nécessaire",
                    v=> {
                        const pattern = /^\d+$/;
                        return pattern.test(v) || 'Chiffres uniquement'
                    }
                ]
            }
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
        }
    }

}
</script>
