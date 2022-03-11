export default {
  form: [
    'city',
    'city_number',
    'name',
    'code',
    'state',
  ],
  realtions:[
    {
      column: 'state',
      foreng: 'state_code',
      display: 'abbr',
      id: 'code'
    }
  ],
  defaultItem: {
    name: '',
    city_number: '',
    code: '',
    state: '',
  },
  editedItem: {
    name: '',
    city_number: '',
    code: '',
    state: '',
  },

  hidden:[
    'state_code'
  ],
  translate:{
    city: 'Cidade',
    city_number: 'Numero',
    name:'Nome',
    code:'Codigo',
    created_at:'Criado',
    updated_at:'Atualizado',
    deleted_at: 'Deletado',
    state: 'Estado'
  },
  dateColumns:[
    'created_at',
    'updated_at',
    'deleted_at'
  ],
}
