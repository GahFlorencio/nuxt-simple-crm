<template>
  <v-container>
    <v-card-text>
      <h1>Estado</h1>
      </v-card-text>
    <StandardForm
      :model="model"
    />
  </v-container>

</template>

<script>
import stateModel from "@/Models/StateModel";
import StandardForm from "@/components/Forms/StandardForm";
export default {
  name: "StatePage",
  components: {StandardForm},
  data: () => ({
    model: stateModel,
  })
}
</script>

<style scoped>

</style>
