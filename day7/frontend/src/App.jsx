import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

const App = () => {

  const [data, setData] = useState([])

  function dbCall() {
    axios.get('http://localhost:3000/api/data')
      .then((res) => {
        setData(res.data.data)
      })
  }

  function formHandler(e) {
    e.preventDefault()

    const { title, description } = e.target.elements
    console.log(title.value, description.value)

    axios.post('http://localhost:3000/api/data', {
      title: title.value,
      description: description.value
    })
      .then(res => {
        console.log(res.data);
        dbCall()
      })
  }

  function deleteData(dataid){
    axios.delete(`http://localhost:3000/api/data/${dataid}`)
    .then(res=>{
      console.log(res.data);
      dbCall()
    })
  }

  useEffect(() => {
    dbCall()
  }, [])

  return (
    <div>
      <div className="container">
        <form onSubmit={formHandler}>
          <input type="text" placeholder='Enter Title' name="title" />
          <input type="text" placeholder='Enter Description' name="description" />
          <button>Submit</button>
        </form>

        <div className="data-card">
          {/* <div className="data">
            <h2>Title</h2>
            <p>Description</p>
            <button>Delete</button>
          </div> */}

          {
            data.map((d) => {
              return (
                <div className="data">
                  <h2>{d.title}</h2>
                  <p>{d.description}</p>
                  <button onClick={()=>{deleteData(d._id)}}>Delete</button>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default App
