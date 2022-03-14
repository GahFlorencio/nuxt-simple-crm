<template>
  <v-container>
    <v-card-text>
      <h1>Marca de Veiculos</h1>
      </v-card-text>
    <StandardForm
      :model="model"
    />
  </v-container>

</template>

<script>
import VehicleBrandModel from "@/Models/VehicleBrandModel";
import StandardForm from "@/components/Forms/StandardForm";
export default {
  name: "BrandPage",
  components: {StandardForm},
  data: () => ({
    model: VehicleBrandModel,
  })
}
</script>

<style scoped>

</style>
