import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import axios from 'axios'
import SingleCategory from './SingleCategory';
import { useAuth } from '../../contexts/AuthContext'
import CatCreate from './CatCreate'
import './Categories.css'
import Spinner from '../Spinner/Spinner'

export default function Categories() {

  const [categories, setCategories] = useState([]);

  const { currentUser } = useAuth()

  const [showCreate, setShowCreate] = useState(false)

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [categories]);

  const getCategories = () => {
    axios.get(`http://todoapi.devchristopherrandall.com/api/Categories`).then(response => {
      console.log(response)
      setCategories(response.data)
    })
  }

  useEffect(() => {
    getCategories()
  }, []);

  return (
    <section className="categories">
      <article className="bg text-white p-5">
        <h1 className="text-center">Categories Dashboard</h1>
        {!loaded && <Spinner>LOADING...</Spinner>}
      </article>
      {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
        <div className="p-2 mb-2 text-center">
          {showCreate ? 
            <>
              <button onClick={() => setShowCreate(false)} className="btn btn-warning">
                Cancel
                </button>
                <CatCreate getCategories={getCategories} setShowCreate={setShowCreate} />
            </> :
            <button onClick={() => setShowCreate(true)} className="btn btn-info">
              Add+
            </button>
          }
        </div>
      }
      <Container>
      <article className="categoryGallery row justify-content-center">
          {/* READ UI */}
          {categories.map(c =>
            <SingleCategory key={c.catergoryId} category={c} getCategories= {getCategories} />
          )}
          </article>
    </Container>
    </section>
  )
}
