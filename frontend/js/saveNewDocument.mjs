import createPopup from './lib/createPopup.mjs';

export default function saveNewDocument(title, text) {
  const user = localStorage.getItem('user');

  return fetch('http://localhost:3000/docs/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId: user, docTitle: title, docText: text }),
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem('document', data.docId);
      if (data.message === 'Document saved!') {
        createPopup('Trail was saved successfully!');
      }
      return data;
    });
}
