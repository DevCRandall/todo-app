import React, { useState } from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'
import CatEdit from './CatEdit'

export default function SingleCategory(props) {
    const { catName, catDesc, catergoryId } = props.category

    const { currentUser } = useAuth()

    const [showEdit, setShowEdit] = useState(false)

    const [showTasks, setShowTasks] = useState(false)

    const deleteCat = (id) => {
        if (window.confirm(`Are you sure you want to delete ${props.catName}?`)) {
            axios.delete(`http://todoapi.devchristopherrandall.com/api/Categories/${id}`).then(() => {
                props.getCategories()
            })
        }
    }

    return (
        <div className='singleCategory col-md-5 m-4'>
            {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL && (
                <div>
                    <button onClick={() => setShowEdit(true)} className='m-1 rounded' id='editLink'>
                        <FaEdit />
                    </button>

                    <button onClick={() => deleteCat(catergoryId)} className='m-1 rounded' id='deleteLink'>
                        <FaTrashAlt />
                    </button>

                    {showEdit && (
                        <CatEdit
                            setShowEdit={setShowEdit}
                            showEdit={showEdit}
                            getCategories={props.getCategories}
                            category={props.category}
                        />
                    )}
                </div>
            )}
            {!showTasks ?
                <>
                    <h3>{catName}</h3>
                    {catDesc !== null ? <p>{catDesc}</p> : <p>No description provided</p>}
                    <button className='btn btn-color' id='taskLink' onClick={() => setShowTasks(true)}>
                        Show Tasks
                    </button>
                </>
                : 
                <>
                    <h3>{catName}</h3>
                    {catDesc !== null ? <p>{catDesc}</p> : <p>No description provided</p>}
                    <p>
                        {props.name}
                    </p>
                    <button className='btn btn-color' id='taskLink' onClick={() => setShowTasks(false)}>
                        Hide Tasks
                    </button>
                </>
            }
        </div>
    )
}
