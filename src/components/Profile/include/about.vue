<template>
    <div>
        <div style="margin:auto; border-bottom: 2px solid gray; width: 99%; padding: 10px 20px; display:flex; gap: 20px">
            <div>
                <v-icon color="#005075">
                    mdi-account
                </v-icon>
            </div>
            <div>
                <div>
                    <h3 style="text-transform:uppercase; font-weight:400">
                        {{user.full_name}}
                    </h3>
                </div>
                <div>
                    <h4 style="font-weight: 400; color:#a7a7a7">
                        Nom et prénom
                    </h4>
                </div>
            </div>
        </div>
        <div style="margin:auto; border-bottom: 2px solid gray; width: 99%; padding: 10px 20px; display:flex; gap: 20px">
            <div>
                <v-icon color="#005075">
                    mdi-rename-box
                </v-icon>
            </div>
            <div>
                <div>
                    <h3 style="text-transform:uppercase; font-weight:400">
                        {{user.first_name}}
                    </h3>
                </div>
                <div>
                    <h4 style="font-weight: 400; color:#a7a7a7">
                        Prénom
                    </h4>
                </div>
            </div>
        </div>
        <div style="margin:auto; border-bottom: 2px solid gray; width: 99%; padding: 10px 20px; display:flex; gap: 20px">
            <div>
                <v-icon color="#005075">
                    mdi-rename-box
                </v-icon>
            </div>
            <div>
                <div>
                    <h3 style="text-transform:uppercase; font-weight:400">
                        {{user.last_name}}
                    </h3>
                </div>
                <div>
                    <h4 style="font-weight: 400; color:#a7a7a7">
                        Nom de famille
                    </h4>
                </div>
            </div>
        </div>
        <div style="margin:auto; border-bottom: 2px solid gray; width: 99%; padding: 10px 20px; display:flex; gap: 20px">
            <div>
                <v-icon color="#005075">
                    mdi-map-marker-outline
                </v-icon>
            </div>
            <div>
                <div>
                    <h3 style="text-transform:uppercase; font-weight:400">
                        {{user.address}}
                    </h3>
                </div>
                <div>
                    <h4 style="font-weight: 400; color:#a7a7a7">
                        Addresse
                    </h4>
                </div>
            </div>
        </div>
        <div style="margin:auto; border-bottom: 2px solid gray; width: 99%; padding: 10px 20px; display:flex; gap: 20px">
            <div>
                <v-icon color="#005075">
                    mdi-city
                </v-icon>
            </div>
            <div>
                <div>
                    <h3 style="text-transform:uppercase; font-weight:400">
                        {{user.city}}
                    </h3>
                </div>
                <div>
                    <h4 style="font-weight: 400; color:#a7a7a7">
                        Villé
                    </h4>
                </div>
            </div>
        </div>
        <div style="margin:auto; border-bottom: 2px solid gray; width: 99%; padding: 10px 20px; display:flex; gap: 20px">
            <div>
                <v-icon color="#005075">
                    mdi-email-outline
                </v-icon>
            </div>
            <div>
                <div>
                    <h3 style="text-transform:uppercase; font-weight:400">
                        {{user.zip_code}}
                    </h3>
                </div>
                <div>
                    <h4 style="font-weight: 400; color:#a7a7a7">
                        Code postal
                    </h4>
                </div>
            </div>
        </div>
        <div style="margin:auto; width: 99%; padding: 10px 20px; display:flex; gap: 20px">
            <div>
                <v-icon color="#005075">
                    mdi-phone-outline
                </v-icon>
            </div>
            <div>
                <div>
                    <h3 style="text-transform:uppercase; font-weight:400">
                       {{user.mobile}}
                    </h3>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    computed: {
        user() {
            return this.$store.getters['user']
        },
    }
}
</script>