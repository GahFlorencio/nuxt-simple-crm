import StateModel from "@/Models/StateModel";
export default {
  route:"/location/city",
  index:"/location/cities",
  form: [{
    type: String, column: 'id', text: '#', required: false, relation: false, edit: false, create: false, list: true
  }, {
    type: String, column: 'name', text: 'Nome', required: true, relation: false, edit: true, create: true, list: true
  }, {
    type: String, column: 'code', text: 'Código', required: true, relation: false, edit: true, create: true, list: true
  }, {
    type: String,
    column: 'city_number',
    text: 'Codigo IBGE',
    required: true,
    relation: false,
    edit: true,
    create: true,
    list: true
  },
    {
      type: 'relation',
      column: 'state',
      text: 'Estado',
      resource: `${StateModel.index}`,
      relationType: 'belongs-to',
      reference: 'state_code',
      display: 'abbr',
      value: 'code',
      required: false,
      relation: false,
      edit: true,
      create: true,
      list: true
    },
    {
    type: String,
    column: 'state_code',
    text: 'Codigo Estado',
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
  },], relations: [{
    column: 'state', foreng: 'state_code', display: 'abbr', id: 'code'
  }], defaultItem: {
    name: '', city_number: '', code: '', state: '',
  }, editedItem: {
    name: '', city_number: '', code: '', state: '',
  }
}
