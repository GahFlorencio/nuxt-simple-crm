<template>
  <v-container>
    <div class="d-flex flex-row">
      <v-text-field @keyup="keyUpSearch" v-model="search" label="Campo de Busca"></v-text-field>
      <v-btn
        @click="fetchData()"
        class="ma-2 primary"
        elevation="2"
      >
        <v-icon
          small
          color="ligth"
        >
          mdi-magnify
        </v-icon>
        Buscar
      </v-btn>
    </div>

    <TableComponent
      :headers="headers"
      :rows="rows"
      :pagination="pagination"
      title="Veiculos"
      :loading="loading"
      :model="model"
      :fetch-function="fetchData"
      :delete-function="deleteData"
    />
  </v-container>
</template>
<script>
import TableComponent from "@/components/Tables/TableComponent";
import CustomerVehicleModel from "@/Models/CustomerVehicleModel";
export default {
  name: 'BrandsPage',
  components: {TableComponent},
  data() {
    return {
      search: '',
      loading: false,
      model: CustomerVehicleModel,
      headers: [],
      rows: [],
      pagination: {
        current: 1,
        total: 0
      }
    }
  },
  methods: {
    async keyUpSearch(event) {
      if (event.key === "Enter") {
        await this.fetchData()
      }
    },
    async fetchData() {
      this.loading = true;
      await this.$axios.get(`/customer/vehicles?search=${this.search}&page=${this.pagination.current}`)
        .then((response) => {
          this.rows = response.data.paginate.data
          this.headers = response.data.headers
          this.pagination.current = response.data.paginate.current_page;
          this.pagination.total = response.data.paginate.last_page;
          this.loading = false
        })
        .catch((err)=>{
          this.loading = false
          console.log(err)
        })

    },
    async deleteData(id) {
      return await this.$axios.delete(`${this.model.route}/${id}`)
        .then((response) => (response.status))
        .catch((err) => {
          console.log(err)
          return 400
        })
    },
  },
  async mounted() {
    await this.fetchData()
  }
}
</script>
