import createElement from './lib/createElement.mjs';
import formatDateTime from './lib/formatDateTime.mjs';
import createButton from './lib/createButton.mjs';
import editDocument from './editDocument.mjs';

export default function printPreview(title, text, date, loggedInContainer) {
  loggedInContainer.innerHTML = '';
  const { formattedDate, formattedTime } = formatDateTime(date);

  const editBtn = createButton('Edit trail', 'edit_doc_btn', () => {
    const documentId = localStorage.getItem('document');
    editDocument(documentId, loggedInContainer);
  });

  const previewHeader = createElement('h2', 'preview_header');
  previewHeader.innerText = 'Preview';

  const previewContainer = createElement('div', 'preview_container');

  const docDate = createElement('span', 'doc_created_preview');
  docDate.innerText = `Created: ${formattedTime} ${formattedDate}`;

  const docTitle = createElement('h3', 'doc_title_preview');
  docTitle.innerText = title;
  const docText = createElement('div', 'doc_text_preview');
  docText.innerHTML = text;

  previewContainer.append(docDate, docTitle, docText);
  loggedInContainer.append(previewHeader, previewContainer, editBtn);
}
