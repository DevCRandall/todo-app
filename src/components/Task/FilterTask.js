//This component will house a button for each category, as well as an ALL button to remove filtering in Resources.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function FilterTask(props) {
  // We need to access and store the categories from the API to map the buttons
  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios.get(`http://todoapi.devchristopherrandall.com/api/Categories`).then(response => {
      console.log(response)
      setCategories(response.data)
    })
  }, [])

  return (
    <div className='text-center mt-5'>
      <button onClick={() => props.setFilter(0)} className="btn btn-outline-info bg-dark m-1">
        All
      </button>
      {/* Below we map all of the categories to a button that will be used to filter resources on that category */}
      {categories.map(cat => 
        <button key={cat.catergoryId} onClick={() => props.setFilter(+cat.catergoryId)} className="btn btn-outline-info bg-dark m-1">
          {cat.catName}
        </button>  
      )}
    </div>
  )
}