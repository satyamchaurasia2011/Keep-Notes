import React, {useState,useEffect} from 'react'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import M from 'materialize-css';
import Zoom from '@material-ui/core/Zoom';
import DeleteIcon from '@material-ui/icons/Delete';
export default function Home() {
  const [input, setInput] = useState({
    title: "",
    body: ""
  });
  const [notes,setNotes] = useState(null);
  const [expand, setExpand] = useState(false);
   
  useEffect(() =>{
    fetch('/notes', {
      headers : {
        "Authorization" : "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
    .then(result => {
      setNotes(result.notes);
    })
  },[input])

  const handleInput = (event) => {
    const { name, value } = event.target;
    setInput(prevValue => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }
  const createNotes = (input) => {
    fetch('/createnote', {
      method : "post",
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer " + localStorage.getItem("jwt")
     },
     body : JSON.stringify({
       title : input.title,
       body : input.body
     })
    }).then(res => res.json())
    .then(data => {
      if(data.error){
        M.toast({html:data.error, classes:"#d32f2f red darken-2"})
      }
    }).catch(err => {
      console.log(err);
    })
  }
  const deleteItem = (noteId) => {
    fetch(`/deletenote/${noteId}`, {
      method : 'delete',
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer " + localStorage.getItem("jwt")
    }
    }).then(res =>res.json())
    .then(result => {
      const newNotes = notes.filter(note => {
        return note._id !== result._id
      })
      setNotes(newNotes);
    })
  }
    return (
        <div>
      <form className="create-note">
        <input
          type = {!expand&&"hidden"}
          onChange={handleInput}
          name="title"
          placeholder="Title"
          value={input.title}
        />
        <textarea
          onClick = {() => {
             setExpand(true);
          }}
          onChange={handleInput}
          value={input.body}
          name="body"
          placeholder="Take a note..."
          rows={expand ? 3: 1}
        />
        <Zoom in={expand}>
        <Fab
        
          onClick={(event) => {
            createNotes(input);
           
            event.preventDefault();
            setInput(() => {
              return {
                title: "",
                body: ""
              };
            });
          }}
        >
          <AddIcon />
        </Fab>
        </Zoom>
      </form>
         <>
    {
      notes ? 
      notes.map(note => {
        return (
        <div className="note">
        <h1>{note.title}</h1>
        <p>{note.body}</p>
        <button onClick = {() => deleteItem(note._id)}
        ><DeleteIcon /></button>
      </div>
        )
      })
      : "loading..."
    }
  </>
        </div>
    )
}
