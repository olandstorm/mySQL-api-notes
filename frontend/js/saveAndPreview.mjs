import saveNewDocument from './saveNewDocument.mjs';
import updateDocument from './updateDocument.mjs';
import previewDocument from './previewDocument.mjs';
import createPopup from './lib/createPopup.mjs';
import removeTiny from './lib/removeTiny.mjs';

export default function saveAndPreview(title, text) {
  let documentId = localStorage.getItem('document');
  const loggedInContainer = document.querySelector('#loggedInContainer');

  if (!text || !title) {
    createPopup('You need a title and text to save your trail!');
    return;
  }

  removeTiny();

  if (!documentId) {
    saveNewDocument(title, text).then((data) => {
      documentId = data.docId;
      previewDocument(documentId, loggedInContainer);
    });
  } else {
    updateDocument(documentId, title, text).then(() => {
      previewDocument(documentId, loggedInContainer);
    });
  }
}
