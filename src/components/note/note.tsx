import React from 'react';
import './note.css';

export interface NoteProps {
    anchor: string;
    text: string;
    uri: string;
}

const Note: React.FC<NoteProps & { onLinkClick: (uri: string) => void }> = ({ anchor, text, uri, onLinkClick }) => {
  return (
      <li className="note-list-item">
        <h2>{anchor}</h2>
        <p>{text}</p>
        <a href={uri} onClick={(e) => {
            e.preventDefault(); 
            onLinkClick(uri);
        }}>Link</a>
      </li>
    );
  }

export default Note;
