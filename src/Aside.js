import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Aside({notes, onAddNote, setCurrentNote}){  


    const { id } = useParams();
    
    const currentNote = id ? notes.find(note => note.id === id) : notes[0];

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    
    function changeBackground(e){
        e.target.style.background = 'rgb(71, 57, 84)';
    }

    function changeBackgroundBack(e){
        e.target.style.background = 'white';
    }
    
    const formatDate = (when) => {
        const formatted = new Date(when).toLocaleString("en-US", options);
        if (formatted === "Invalid Date") {
            return "";
        }
        return formatted;
    };

    return(
    <div className="aside">

        <div className="notes">
          <h2>Notes</h2>
          <p onClick={onAddNote} className="plus" onMouseEnter={changeBackground} onMouseLeave={changeBackgroundBack}><strong>+</strong></p>
          
        </div>

        <div className="sideNotes">
        {notes.length ? notes.map((note) =>(
            <Link to={`/notes/${note.id}`}>
                <div key={note.id} className={`sideNote ${note.id === currentNote.id && "active"}`} onClick={() => setCurrentNote(note.id)}>
                    <p>{note.title}</p>
                    <small className="date">
                        Last modified {formatDate(note.lastModified)}
                    </small>
                    <small dangerouslySetInnerHTML={{ __html: note.body.substr(0, 30) + "..." }} />
                </div>
            </Link>
        )):<p className="noNoteYet">No Note Yet</p>}
            
        </div>
    </div>
    )
}


export default Aside;