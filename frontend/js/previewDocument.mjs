import printPreview from './printPreview.mjs';

export default function previewDocument(documentId, loggedInContainer) {
  const userId = localStorage.getItem('user');
  fetch(`http://localhost:3000/docs/${userId}/${documentId}`)
    .then((res) => res.json())
    .then((data) => {
      const title = data.docTitle;
      const text = data.docText;
      const dateCreated = data.docCreated;
      printPreview(title, text, dateCreated, loggedInContainer);
    });
}
