<template>
  <div v-if="show">
    <v-data-table
      :headers="formatedHeaders"
      item-key="id"
      :items="formatedRows"
      :page.sync="pagination.current"
      :items-per-page="15"
      hide-default-footer
      sort-by="id"
      class="elevation-1"
      :loading="loading"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>{{ relation.display }}</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            dark
            class="mb-2"
            @click="editItem(item)"
          >
            Adicionar
            <v-icon>
              mdi-plus
            </v-icon>
          </v-btn>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Deseja deletar esse item ?</v-card-title>
              <v-card-text>
                <v-container>
                  <v-row v-for="columns in model.form" :key="columns.column">
                    <v-col
                      cols="12"
                    >
                      <v-text-field v-if="columns.type === String && columns.list"
                                    v-model="editedItem[columns.column]"
                                    :label="columns.text"
                                    readonly
                      ></v-text-field>
                      <belongs-to
                        :label="columns.text"
                        v-if="columns.type === 'relation' && columns.relationType === 'belongs-to'"
                        :belongs-model="editedItem[columns.reference]"
                        :handle-model = handleModel
                        :resource = "columns.resource"
                        :reference="columns.reference"
                        :text="columns.display"
                        :value="columns.value"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                <v-btn color="red darken-1" text @click="deleteItemConfirm">DELETAR</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogEdit" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">{{ editedIndex === -1 ? 'Cadastrar' : 'Editar' }}</v-card-title>
              <v-card-text>
                <v-container>
                  <v-row v-for="columns in model.form" :key="columns.column">
                    <v-col
                      cols="12"
                    >
                      <v-text-field v-if="columns.type === String && columns.edit"
                                    v-model="editedItem[columns.column]"
                                    :label="columns.text"
                      ></v-text-field>
                      <belongs-to
                        :label="columns.text"
                        v-if="columns.type === 'relation' && columns.relationType === 'belongs-to'"
                        :belongs-model="editedItem[columns.reference]"
                        :handle-model = handleModel
                        :resource = "columns.resource"
                        :reference="columns.reference"
                        :text="columns.display"
                        :value="columns.value"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeEdit">Cancelar</v-btn>
                <v-btn color="green darken-1" text @click="saveData">
                  {{editedIndex === -1 ? 'Cadastrar' : 'Atualizar'}}</v-btn>
                <v-btn color="red darken-1" v-if="editedIndex !== -1" text @click="deleteItemConfirm">Deletar</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          color="blue darken-2"
          @click="editItem(item)"
        >
          mdi-eye
        </v-icon>
        <v-icon
          small
          color="red"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:no-data>
        Nenhum registro encontrado
      </template>
    </v-data-table>
    <v-pagination
      v-model="pagination.current"
      :length="pagination.total"
      @input="fetchFunction"
    ></v-pagination>
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
  </div>
</template>


<script>
import BelongsTo from "@/components/Inputs/BelongsTo";
import {mask} from 'vue-the-mask'
export default {
  components:  {BelongsTo},
  directives: {mask},
  props: {
    relation: {
      type: Object,
      default: () => {
        return {}
      }
    },
    owner_id : {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    show: true,
    dialogDelete:false,
    dialogEdit:false,
    pagination :{current:0},
    editedItem:{},
    editedIndex:-1,
    headers:[],
    loading:false,
    rows:[],
    model:{
      form:[],
    },
    formatedHeaders:[],
    formatedRows:[],
    snackbar:false,
    snackbarText: "",
    snackbarStyle: "primary",
    snackbarSuccess: "success",
    snackbarDelete: "red darken-1",
    snackbarTime: 2000,
  }),

  computed: {


  },

  watch: {
    dialogDelete(val) {
      val || this.closeDelete()
    },
    show(val) {
      this.show = true;
    },
  },

  created() {
    this.initialize()
  },
  mounted() {
    this.initialize()
  },

  methods: {
    async fetchFunction () {
      this.loading = true;
      await this.$axios.get(`${this.relation.index}/${this.owner_id}?page=${this.pagination.current}`)
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
    async storeData() {
      const valid = this.validateForm();
      if (!valid) {
        return null
      }
      return await this.$axios.post(`${this.model.route}`, this.editedItem)
        .then((response) => {
          this.editedItem = this.model.defaultItem
          this.dialogEdit = false
          this.toogleSnackbar( "Salvo com sucesso !", this.snackbarSuccess)
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
      return await this.$axios.put(`${this.model.route}/${this.editedItem.id}`, this.editedItem)
        .then((response) => {
          this.dialogEdit = false
          this.toogleSnackbar( "Atualizado com sucesso !", this.snackbarSuccess)
          return response
        })
        .catch((err) => {
          this.toogleSnackbar( `ERRO ! <br> ${err}`, this.snackbarSuccess)
          return null
        })
    },
    async saveData() {
      let response = {status : 400}

      if (this.editedIndex === -1) {
         response = await this.storeData()
      }
      if (this.editedIndex > -1) {
        response = await this.updateData()
      }

      if(response.status === 200) {
        await this.initialize()
      }

    },
    async deleteFunction(id){
      return await this.$axios.delete(`${this.model.route}/${id}`)
        .then((response) => (response.status))
        .catch((err) => {
          console.log(err)
          return 400
        })
    },
    async initialize() {
      this.$nextTick(async () => {
        this.model = this.relation.resource
        await this.fetchFunction()
        this.formatedHeaders = this.formatHeaders(this.model.form)
        this.formatedRows =  this.formatRows(this.rows, this.model.form)
        this.editedItem = this.model.editedItem
        this.editedIndex = -1
      })
    },

    editItem(item = null) {
      console.log(item === null)
      console.log(this.formatedRows.indexOf(item))
      if(item === null ){
        this.editedIndex = -1;
        this.editedItem = Object.assign({}, this.model.editedItem)
      }
      if(item !== null ){
        this.editedIndex = this.formatedRows.indexOf(item)
        this.editedItem = Object.assign({}, item)
      }

      this.editedItem[this.relation.child_key] = this.$route.params.id
      this.dialogEdit = true
    },

    deleteItem(item) {
      this.editedIndex = this.formatedRows.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    async deleteItemConfirm() {
      try {
        const status = await this.deleteFunction(this.editedItem.id)
        if(status === 204) {
          this.toogleSnackbar( "Deletado com sucesso !", this.snackbarSuccess)
          await this.closeDelete()
          await this.initialize()
        }

      } catch (err) {
        console.log(err)
      }
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeEdit() {
      this.dialogEdit = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    handleModel(reference, value){
      this.editedItem[reference] =  value
    },
    toogleSnackbar(text, color) {
      this.snackbarText = text
      this.snackbarStyle = color
      this.snackbarTime = 2000
      this.snackbar = true
      setTimeout(() => {this.snackbarTime = -1
        this.snackbar = false}, 2000);

    },
  }
}
</script>

<style scoped>

</style>
