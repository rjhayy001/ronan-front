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
            advertiseRules: {
                title_ad: [
                    v => !!v || "Titre de l'annonce requis", 
                ],
                content_ad: [
                    v => !!v || "Contenu de l'annonce requis", 
                ],
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
            },
            centre: {
                name: [
                    v => !!v || 'Le nom est requis',
                ],
                email: [
                    v => !!v || "L'e-mail est nécessaire",
                    v => /.+@.+\..+/.test(v) || "L'e-mail doit être valide",
                ],
                street: [
                    v => !!v || 'Le rue est requis',
                ],
                address: [
                    v => !!v || "L'adresse est requise",
                ],
                city: [
                    v => !!v || 'Le ville est requis',
                ],
                code_postal: [
                    v => !!v || "Le code postal est nécessaire",
                    v=> {
                        const pattern = /^\d+$/;
                        return pattern.test(v) || 'Chiffres uniquement'
                    }
                ],
                number: [
                    v => !!v || "Le numéro de contact est nécessaire",
                    v=> {
                        const pattern = /^\d+$/;
                        return pattern.test(v) || 'Chiffres uniquement'
                    }
                ],
            },
            employee: {
                first_names: [
                    v => !!v || 'Le prénom est requis',
                ],
                last_names: [
                    v => !!v || 'Le nom de famille est requis',
                ],
                passwords: [
                    v => !!v || 'Le mot de passe est requis',
                ],
                email: [
                    v => !!v || "L'e-mail est nécessaire",
                    v => /.+@.+\..+/.test(v) || "L'e-mail doit être valide",
                ],
                street: [
                    v => !!v || 'Le rue est requis',
                ],
                addresse: [
                    v => !!v || "L'adresse est requise",
                ],
                citys: [
                    v => !!v || 'Le ville est requis',
                ],
                code_postal: [
                    v => !!v || "Le code postal est nécessaire",
                    v=> {
                        const pattern = /^\d+$/;
                        return pattern.test(v) || 'Chiffres uniquement'
                    }
                ],
                number: [
                    v => !!v || "Le numéro de contact est nécessaire",
                    v=> {
                        const pattern = /^\d+$/;
                        return pattern.test(v) || 'Chiffres uniquement'
                    }
                ],
            }
        }
    },
}
</script>