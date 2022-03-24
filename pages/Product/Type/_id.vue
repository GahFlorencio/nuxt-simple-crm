<template>
  <v-container>
    <v-card-text>
      <h1>Tipo de Produto</h1>
      </v-card-text>
    <StandardForm
      :model="model"
    />
  </v-container>

</template>

<script>
import productTypeModel from "@/Models/ProductTypeModel";
import StandardForm from "@/components/Forms/StandardForm";
export default {
  name: "StatePage",
  components: {StandardForm},
  data: () => ({
    model: productTypeModel,
  })
}
</script>

<style scoped>

</style>
