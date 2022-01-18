<template>
  <div >
    <v-alert
        class="success-container"
        :value="alert"
        border="right"
        color="success"
        type="error"
        elevation="2"
        transition="scale-transition"
    >
        {{message}}
    </v-alert>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        alert: true,
        message: 'test'
      }
    },
  }
</script>
<style scoped>
.success-container{
    position: fixed;
    bottom: 0px;
    z-index: 999;
    right: 10px;
    left: 10px;
}
</style>