<script>
export default {
    data() {
        return {
            general: {
                general_name: {
                    firstName: [
                       v => !!v || 'Le nom est requis',
                       v => !v || /\S+.*/.test(v) || "Les espaces blancs ne sont pas valides",
                    ],
                    lastName: [
                        v => !!v || 'Nom de famille requis', 
                        v => !v || /\S+.*/.test(v) || "Les espaces blancs ne sont pas valides",
                    ],
                },
                general_contact: {
                    contact: [
                        v => !!v || 'Le dernier est requis', 
                    ],
                },
                general_mailing_address: {
                    address: [
                        v => !!v || 'Le rue est requis',
                        v => !v || /\S+.*/.test(v) || "Les espaces blancs ne sont pas valides",
                    ],
                    code_postal: [
                        v => !!v || "Le code postal est nécessaire",
                        v=> {
                            const pattern = /^\d+$/;
                            return pattern.test(v) || 'Chiffres uniquement'
                        }
                    ],
                    citys: [
                        v => !!v || 'Le ville est requis',
                        v => !v || /\S+.*/.test(v) || "Les espaces blancs ne sont pas valides",
                    ],
                },
                general_date_birth: {
                    birth_date: [
                        v => !!v || 'Date de naissance requise',
                    ],
                }
            },
            security_connection: {
                change_email: {
                    new_email: [
                        v => !!v || "Nouveau courriel requis",
                        v => /.+@.+\..+/.test(v) || "L'e-mail doit être valide",
                    ],
                    code_confirmation: [
                        v => !!v || "Code de confirmation requis",
                        v=> {
                            const pattern = /^\d+$/;
                            return pattern.test(v) || 'Chiffres uniquement'
                        }
                    ]
                },
                change_password: {
                    old_password: [
                        v => !!v || "Ancien mot de passe requis",
                    ],
                    new_password: [
                        v => !!v || "Nouveau mot de passe requis",
                    ],
                    confirm_password: [
                        v => !!v || 'Confirmation du nouveau mot de passe requis',
                        (v) => (v === this.current_new_password) || 'Le mot de passe doit correspondre',
                    ],
                },
                administrator_key: {
                    old_administrator_key: [
                        v => !!v || "Ancienne clé d'administrateur requise",
                    ],
                    new_administrator_key: [
                        v => !!v || "Nouvelle clé d'administrateur requise",
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
            public_holiday: {
                holiday_name: [
                    v => !!v || 'Le nom est requis',
                ],
                holiday_date: [
                    v => !!v || 'La date est requise',
                ]
            },
            regions: {
                regions_name: [
                    v => !!v || 'Le nom est requis',
                ]
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
                    v=> {
                        const pattern=/\S+.*/;
                        return pattern.test(v) || 'Le code est nécessaire'
                    }
                ],
                confirm_password: [
                    v => !!v || 'Le mot de passe est requis',
                    (v) => (v === this.new_password) || 'Le mot de passe doit correspondre',
                ]
            },
            centre: {
                name: [ 
                    v=> {
                        const pattern=/\S+.*/;
                        return pattern.test(v) || 'Le nom est requis'
                    }
                ],
                email: [
                    v=> {
                        const pattern=/\S+.*/;
                        return pattern.test(v) || 'Le nom est requis'
                    }
                ],
                street: [
                    v => !!v || 'Le rue est requis',
                    v=> {
                        const pattern=/\S+.*/;
                        return pattern.test(v) || 'Le rue est requis'
                    }
                ],
                address: [
                    v => !!v || 'Le rue est requis',
                    v => !v || /\S+.*/.test(v) || "Les espaces blancs ne sont pas valides",
                ],
                citys: [
                    v => !!v || 'Le ville est requis',
                    v=> {
                        const pattern=/\S+.*/;
                        return pattern.test(v) || "Le ville est requis"
                    }
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
                        const pattern=/\S+.*/;
                        return pattern.test(v) || 'Le numéro de contact est nécessaire'
                    },
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
                emails: [
                    v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "L'e-mail doit être valide",
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
                birth_date: [
                    v => !!v || 'Date de naissance requise',
                ],
            },
        }
    },
}
</script>