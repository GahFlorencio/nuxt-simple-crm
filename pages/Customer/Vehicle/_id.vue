<template>
  <v-container>
    <v-card-text>
      <h1>Veiculos</h1>
      </v-card-text>
    <StandardForm
      :model="model"
    />
  </v-container>

</template>

<script>
import CustomerVehicleModel from "@/Models/CustomerVehicleModel";
import StandardForm from "@/components/Forms/StandardForm";
export default {
  name: "ModelPage",
  components: {StandardForm},
  data: () => ({
    model: CustomerVehicleModel,
  })
}
</script>

<style scoped>

</style>
