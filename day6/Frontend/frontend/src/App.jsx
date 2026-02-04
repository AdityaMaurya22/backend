import { useState } from 'react'
import reactLogo from './assets/react.svg'
import '/src/app.css'
import axios from 'axios'

function App() {

  let [notes, setNotes]= useState([{
    title: "Test Note 1",
    description: "This is the description for test note 1"
  },
  {
    title: "Test Note 2",
    description: "This is the description for test note 2"
  },
  {
    title: "Test Note 3",
    description: "This is the description for test note 3"
  }, {
    title: "Test Note 4",
    description: "This is the description for test note 4"
  }])

  axios.get('http://localhost:3000/notes')
  .then((res)=>{
    setNotes(res.data.notes)
  })

  return (
    <>
      <div className="notes">
        {
          notes.map((n) => {
            return (
              <div className="note">
                <h1>{n.title}</h1>
                <p>{n.description}</p>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default App
