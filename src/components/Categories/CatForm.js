import React from 'react'
import { Formik, Form, Field } from 'formik'
import { catSchema } from '../utilities/validationSchema'
import axios from 'axios'

export default function CatForm(props) {

  const handleSubmit = (values) => {
    console.log(values)
    // Create logic, API and update logic later
    if(!props.category) {
      // If there is no prop for category we are in create mode inside this scope.
      // First, we assemble a temp object to send in our request
      const catToCreate = values

      // Second, we send the object in a POST request using axios
      axios.post(`http://todoapi.devchristopherrandall.com/api/Categories`, catToCreate).then(() => {
        props.setShowCreate(false) // This will close the create form automatically.
        props.getCategories() // This will refresh the table with the new Category.
      })
    }else {
      // If there is a prop for Category we are in Edit mode inside this scope
      // First, we assemble our temp object, adding in the categoryId
      const catToEdit = {
        catergoryId: props.category.catergoryId,
        catName: values.catName,
        catDesc: values.catDesc
      }
      axios.put(`http://todoapi.devchristopherrandall.com/api/Categories/${props.category.catergoryId}`, catToEdit ).then(() => {
        props.setShowEdit(false) // This will close the create form automatically.
        props.getCategories() // This will refresh the table with the new Category.
      })
    }
  }

  return (
    <div className='createCategory m-2 text-whit text-center'>
      <Formik
        validationSchema={catSchema}
        initialValues={
          {
            catName: props.category ? props.category.catName : '',
            catDesc: props.category ? props.category.catDesc : ''
          }}
        onSubmit={values => handleSubmit(values)}>

        {({errors, touched}) => (
          <Form>
            <div className="form-group m-1 p-1">
              <Field name='catName' className="form-control" placeholder="Name" />
              {errors.catName && touched.catName &&
                <div className='text-danger'>{errors.catName}</div>
              }
            </div>
            <div className="form-group m-1 p-1">
              <Field name='catDesc' className="form-control" placeholder="Description" />
              {errors.catDesc && touched.catDesc &&
                <div classDescription='text-danger'>{errors.catDesc}</div>
              }
            </div>
            <div className="form-group m-1">
              <button type='submit' className="btn btn-success">
                Submit Category
              </button>
            </div>
          </Form>
        )}

      </Formik>
    </div>
  )
}
