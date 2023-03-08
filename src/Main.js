import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from "react-router-dom";

function Main({notes, isExistingNote, updateNoteContent, onDeleteNote, handleSaveClick}){    
    const [saved, setSaved] = useState(isExistingNote);
    const { id } = useParams();
    const navigate = useNavigate();

    const currentNote = id ? notes.find(note => note.id === id) : notes[0];

    useEffect(() => setSaved(isExistingNote), [isExistingNote])

    const onHandleEditClick = () => {
        setSaved(false);
        navigate(`/notes/${currentNote.id}/edit`)
    }

    const onHandleSaveClick = () => {
        handleSaveClick();
        setSaved(true);
        navigate(`/notes/${currentNote.id}`);
    }

    const onEditField = (key, value) => {
        updateNoteContent({
            ...currentNote,
            [key]: value,
        })
    };


    function changeBackground(e){
        e.target.style.background = 'rgb(71, 57, 84)';
    }

    function changeBackgroundBack(e){
        e.target.style.background = 'white';
    }

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    
    const formatDate = (when) => {
        const formatted = new Date(when).toLocaleString("en-US", options);
        if (formatted === "Invalid Date") {
            return "";
        }
        return formatted;
    };


    if (!currentNote) return (<p className="emptyPage">Select a note, or create a new one.</p>)
    return(
        <div className="Main">

            <div className="title">
                <div className="titleDate">
                    <textarea className="title" id="title" disabled={saved} placeholder="Untitled" value={currentNote.title} onChange={(e) => onEditField("title",e.target.value)}/>
                    <input type="datetime-local"/>
                </div>
                <div className="saveDelete">
                    <button className="save" onClick={saved ? onHandleEditClick : onHandleSaveClick} onMouseEnter={changeBackground} onMouseLeave={changeBackgroundBack}>{saved ? "Edit": "Save"}</button>
                    <button className="delete" onClick={() => onDeleteNote(currentNote.id)} onMouseEnter={changeBackground} onMouseLeave={changeBackgroundBack}>Delete</button>
                </div>
            </div>
            <ReactQuill theme="snow" value={currentNote.body} onChange={(text) => {
                if(text !== "<p><br></p>") // band-aid
                    onEditField("body", text)
            }} readOnly={saved}/>
                    
            
        </div>
    )
}

export default Main;



        