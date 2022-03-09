<template>
  <v-container>
    <p>Estados</p>
    <div class="d-flex flex-row">
      <v-text-field @keyup="keyUpSearch" v-model="search" label="Campo de Busca"></v-text-field>
      <v-btn
        @click="fetchCities()"
        class="ma-2 primary"
        elevation="2"
      >
        <v-icon
          small
          color="ligth"
        >
          mdi-magnify
        </v-icon> Buscar</v-btn>
    </div>


    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th v-for ="column in headers" :keys="column" v-if="!hidden.includes(column)" class="text-left">
            {{translateColumn(column)}}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="row in rows"
          :key="row.id"
        >
          <td v-for="column in headers" :key="row.id+column" v-if="!hidden.includes(column)">
            {{ convertColumn(column, row[column]) }}
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>
<script>
export default {
  name: 'CitiesPage',
  data () {
    return {
      search: '',
      hidden:[
      ],
      translate:{
        name:'Nome',
        code:'Codigo IBGE',
        created_at:'Criado',
        updated_at:'Atualizado',
        deleted_at: 'Deletado',
        abbr:'UF'
      },
      dateColumns:[
        'created_at',
        'updated_at',
        'deleted_at'
      ],
      headers: [

      ],
      rows: [

      ],
    }
  },
  methods:{
    async keyUpSearch(event){
      if(event.key == "Enter")
      {
        await this.fetchCities()
      }
    },
    async fetchCities(){
      const {paginate,headers} =  await this.$axios.get(`/location/states?search=${this.search}`).then((response) => response.data)

      this.rows = paginate.data
      this.headers = headers
    },
    convertColumn(column, value){
      if(this.dateColumns.includes(column)){
        return new Date(value).toLocaleString()
      }
      return value
    },
    translateColumn(column){
      if(this.translate[column]){
        return this.translate[column]
      }
      return column
    }
  },
  async mounted () {
    await this.fetchCities()
  }
}
</script>
