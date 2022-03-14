<template>
  <v-autocomplete
    :label="label"
    v-model="model"
    :item-text="this.text"
    :item-value="this.value"
    :loading="loading"
    :items="items"
    :search-input.sync="search"
    cache-items
    flat
    hide-no-data
    hide-details
    solo-inverted
    @change=" (value) =>changeModel(value)"
  ></v-autocomplete>
</template>

<script>
export default {
  props: [
    'label',
    'handleModel',
    'belongsModel',
    'reference',
    'resource',
    'text',
    'value'
  ],
  name: "BelongsTo",
  data() {
    return {
      loading: false,
      items: [],
      search: null,
      model: null,
    }
  },
  watch: {
    search(val = "") {
      this.querySelections(val)
    },
    belongsModel(val) {
      if (val !== null) {
        this.model = val
      }
    }
  },
  async created() {
    await this.querySelections("")

  },
  async mounted() {
    await this.querySelections("")
  },
  updated() {
    if (this.model === null) {
      this.model = this.belongsModel
    }
  },
  methods: {
    async changeModel(value) {
      await this.handleModel(this.reference, value)
    },
    async querySelections(value) {
      this.loading = true
      await this.$axios.get(`${this.resource}?no-limit=true&search=${value}`)
        .then((response) => {
          this.items = response.data.paginate.data
          this.loading = false
        })
        .catch((err) => {
          this.items = []
          this.loading = false
        })
    },
  },
}
</script>

<style scoped>

</style>
