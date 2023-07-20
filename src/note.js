


const sumbitFormHandler = (event) => {
    event.preventDefault();
    
    const additionalNotes = document.getElementById('additional-notes').value;
    const note = {
        originalNote: originalNote,
        url: url,
        additionalNotes: additionalNotes
    };

    chrome.storage.sync.get('notes', saveNote(note, noteSavedCallback));
};

const noteSavedCallback = () => {
    console.log('Note saved');
    chrome.tabs.getCurrent().then((tab) => {
        chrome.tabs.remove(tab.id);
    });
};

const saveNote = (note, callback) => (data) => {
    if (data === undefined || data.notes === undefined) {
        data = {
            notes: []
        }
    }
    data.notes.push(note);
    chrome.storage.sync.set(data, callback);
};

const params = new URLSearchParams(window.location.search);
const originalNote = decodeURIComponent(params.get('note'));
const url = decodeURIComponent(params.get('url'));

document.getElementById('original-note').textContent = "Original Note: " + originalNote;
document.getElementById('url').textContent = "URL: " + url;

document.getElementById('note-form').addEventListener('submit', sumbitFormHandler);