import {useState, useEffect} from "react";
import Aside from "./Aside";
import Main from "./Main";
import uuid from "react-uuid";
import { useNavigate, useParams } from "react-router-dom";


function App() {
  const getNotesFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("notes"));
  }

  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(false);
  const navigate = useNavigate();

  const isExistingNote = (getNotesFromLocalStorage() || notes).some((note) => note.id === currentNote);

  useEffect(() => {
    const storedNotes = getNotesFromLocalStorage();
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  useEffect(() => {
    if(notes.length > 0)
      setCurrentNote(notes[0].id)
  }, [notes.length])

  const handleSaveClick = () => {
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  function onAddNote(){

    const newNote={
      id: uuid(),
      title: "Untitled",
      body: "",
      lastModified: Date.now()
      
    };

    setNotes([newNote, ...notes]);
    navigate(`/notes/${newNote.id}`)
  };
  
  function onDeleteNote(idDelete){
    const answer = window.confirm("Are you sure?");
        if (answer) { 
          setNotes((prevNotes) => {
            const newNotes = prevNotes.filter((note) => note.id !== idDelete );
            localStorage.setItem("notes", JSON.stringify(newNotes));
            navigate(newNotes.length ? `/notes/${newNotes[0].id}` : "/notes");
            return newNotes;
          })
        }
  }

  function getCurrentNote(){
    return notes.find((note) => note.id === currentNote);
  }


  function updateNoteContent(updatedNote) {
    const updatedNotes = notes.map((note) => {
      if (note.id === currentNote) {
        return updatedNote;
        
      }
      return note;
    });
    setNotes(updatedNotes);
  }

  function changeBackground(e){
    e.target.style.background = 'rgb(71, 57, 84)';
  }

  function changeBackgroundBack(e){
    e.target.style.background = 'white';
  }

  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    
    <div>

      <h1>Lotion</h1>
      <div className="header">
      
        <p className="menu" onClick={toggleMenu} onMouseEnter={changeBackground} onMouseLeave={changeBackgroundBack}>&#9776;</p>
        <p className="header">Like Notion, but worse.</p>
      </div>

      <div style={{ display: "flex" }}>
        {isMenuOpen && (
        <Aside notes={notes} onAddNote={onAddNote} currentNote={currentNote} setCurrentNote={setCurrentNote} />
        )}
        <Main notes={notes} isExistingNote={isExistingNote} updateNoteContent={updateNoteContent} onDeleteNote={onDeleteNote} handleSaveClick={handleSaveClick}/>
      </div>
    
    </div>
  );
}


export default App;

