<template>
  <v-container>
    <v-card-text>
      <h1>Cliente</h1>
      </v-card-text>
    <StandardForm
      :model="model"
    />
  </v-container>

</template>

<script>
import CustomerModel from "@/Models/CustomerModel";
import StandardForm from "@/components/Forms/StandardForm";
export default {
  name: "ModelPage",
  components: {StandardForm},
  data: () => ({
    model: CustomerModel,
  })
}
</script>

<style scoped>

</style>
