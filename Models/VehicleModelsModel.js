import vehicleBrandModel from "@/Models/VehicleBrandModel";
import VehicleBrandModel from "@/Models/VehicleBrandModel";

export default {
  route: "/vehicle/model",
  index: "/vehicle/models",
  form: [
    {
      type: String, column: 'id', text: '#', required: false, relation: false, edit: false, create: false, list: true
    },
    {
      type: String,
      column: 'description',
      text: 'Descrição',
      required: true,
      relation: false,
      edit: true,
      create: true,
      list: true
    },
    {
      type: String,
      column: 'display',
      text: 'Modelo',
      required: false,
      relation: false,
      edit: false,
      create: false,
      list: false
    },
    {
      type: 'relation',
      column: 'brand',
      text: 'Marca',
      resource: `${VehicleBrandModel.index}`,
      relationType: 'belongs-to',
      reference: 'brand_code',
      display: 'display',
      value: 'code',
      required: false,
      relation: false,
      edit: true,
      create: true,
      list: true
    },
    {
      type: String,
      column: 'brand_code',
      text: 'Código da Marca',
      required: false,
      relation: false,
      edit: false,
      create: false,
      list: false
    }, {
      type: Date,
      column: 'created_at',
      text: 'Criado',
      required: false,
      relation: false,
      edit: true,
      create: false,
      list: true
    }, {
      type: Date,
      column: 'updated_at',
      text: 'Atualizado',
      required: false,
      relation: false,
      edit: true,
      create: false,
      list: true
    },], defaultItem: {
    description: '', brand: '',
  }, editedItem: {
     description: '', brand: '',
  }
}
