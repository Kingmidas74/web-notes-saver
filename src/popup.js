const mapNoteToListItem = (note) => {
    const li = document.createElement('li');
    li.classList.add('note');

    const originalNote = document.createElement('p');
    originalNote.textContent = "Original Note: " + note.originalNote;

    const url = document.createElement('a');
    url.setAttribute('href', note.url);
    url.setAttribute('target', '_blank');
    url.textContent = note.url;

    const additionalNotes = document.createElement('p');
    additionalNotes.textContent = "Additional Notes: " + note.additionalNotes;

    li.appendChild(originalNote);
    li.appendChild(url);
    li.appendChild(additionalNotes);
    return li;
}

const showNotes = (data) => {
    if (data?.notes === undefined) {
        return;
    }
    
    const notesList = document.getElementById('notes-list');
    data.notes.map(mapNoteToListItem).forEach((li) => {
        notesList.appendChild(li);
    });
}

chrome.storage.sync.get('notes', showNotes);