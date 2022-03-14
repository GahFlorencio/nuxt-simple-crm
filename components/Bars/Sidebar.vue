<template>
  <v-list>
    <v-list-item
      v-for="(item, i) in items"
      :key="i"
      :to="item.to"
      router
      exact
    >
      <v-list-item-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title v-text="item.title" />
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
name: "Sidebar",
  data () {
    return {
      path : this.$route.path,
      items: [
        {
          icon: 'mdi-home',
          title: 'Inicio',
          to: '/',
          expandable:false,
        },
        {
          icon: 'mdi-map-marker',
          title: 'Estados',
          to: '/location/state'
        },
        {
          icon: 'mdi-map-marker-outline',
          title: 'Cidades',
          to: '/location/city'
        },
        {
          icon: 'mdi-map-marker-outline',
          title: 'Tipo de Veiculo',
          to: '/vehicle/type'
        },
      ],
    }
  },

}

</script>

<style scoped>

</style>
