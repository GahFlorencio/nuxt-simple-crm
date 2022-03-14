<template>
  <v-container>
    <v-card-text>
      <h1>Cidade</h1>
      </v-card-text>
    <StandardForm
      :model="model"
    />
  </v-container>

</template>

<script>
import cityModel from "@/Models/CityModel";
import StandardForm from "@/components/Forms/StandardForm";
export default {
  name: "CityPage",
  components: {StandardForm},
  data: () => ({
    model: cityModel,
  })
}
</script>

<style scoped>

</style>
