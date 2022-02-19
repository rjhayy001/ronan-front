<script>
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
}
</script>