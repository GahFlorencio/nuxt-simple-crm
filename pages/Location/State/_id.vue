<template>
  <v-container>
    <v-card-text>
      <h1>Estado</h1>
      <v-container>
        <v-row v-for="column in model.form" :key="column.column">
          <v-col
            cols="12"
            v-if="(isEditing && column.edit) || (isEditing  === false &&  column.create === true)"
          >
            <v-text-field
              v-if="column.type === String"
              v-model="editedItem[column.column]"
              :label="column.text"
            ></v-text-field>
            <v-text-field
              v-if="column.type === Date"
              v-model="new Date(editedItem[column.column]).toLocaleString()"
              :label="column.text"
              :readonly="blockedFields.includes(column.column)"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="">
          <v-btn

            color="green darken-2"
            dark
            class="ma-2"
            @click="saveData"
          >
            Salvar
            <v-icon>
              mdi-content-save-check
            </v-icon>
          </v-btn>
          <v-btn
            color="red darken-2"
            dark
            class="ma-2"
            @click="toogleDelete"
          >
            Deletar
            <v-icon>
              mdi-delete-outline
            </v-icon>
          </v-btn>
        </v-row>
      </v-container>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">Deseja deletar esse item ?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="toogleDelete">Cancelar</v-btn>
            <v-btn color="red darken-1" text @click="deleteData()">DELETAR</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-text>
  </v-container>

</template>

<script>
import stateModel from "@/Models/StateModel";

export default {
  name: "StatePage",
  data: () => ({
    model: stateModel,
    dialogDelete: false,
    blockedFields: ['created_at', 'updated_at', 'deleted_at'],
    editedIndex: -1,
    isEditing: false,
    defaultItem: {},
    editedItem: {}
  }),
  methods: {
    async initialize() {
      this.editedIndex = this.$route.params.id
      this.defaultItem = this.model.defaultItem
      this.editedItem = this.model.editedItem
      if (this.$route.params.id > 0) {
        this.isEditing = true
        this.editedItem = await this.fetchData()
      }
    },
    async fetchData() {
      let response = await this.$axios.get(`${this.model.route}/${this.$route.params.id}`)
        .then((response) => (response))
        .catch((err) => {
          return {status: 400}
        })

      if (response.status === 400 || response.status !== 200) {
        await this.$router.push(`${this.model.route}`)
      }
      return response.data.item
    },
    async storeData() {
      return await this.$axios.post(`${this.model.route}`, this.editedItem)
        .then((response) => (response.data))
        .catch((err) => {
          console.log(err)
          return null
        })
    },
    async updateData() {
      return await this.$axios.put(`${this.model.route}/${this.$route.params.id}`, this.editedItem)
        .then((response) => (response.data))
        .catch((err) => {
          console.log(err)
          return null
        })
    },
    async saveData() {
      if (this.$route.params.id < 0) {
        try {
          let data = await this.storeData()
          await this.$router.push(`${this.model.route}/${data.id}`)
        } catch (err) {
          coonsole.log(err)
        }
      }
      if (this.$route.params.id > 0) {
        await this.updateData()
      }
    },
    async deleteData() {
      let status = await this.$axios.delete(`${this.model.route}/${this.$route.params.id}`)
        .then((response) => (response.status))
        .catch((err) => {
          console.log(err)
          return 400
        })

      if (status === 204) {
        this.toogleDelete(),
        await this.$router.push(`${this.model.route}`)
      }

    },
    toogleDelete() {
      this.dialogDelete = !this.dialogDelete
    }
  },
  computed: {},
  created() {
    this.initialize()
  },
  mounted() {
    this.initialize()
  }
}
</script>

<style scoped>

</style>
