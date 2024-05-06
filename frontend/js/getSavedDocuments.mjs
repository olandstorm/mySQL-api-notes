import printSavedDocuments from './printSavedDocuments.mjs';

export default function getSavedDocuments(loggedInContainer) {
  const userId = localStorage.getItem('user');

  fetch(`http://localhost:3000/docs/${userId}`)
    .then((res) => res.json())
    .then((documents) => {
      if (documents.length === 0) {
        return;
      }
      printSavedDocuments(documents, loggedInContainer);
    });
}
