import CityModel from "@/Models/CityModel";
import CustomerVehicleModel from "@/Models/CustomerVehicleModel";

export default {
  route: "/customer/customer",
  index: "/customer/customers",
  form: [
    {
      type: String, column: 'id', text: '#', required: false, relation: false, edit: false, create: false, list: true
    },
    {
      type: String,
      column: 'name',
      text: 'Nome',
      required: true,
      relation: false,
      edit: true,
      create: true,
      list: true
    },
    {
      type: String,
      column: 'phone_number',
      mask:['(##) #####-####'],
      max:11,
      text: 'Celular',
      required: true,
      relation: false,
      edit: true,
      create: true,
      list: true
    },
    {
      type: String,
      column: 'document_number',
      text: 'CPF/CNPJ',
      required: true,
      relation: false,
      edit: true,
      create: true,
      list: true
    },
    {
      type: String,
      column: 'address',
      text: 'Endereço',
      required: true,
      relation: false,
      edit: true,
      create: true,
      list: true
    },
    {
      type: String,
      column: 'address_number',
      text: 'Num.',
      required: true,
      relation: false,
      edit: true,
      create: true,
      list: true
    },
    {
      type: String,
      column: 'address_complement',
      text: 'Complemento',
      required: false,
      relation: false,
      edit: true,
      create: true,
      list: true
    },
    {
      type: 'relation',
      column: 'city',
      text: 'Cidade',
      resource: `${CityModel.index}`,
      relationType: 'belongs-to',
      reference: 'city_id',
      display: 'city_display',
      value: 'id',
      required: false,
      relation: false,
      edit: true,
      create: true,
      list: true
    },
    {
      type: String,
      column: 'city_id',
      text: 'Código da Cidade',
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
    },
    {
      type: Date,
      column: 'deleted_at',
      text: 'Deletado',
      required: false,
      relation: false,
      edit: true,
      create: false,
      list: true
    },], defaultItem: {
    name: '',
    phone_number: '',
    document_number: '',
    address: '',
    address_number: '',
    address_complement: '',
    city_id: '',
    city: ''
  }, editedItem: {
    name: '',
    phone_number: '',
    document_number: '',
    address: '',
    address_number: '',
    address_complement: '',
    city_id: '',
    city: ''
  },hasMany: [
    {
      display: 'Veiculos',
      owner_key: 'id',
      child_key: 'customer_id',
      index:'/customer/vehicles/customer',
      resource: CustomerVehicleModel
    }
  ]
}
