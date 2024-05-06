import printEdit from './printEdit.mjs';

export default function editDocument(documentId, loggedInContainer) {
  const userId = localStorage.getItem('user');
  fetch(`http://localhost:3000/docs/${userId}/${documentId}`)
    .then((res) => res.json())
    .then((data) => {
      const title = data.docTitle;
      const text = data.docText;

      printEdit(title, text, loggedInContainer);
    });
}
