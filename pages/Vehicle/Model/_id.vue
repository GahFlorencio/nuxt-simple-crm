<template>
  <v-container>
    <v-card-text>
      <h1>Modelo de Veiculos</h1>
      </v-card-text>
    <StandardForm
      :model="model"
    />
  </v-container>

</template>

<script>
import VehicleModelsModel from "@/Models/VehicleModelsModel";
import StandardForm from "@/components/Forms/StandardForm";
export default {
  name: "ModelPage",
  components: {StandardForm},
  data: () => ({
    model: VehicleModelsModel,
  })
}
</script>

<style scoped>

</style>
