import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { toDoSchema } from '../utilities/validationSchema'
import axios from 'axios'

export default function TaskForm(props) {
    const [categories, setCategories] = useState([])

    

    useEffect(() => {
        axios.get(`http://todoapi.devchristopherrandall.com/api/Categories`).then((response) => {
            setCategories(response.data)
        })
    }, [])

    const handleSubmit = (values) => {
        console.log(values)
        if (!props.task) {
            // If there is no resource prop, we are in create mode in this scope
            // First we assemble the temp object of our new Resource
            const taskToCreate = values

            // Second, we pass the resource to our API in an axios.post() request
            axios.post(`http://todoapi.devchristopherrandall.com/api/ToDos`, taskToCreate).then(() => {
                props.setShowCreate(false) // Close the create form in Resources.js
                props.getTasks() // Update Resources tiles in Resources.js
            }).catch((error) => {
                if( error.response ){
                    console.log(error.response.data); // => the response payload 
                }
            })
        } else {
            // If there is a resource prop, we are in edit mode in this scope
            // First, assemble the temp object for edited resource
            console.log(props.task.toDoId)
            const taskToEdit = {
                toDoId: props.task.toDoId,
                name: values.name,
                done: props.task.done,
                categoryId: values.categoryId
            }
            // Second, we make the PUT request using Axios and passing in our resourceToEdit
            axios.put(`http://todoapi.devchristopherrandall.com/api/toDos/${props.task.toDoId}`, taskToEdit).then(() => {
                // Closes the Edit window after submit
                props.setShowEdit(false)
                // Refreshes the Resources to show edits
                props.getTasks()
            })
        }
    }

    return (
        <Formik
            validationSchema={toDoSchema}
            initialValues={{
                // "The JSON value could not be converted to System.Boolean.
                name: props.task ? props.task.name : '',
                done: props.task ? props.task.done : false,
                categoryId: props.task ? props.task.categoryId : ''
            }}
            onSubmit={(values) => handleSubmit(values)}
        >
            {/* syntax note: start with the below structure and add your form to the empty parens
                            {({errors,touched}) => ()}            */}
            {({ errors, touched }) => (
                <Form id='taskForm'>
                    <div className='form-group m-3'>
                        <Field name='name' placeholder='name' className='form-control' />
                        {errors.name && touched.name && <div className='text-danger'>{errors.name}</div>}
                    </div>

                    <div className='form-group m-3'>
                        <Field as='select' name='categoryId' className='form-control'>
                            {/* This first option tag acts as a placeholder for out select list */}
                            <option value='' disabled>
                                [=== Please choose ===]
                            </option>
                            {/* Below we will map an option for each category in the API */}
                            {categories.map((cat) => (
                                <option key={cat.catergoryId} value={cat.catergoryId}>
                                    {cat.catName}
                                </option>
                            ))}
                        </Field>
                    </div>

                    <div className='form-group m-3'>
                        <button type='submit' className='btn btn-success m-3'>
                            Submit Task
                        </button>
                    </div>

                </Form>
            )}
        </Formik>
    )
}
