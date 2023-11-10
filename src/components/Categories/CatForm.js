import React from 'react'
import { Formik, Form, Field } from 'formik'
import { catSchema } from '../utilities/validationSchema'
import axios from 'axios'

export default function CatForm(props) {

  const handleSubmit = (values) => {
    console.log(values)
  }

  return (
    <div className='createCategory m-2 text-whit text-center'>
      <Formik
        validationSchema={catSchema}
        initialValues={
          {
            catName: props.category ? props.category.catName : '',
            catDescription: props.category ? props.category.catDescription : ''
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
              <Field name='catDescription' className="form-control" placeholder="Description" />
              {errors.catDescription && touched.catDescription &&
                <div classDescription='text-danger'>{errors.catDescription}</div>
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
