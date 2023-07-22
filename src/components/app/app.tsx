import React, { useEffect, useState } from 'react';
import { NoteProps } from '../note/note';

const App = () => {
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [originalNote, setOriginalNote] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const noteParam = params.get('note');
    const urlParam = params.get('url');

    const note = noteParam ? decodeURIComponent(noteParam) : '';
    const url = urlParam ? decodeURIComponent(urlParam) : '';

    setOriginalNote(note);
    setUrl(url);
  }, []);

  const submitFormHandler = (event:any) => {
    event.preventDefault();
    const note = {
      anchor: originalNote,
      uri: url,
      text: additionalNotes
    };

    chrome.storage.sync.get('notes', saveNote(note, noteSavedCallback));
  };

  const noteSavedCallback = () => {
    console.log('Note saved');
    chrome.tabs.getCurrent().then((tab) => {
        if (tab === undefined) {
            return;
        }
        const id = tab.id;

        if (id === undefined) {
            return;
        }

        chrome.tabs.remove(id);
    });
  };

  const saveNote = (note:NoteProps, callback:any) => (data:any) => {
    if (data === undefined || data.notes === undefined) {
      data = {
        notes: []
      }
    }
    data.notes.push(note);
    chrome.storage.sync.set(data, callback);
  };

  return (
    <section>
        <h1>Save Note</h1>
        <p>Original Note: {originalNote}</p>
        <p>URL: {url}</p>
        <form onSubmit={submitFormHandler}>
            <textarea 
                value={additionalNotes} 
                onChange={e => setAdditionalNotes(e.target.value)} 
                rows={4} 
                cols={50} 
                placeholder="Enter additional notes here..."
            />
            <br/>
            <button type="submit">Save</button>
        </form>
    </section>
  );
};

export default App;
