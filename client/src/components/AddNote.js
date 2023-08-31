import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';


const AddNote = (props) => {
  const context = useContext(NoteContext)
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag)
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("success","Added successfully")
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (<>
    <div className="container">
      <h2>Add a Note</h2>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" name="title"value={note.title}  onChange={onChange} minLength={5} required />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Tag</label>
        <input type="text" className="form-control" value={note.tag} id="tag" name="tag" onChange={onChange} />
      </div>
      <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-success" onClick={handleClick}>Add Note</button>
    </div>
  </>
  )
}

export default AddNote;
