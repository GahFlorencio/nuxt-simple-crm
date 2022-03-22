import VehicleModelsModel from "@/Models/VehicleModelsModel";

export default {
  route: "/customer/vehicle",
  index: "/customer/vehicles",
  form: [
    {
      type: String, column: 'id', text: '#', required: false, relation: false, edit: false, create: false, list: true
    },
    {
      type: 'relation',
      column: 'vehicle',
      text: 'Veiculo',
      resource: `${VehicleModelsModel.index}`,
      relationType: 'belongs-to',
      reference: 'vehicle_model_id',
      display: 'display',
      value: 'id',
      required: true,
      relation: false,
      edit: true,
      create: true,
      list: true
    },
    {
      type: String,
      column: 'plate',
      text: 'Placa',
      required: true,
      relation: false,
      edit: true,
      create: true,
      list: true
    },
    {
      type: String,
      column: 'description',
      text: 'Observação (Opcional)',
      required: false,
      relation: false,
      edit: true,
      create: true,
      list: true
    },
    {
      type: String,
      column: 'customer_id',
      text: 'Código da Cliente',
      required: false,
      relation: false,
      edit: false,
      create: false,
      list: false
    },
    {
      type: String,
      column: 'vehicle_model_id',
      text: 'Veiculo',
      required: true,
      relation: false,
      edit: false,
      create: false,
      list: false
    },{
      type: Date,
      column: 'created_at',
      text: 'Criado',
      required: false,
      relation: false,
      edit: true,
      create: false,
      list: false
    }, {
      type: Date,
      column: 'updated_at',
      text: 'Atualizado',
      required: false,
      relation: false,
      edit: true,
      create: false,
      list: false
    },
    {
      type: Date,
      column: 'deleted_at',
      text: 'Deletado',
      required: false,
      relation: false,
      edit: true,
      create: false,
      list: false
    },]
  ,defaultItem: {
    description: '',
    plate: '',
    customer_id: '',
    vehicle_model_id: '',
  }, editedItem: {
    description: '',
    plate: '',
    customer_id: '',
    vehicle_model_id: '',
  }
}
