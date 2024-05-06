export default function deleteDocument(docId) {
  fetch('http://localhost:3000/docs/delete/' + docId, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}
