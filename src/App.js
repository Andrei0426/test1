import React, { useState } from 'react';
import './App.css';

const initialNotes = [  { id: 1, title: 'Title 1', body: 'This is the first content of the note.' },  { id: 2, title: 'Title 2', body: 'This is the second content of the note.' },  { id: 3, title: 'Title 3', body: 'This is the third content of the note.' },];

const App = () => {
  const [notes, setNotes] = useState(initialNotes);
  const [currentNote, setCurrentNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSubmit = (event, note) => {
    event.preventDefault();
    if(!note || !note.body || !note.title) {
      alert("Please fill the form!")
      return
    }
    if (!note.id) {
      // New note
      note.id = Date.now();
      setNotes([...notes, note]);
    } else {
      // Edit note
      const index = notes.findIndex((n) => n.id === note.id);
      const updatedNotes = [...notes];
      updatedNotes[index] = note;
      setNotes(updatedNotes);
    }
    setCurrentNote(null);
  };

  const handleDelete = (note) => {
    const updatedNotes = notes.filter((n) => n.id !== note.id);
    setNotes(updatedNotes);
    setCurrentNote(null);
  };

  const handleSort = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedNotes = filteredNotes.sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;
    return order * a.title.localeCompare(b.title);
  });

  return (
    <div className="app">
      <h1>My Notes</h1>
      <form onSubmit={(event) => handleSubmit(event, currentNote)}>
        <input
          className="note-input"
          type="text"
          placeholder="Title"
          value={currentNote?.title || ''}
          onChange={(event) =>
            setCurrentNote({ ...currentNote, title: event.target.value })
          }
        />
        <textarea
          className="note-input"
          placeholder="Body"
          value={currentNote?.body || ''}
          onChange={(event) =>
            setCurrentNote({ ...currentNote, body: event.target.value })
          }
        ></textarea>
        <button className="note-btn" type="submit">
          {currentNote ? 'Update Note' : 'Add Note'}
        </button>
        {currentNote && (
          <button className="note-btn" onClick={() => setCurrentNote(null)}>
            Cancel
          </button>
        )}
      </form>
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <select className="sort-select" value={sortOrder} onChange={handleSort}>
          <option value="asc">Sort A-Z</option>
          <option value="desc">Sort Z-A</option>
        </select>
      </div>
      <ul className="notes-list">
        {sortedNotes.map((note) => (
          <li key={note.id} className="note-item">
            <h3 className="note-title" onClick={() => setCurrentNote(note)}>
            {note.title}
            </h3>
            <p className="note-preview" onClick={() => setCurrentNote(note)}>
              {note.body.substring(0, 50)}
              {note.body.length > 50 && '...'}
            </p>
            <button className="note-delete-btn" onClick={() => handleDelete(note)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

