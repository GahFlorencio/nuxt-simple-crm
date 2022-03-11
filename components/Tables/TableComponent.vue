<template>
  <v-container>
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
          <v-toolbar-title>{{ title }}</v-toolbar-title>
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
            @click="editItem()"
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
                      <v-text-field
                        v-if="columns.edit"
                        v-model="editedItem[columns.column]"
                        :label="columns.text"
                        readonly
                      ></v-text-field>
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
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
    <v-pagination
      v-model="pagination.current"
      :length="pagination.total"
      @input="fetchFunction"
    ></v-pagination>
  </v-container>
</template>


<script>
export default {
  props: {
    title: {
      type: String, default: ""
    },
    loading: {
      type: Boolean, default: false
    },
    headers: {
      type: Array, default: () => {
        return []
      }
    },
    rows: {
      type: Array, default: () => {
        return []
      }
    },
    pagination: {
      type: Object,
      default: () => {
        return {}
      }
    },
    fetchFunction: {
      type: Function,
      default: () => {
        return () => {
        }
      }
    },
    deleteFunction: {
      type: Function,
      default: () => {
        return () => {
        }
      }
    },
    model: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data: () => ({
    dateColumns: [],
    translate: {},
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    hidden: [],
    editedItem: {}
  }),

  computed: {
    formatedHeaders() {
      return this.formatHeaders(this.model.form)
    },
    formatedRows() {
      return this.formatRows(this.rows, this.model.form)
    }
  },

  watch: {
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.editedItem = this.model.editedItem
    },

    editItem(item = null) {
      if (item === null) {
        this.$router.push(`${this.model.route}/-1`)
      }

      this.$router.push(`${this.model.route}/${item.id}`)
    },

    deleteItem(item) {
      this.editedIndex = this.formatedRows.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      try {
        this.loading = true
        await this.deleteFunction(this.editedItem.id)
        await this.fetchFunction()
        await this.closeDelete()
        this.loading = false
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
    }
  },
}
</script>

<style scoped>

</style>
