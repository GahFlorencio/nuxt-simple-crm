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
          icon: 'mdi-city',
          title: 'Cidades',
          to: '/location/city'
        },
        {
          icon: 'mdi-car-estate',
          title: 'Tipo Veículo',
          to: '/vehicle/type'
        },
        {
          icon: 'mdi-car-side',
          title: 'Marca Veículo',
          to: '/vehicle/brand'
        },
        {
          icon: 'mdi-truck-outline',
          title: 'Modelo Veículo',
          to: '/vehicle/model'
        },
        {
          icon: 'mdi-account-supervisor-circle',
          title: 'Clientes',
          to: '/customer/customer'
        },
      ],
    }
  },

}

</script>

<style scoped>

</style>
