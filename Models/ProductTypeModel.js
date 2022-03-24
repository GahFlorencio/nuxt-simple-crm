export default {
  route: "/product/type",
  index: "/product/types",
  form: [{
    type: String, column: 'id', text: '#', required: false, relation: false, edit: false, create: false, list: true
  }, {
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
    },
    {
      type: Date,
      column: 'deleted_at',
      text: 'Deletado',
      required: false,
      relation: false,
      edit: false,
      create: false,
      list: false
    }], defaultItem: {
    code: '', description: '',
  }, editedItem: {
    code: '', description: '',
  }
}
