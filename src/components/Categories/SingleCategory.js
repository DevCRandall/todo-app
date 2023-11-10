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
        <tr>
            <td>{catName}</td>
            <td>{catDesc}</td>
            {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL && (
                <td>
                    <button onClick={() => setShowEdit(true)} className='m-1 rounded' id='editLink'>
                        <FaEdit />
                    </button>
                    <button onClick={() => deleteCat(catergoryId)} className='m-1 rounded' id='deleteLink'>
                        <FaTrashAlt />
                    </button>
                    {/* Below we conditionally render CatEdit when showEdit is true */}
                    {showEdit && (
                        <CatEdit
                            setShowEdit={setShowEdit}
                            showEdit={showEdit}
                            getCategories={props.getCategories}
                            category={props.category}
                        />
                    )}
                </td>
            )}
        </tr>
    )
}
