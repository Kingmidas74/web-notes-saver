import React from 'react';
import Note, { NoteProps } from '../note/note';

import './note-list.css';

interface NoteListProps {
  notes: NoteProps[];
}

const NoteList: React.FC<NoteListProps & { onLinkClick: (uri: string) => void }> = ({ notes, onLinkClick }) => {
  return (
    <ul className='note-list'>
      {notes.map((note, index) => (
        <Note {...note} onLinkClick={onLinkClick} key={index} />
      ))}
    </ul>
  );
}

export default NoteList;
