import React, { useState, useEffect } from 'react';
import NoteList from '../note-list/note-list';
import { NoteProps } from '../note/note';

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

  return <NoteList notes={notes} onLinkClick={handleLinkClick} />;
};

export default Popup;