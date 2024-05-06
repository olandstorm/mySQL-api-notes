import createPopup from './lib/createPopup.mjs';

export default function updateDocument(documentId, title, text) {
  return fetch(`http://localhost:3000/docs/${documentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ docTitle: title, docText: text }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === 'Document updated successfully') {
        createPopup('Trail was saved successfully!');
      }
      return data;
    })

    .catch((error) => {
      console.error('Error updating doc:', error);
    });
}
