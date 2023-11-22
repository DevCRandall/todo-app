import React, { useState } from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'
import CatEdit from './CatEdit'

export default function SingleCategory(props) {
    const { catName, catDesc, catergoryId } = props.category

    const { currentUser } = useAuth()

    const [showEdit, setShowEdit] = useState(false)

    const deleteCat = (id) => {
        if (window.confirm(`Are you sure you want to delete ${props.catName}?`)) {
            axios.delete(`http://todoapi.devchristopherrandall.com/api/Categories/${id}`).then(() => {
                props.getCategories()
            })
        }
    }

    return (
        <div className='singleCategory bg-dark col-md-5 m-4'>
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
            <div>
                <h3>{catName}</h3>
                <div className='Catcard'>
                {catDesc !== null ? <p>{catDesc}</p> : <p>No description provided</p>}
                </div>
            </div>
        </div>
    )
}
