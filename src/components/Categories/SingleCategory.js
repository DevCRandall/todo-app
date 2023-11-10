import React, { useState } from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'

export default function SingleCategory(props) {

  const { catName, catDesc, catId } = props.category

  const { currentUser } = useAuth()

  const [showEdit, setShowEdit] = useState(false);

  const deleteCat = (id) => {
    if(window.confirm(`Are you sure you want to delete ${props.catName}?`))
  }

  return (
    <tr>
      <td>{catName}</td>
      <td>{catDesc}</td>
    </tr>
  )
}
