import React from 'react';
import Note, { NoteProps } from '../note/note';

interface NoteListProps {
  notes: NoteProps[];
}

const NoteList: React.FC<NoteListProps & { onLinkClick: (uri: string) => void }> = ({ notes, onLinkClick }) => {
  return (
    <ul className='note-list'>
      {notes.map((note, index) => (
        <li className='note-list-item' key={index}>
          <Note {...note} onLinkClick={onLinkClick} />
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
