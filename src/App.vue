<template>
    <div :is="layout">

    </div>
</template>
<script>
let layouts = require.context('./layouts/', true, /\.vue$/i)

layouts = layouts.keys().reduce(
  (temp_layouts, key) => {
    temp_layouts[key.split('/').pop().split('.')[0]] = layouts(key).default
    return temp_layouts
  },
  {}
)

export default {
  components: layouts,
  computed: {
    'layout': function() {
      const component_layout = this.$route.meta.layout
      return (component_layout || 'Default')
    }
  },
}
</script>
<style>
  /* @import './assets/sass/fonts.scss'; */
  /* @import './assets/sass/icons.scss'; */
  /* @import './assets/sass/global.scss'; */
  @import './assets/sass/main.scss';
</style>
