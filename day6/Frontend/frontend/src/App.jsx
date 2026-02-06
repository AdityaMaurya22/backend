import { useState, useEffect, use } from 'react'
import '/src/App.css'
import axios from 'axios'

function App() {

  let [notes, setNotes] = useState([])

  function dbcall() {
    axios.get('http://localhost:3000/notes')
      .then((res) => {
        setNotes(res.data.notes)
      })
  }

  function formHandler(e) {
    e.preventDefault()

    const {title, description} = e.target.elements
    console.log(title.value, description.value)

    axios.post('http://localhost:3000/notes',{
      title: title.value,
      description: description.value
    })
    .then(res=>{
      console.log(res.data);

      dbcall()
    })
  }

  function deleteNote(noteid){
    axios.delete(`http://localhost:3000/notes/${noteid}`)
    .then(res=>{
      console.log(res.data);
      dbcall()
    })
  }

  useEffect(() => {
    dbcall()
  }, [])


  return (
    <>

      <form className="note-create-form" onSubmit={formHandler}>
        <input type="text" placeholder='Enter Title' name='title'/>
        <input type="text" placeholder='Enter Description' name="description" />
        <button>Submit</button>
      </form>
      <div className="notes">
        {
          notes.map((n) => {
            return (
              <div className="note">
                <h1>{n.title}</h1>
                <p>{n.description}</p>
                <button onClick={()=>{deleteNote(n._id)}}>Delete</button>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default App
