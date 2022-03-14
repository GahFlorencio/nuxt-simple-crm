export default {
  route: "/location/state",
  index:"/location/states",
  form: [
    {
      type: String,
      column: 'id',
      text: '#',
      required: false,
      relation: false,
      edit: false,
      create: false,
      list: true
    },{
    type: String,
    column: 'name',
    text: 'Nome',
    required: true,
    relation: false,
    edit: true,
    create: true,
    list: true
  }, {
    type: String,
    column: 'code',
    text: 'Código',
    required: true,
    relation: false,
    edit: true,
    create: true,
    list: true
  }, {
    type: String,
    column: 'abbr',
    text: 'Abrev',
    required: true,
    relation: false,
    edit: true,
    create: true,
    list: true
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
  },], relations: [], defaultItem: {
    name: '', code: '', abbr: ''
  }, editedItem: {
    name: '', code: '', abbr: ''
  }
}
