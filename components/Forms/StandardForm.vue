<template>
  <v-container>
    <v-row v-for="column in model.form" :key="column.column">
      <v-col
        cols="12"
        v-if="(isEditing && column.edit) || (isEditing  === false &&  column.create === true)"
      >
        <v-text-field
          v-if="column.type === String && column.hasOwnProperty('mask')"
          v-mask="`${column.mask}`"
          :maxlength="`${column.max}`"
          v-model="editedItem[column.column]"
          :label="column.text"
          required
        ></v-text-field>
        <v-text-field
          v-if="column.type === String && !column.hasOwnProperty('mask')"
          v-model="editedItem[column.column]"
          :label="column.text"
          required
        ></v-text-field>
        <v-text-field
          v-if="column.type === Date && editedItem[column.column] !== null"
          v-model="new Date(editedItem[column.column]).toLocaleString()"
          :label="column.text"
          disabled
          :readonly="blockedFields.includes(column.column)"
        ></v-text-field>
        <belongs-to
          :label="column.text"
          v-if="column.type === 'relation' && column.relationType === 'belongs-to'"
          :belongs-model="editedItem[column.reference]"
          :handle-model = handleModel
          :resource = "column.resource"
          :reference="column.reference"
          :text="column.display"
          :value="column.value"
        />
      </v-col>
    </v-row>
    <v-row class="">
      <v-btn
        color="primary darken-2"
        dark
        class="ma-2"
        @click="cancel"
      >
        Voltar
        <v-icon>
          mdi-arrow-left
        </v-icon>
      </v-btn>
      <v-btn

        color="green darken-2"
        dark
        class="ma-2"
        @click="saveData"
      >
        {{ this.$route.params.id > 0 ? 'Atualizar' : 'Salvar' }}
        <v-icon>
          mdi-content-save-check
        </v-icon>
      </v-btn>
      <v-btn
        v-if="this.$route.params.id > 0"
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
      <v-snackbar
        :timeout="this.snackbarTime"
        :value="this.snackbar"
        bottom
        absolute
        :color="this.snackbarStyle"
        outlined
        right
      >
        <v-card-text v-html="snackbarText"></v-card-text>
      </v-snackbar>
    </v-row>
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

  </v-container>


</template>

<script>
import BelongsTo from "@/components/Inputs/BelongsTo";
import {mask} from 'vue-the-mask'

export default {
  components: {BelongsTo},
  directives: {mask},
  props: {

      model: {
        type: Object,
        default: null,
      }
    },
  name: "StandardForm",
  data: () => ({
    dialogDelete: false,
    blockedFields: ['created_at', 'updated_at', 'deleted_at'],
    editedIndex: 0,
    isEditing: false,
    defaultItem: {},
    editedItem: {},
    snackbar: false,
    snackbarText: "",
    snackbarStyle: "primary",
    snackbarSuccess: "success",
    snackbarDelete: "red darken-1",
    snackbarTime: 2000,
  }),
  methods: {
    async initialize() {
        this.editedIndex = this.$route.params.id
        this.defaultItem =this.model.defaultItem
        this.editedItem = this.model.defaultItem
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
      const valid = this.validateForm();
      if (!valid) {
        return null
      }
      return await this.$axios.post(`${this.model.route}`, this.editedItem)
        .then((response) => {
          this.toogleSnackbar( "Salvo com sucesso !", this.snackbarSuccess)
          this.editedItem = this.model.defaultItem
          setTimeout(() => {
            this.$router.push(`${this.model.route}/${response.data.id}`)
          },1000)
          return response
        })
        .catch((err) => {
          this.toogleSnackbar( `ERROR ! <br> ${err}`, this.snackbarDelete)
          return null
        })
    },
    validateForm(){
      let errorMessage = ""
      Object.entries(this.model.form).map((column)=>{
        if (column[1].required && this.editedItem[column[1].column] === "") {
          errorMessage += `O campo ${column[1].text} é obrigatório <br>`
        }
      })
      if (errorMessage !== "") {
        this.toogleSnackbar( `ERROR ! <br> ${errorMessage}`, this.snackbarDelete)
        return false;
      }
      return true
    },
    async updateData() {
      const valid = this.validateForm();
      if (!valid) {
        return null
      }
      return await this.$axios.put(`${this.model.route}/${this.$route.params.id}`, this.editedItem)
        .then((response) => {
          this.toogleSnackbar( "Atualizado com sucesso !", this.snackbarSuccess)
          return response
        })
        .catch((err) => {
          this.toogleSnackbar( `ERRO ! <br> ${err}`, this.snackbarSuccess)
          return null
        })
    },
    async saveData() {

      if (this.$route.params.id == 0) {
         await this.storeData()
      }
      if (this.$route.params.id != 0) {
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
        this.toogleDelete()
        this.toogleSnackbar( "Deletado com sucesso !", this.snackbarDelete)
        this.editedItem = this.model.defaultItem
        setTimeout(() => {
          this.$router.push(`${this.model.route}`)
        },1000)
      }

    },
    cancel(){
      this.editedItem = this.model.defaultItem
      this.$router.push(`${this.model.route}`)
    },
    async fetchRelation(resource) {
      return await this.$axios.get(resource)
        .then((response) => (response.data))
        .catch((err) => {
          console.log(err)
          return null
        })
    },
    toogleDelete() {
      this.dialogDelete = !this.dialogDelete
    },
    toogleSnackbar(text, color) {
      this.snackbarText = text
      this.snackbarStyle = color
      this.snackbarTime = 2000
      this.snackbar = true
      setTimeout(() => {this.snackbarTime = -1
        this.snackbar = false}, 2000);

    },
    handleModel(reference, value){
      this.editedItem[reference] =  value
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
}
</script>

<style scoped>

</style>
