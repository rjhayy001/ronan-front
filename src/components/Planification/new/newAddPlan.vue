<template>
    <div>
        <v-menu
            v-model="showMenu"
            offset-y
        >
            <div class="mx-auto">

            </div>
            <v-list>
                <v-list-item
                v-for="(item, index) in items"
                :key="index"
                >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>
<script>
export default {
    props:['showMenu'],
    data(){
        return{
            items: [
                { title: 'Click Me' },
                { title: 'Click Me' },
                { title: 'Click Me' },
                { title: 'Click Me 2' },
            ],
        }
    }
}
</script>