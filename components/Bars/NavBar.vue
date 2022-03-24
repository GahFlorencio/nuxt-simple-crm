<template>
  <v-list dense>
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ this.$auth.user.name }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ this.$auth.user.email }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-icon>mdi-menu-down</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <div v-for="(item ,i) in items" :key="i">
      <v-list-item v-if="!item.items" :to="item.to">
        <v-list-item-icon>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-icon>

        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
      <v-list-group
        v-if="item.items"
        :prepend-icon="item.icon"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-title>{{item.title}}</v-list-item-title>
        </template>
          <v-list-item v-for="(subitem, index) in item.items" :key="index" :to="subitem.to">
            <v-list-item-title>{{ subitem.title }}</v-list-item-title>
          </v-list-item>


      </v-list-group>
    </div>



  </v-list>
</template>

<script>
export default {
  data: () => ({
    selectedItem: 0,
    items: [
      {
        icon: 'mdi-home',
        title: 'Inicio',
        to: '/',
        expandable:false,
      },
      {
        icon: 'mdi-map-marker',
        title: 'Localizaçao',
        items:[
          {
            title: 'Estados',
            to: '/location/state'
          },
          {
            title: 'Cidades',
            to: '/location/city'
          },
        ]
      },
      {
        icon: 'mdi-car-side',
        title: 'Veiculos',
        items:[
          {
            title: 'Tipo',
            to: '/vehicle/type'
          },
          {
            title: 'Marca',
            to: '/vehicle/brand'
          },
          {
            title: 'Modelo',
            to: '/vehicle/model'
          },
        ]
      },
      {
        icon: 'mdi-package-variant',
        title: 'Produtos',
        items:[
          {
            title: 'Tipo',
            to: '/product/type'
          }
        ]
      },
      {
        icon: 'mdi-account-supervisor-circle',
        title: 'Clientes',
        to: '/customer/customer'
      },
    ],
  }),
}
</script>
<style scoped>

</style>
