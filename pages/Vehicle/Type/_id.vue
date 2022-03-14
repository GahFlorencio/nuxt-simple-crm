<template>
  <v-container>
    <v-card-text>
      <h1>Tipo de Veiculos</h1>
      </v-card-text>
    <StandardForm
      :model="model"
    />
  </v-container>

</template>

<script>
import vehicleTypeModel from "@/Models/VehicleTypeModel";
import StandardForm from "@/components/Forms/StandardForm";
export default {
  name: "StatePage",
  components: {StandardForm},
  data: () => ({
    model: vehicleTypeModel,
  })
}
</script>

<style scoped>

</style>
