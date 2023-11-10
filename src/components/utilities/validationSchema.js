import * as Yup from 'yup'

const catSchema = Yup.object().shape({
  catName: Yup.string().max(25, 'Max 25 characters').required('Required'),
  catDesc: Yup.string().max('100', 'Max 100 characters')
})

const toDoSchema = Yup.object().shape({
  name: Yup.string().max(100, 'Max 100 characters').required('Name is required'),
  done: Yup.bool().required('Status is required'),
  categoryId: Yup.number().required('Please select a Category!')
})

export { catSchema, toDoSchema }