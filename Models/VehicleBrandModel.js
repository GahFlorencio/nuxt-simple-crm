import VehicleTypeModel from "@/Models/VehicleTypeModel";

export default {
  route: "/vehicle/brand",
  index: "/vehicle/brands",
  form: [
    {
      type: String, column: 'id', text: '#', required: false, relation: false, edit: false, create: false, list: true
    }, {
      type: String,
      column: 'code',
      text: 'Código',
      required: true,
      relation: false,
      edit: true,
      create: true,
      list: true
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
      type: 'relation',
      column: 'type',
      text: 'Tipo',
      resource: `${VehicleTypeModel.index}`,
      relationType: 'belongs-to',
      reference: 'type_code',
      display: 'description',
      value: 'code',
      required: false,
      relation: false,
      edit: true,
      create: true,
      list: true
    },
    {
      type: String,
      column: 'display',
      text: 'Display',
      required: false,
      relation: false,
      edit: false,
      create: false,
      list: false
    },
    {
      type: String,
      column: 'type_code',
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
    code: '', description: '', type: '',
  }, editedItem: {
    code: '', description: '', type: '',
  }
}
