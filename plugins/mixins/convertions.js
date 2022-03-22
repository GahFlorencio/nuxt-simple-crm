import Vue from 'vue'

const mixin = {
  methods: {
    formatHeaders(form) {
      let convertedHeaders = []
      form.map((field)=> {
        if (field.list === true){
          convertedHeaders.push({ text: field.text, value:field.column })
        }
      })
      convertedHeaders.push({ text: 'Ações', value: 'actions', sortable: false })
      return convertedHeaders

    }, formatRows(rows, form) {
      console.log(form)
      let formatedRows = []
      rows.map((row) => {
        let newRow = {};

        Object.keys(row).map((column) => {

          newRow[column] = row[column]
          console.log(column)
          const settings = form.find( field =>field.column === column)
          console.log(settings)
          if(settings.type === Date && row[column] !== null){
            newRow[column] = new Date(row[column]).toLocaleString()
          }

          if(settings.type === 'relation' && settings.relationType === 'belongs-to'){
            newRow[column] = row[column][settings.display]
          }

        })

        formatedRows.push(newRow)

      })

      return formatedRows;
    }, convertColumn(dateColumns, column, value) {
      if (dateColumns.includes(column)) {
        return new Date(value).toLocaleString()
      }
      return value
    }, translateColumn(translate, column) {
      if (translate[column]) {
        return translate[column]
      }
      return column.toUpperCase()
    }
  }
}
Vue.mixin(mixin)
