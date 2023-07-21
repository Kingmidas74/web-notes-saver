import React from 'react';
import './note.css';

export interface NoteProps {
    anchor: string;
    text: string;
    uri: string;
}

const Note: React.FC<NoteProps & { onLinkClick: (uri: string) => void }> = ({ anchor, text, uri, onLinkClick }) => {
  return (
      <div className="note">
        <h1>{anchor}</h1>
        <p>{text}</p>
        <a href={uri} onClick={(e) => {
            e.preventDefault(); 
            onLinkClick(uri);
        }}>Link</a>
      </div>
    );
  }

export default Note;
