import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";
const App = () => {
  const [notes, setNotes] = useState([{
    id: nanoid(),
    text: "This is my first note!",
    date:"01/07/2023"
  },
    {
      id: nanoid(),
      text: "This is my second note!",
      date:"02/07/2023"
    },
    {
      id: nanoid(),
      text: "This is my third note!",
      date:"03/07/2023"
    },
    {
      id: nanoid(),
      text: "This is my new note!",
      date:"04/07/2023"
    },
  ]);
  const [searchText, setSearchText] = useState('');
  const [darkMode, setDarkMode] = useState('false');

  useEffect(() => {
     const saveNotes = JSON.parse(
         localStorage.getItem('react-notes-app-data')
     );
     if(saveNotes){
         setNotes(saveNotes);
     }
  },[]);
  useEffect(() => {
     localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
  }, [notes])
const addNote = (text) => {
  const date = new Date();
  const newNote = {
    id: nanoid(),
    text: text,
    date: date.toLocaleString(),
  }
  const newNotes = [...notes, newNote];
  setNotes(newNotes);
};
const deleteNote = (id) => {
     const newNotes = notes.filter((note) => note.id !== id);
     setNotes(newNotes);
}

    return(
      <div className={`${darkMode && 'dark-mode'}`}>
          <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
            notes={notes.filter((note) => note.text.toLowerCase().includes(searchText))}
            handleAddNote={addNote}
            handleDeleteNote={deleteNote}
        />
      </div>
      </div>
      );
}
export default App;