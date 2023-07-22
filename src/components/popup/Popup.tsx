import React, { useState, useEffect } from 'react';
import NoteList from '../note-list/note-list';
import { NoteProps } from '../note/note';

import './popup.css';

const Popup: React.FC = () => {
  const [notes, setNotes] = useState<NoteProps[]>([]);

  const handleLinkClick = (uri: string) => {
    chrome.tabs.create({url: uri});
  };

  useEffect(() => {
    const showNotes = (data:any) => {
      if (data?.notes === undefined) {
          return;
      }
      
      setNotes(data.notes);
  }
  chrome.storage.sync.get('notes', showNotes);
  }, []);

  return <main className="main">
          <h1 className='main__header'>Notes</h1>
          <NoteList notes={notes} onLinkClick={handleLinkClick} />
         </main>
};

export default Popup;