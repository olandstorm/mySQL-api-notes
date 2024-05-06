import deleteDocument from './deleteDocument.mjs';
import editDocument from './editDocument.mjs';
import previewDocument from './previewDocument.mjs';
import createButton from './lib/createButton.mjs';
import createElement from './lib/createElement.mjs';
import stripHTML from './lib/stripHTML.mjs';
import createPopup from './lib/createPopup.mjs';

export default function printSavedDocuments(documents, loggedInContainer) {
  const savedDocsContainer = createElement('div', 'saved_docs_container');
  const savedDocsHeader = createElement('h3', 'saved_docs_header');
  savedDocsHeader.innerText = 'Or continue a trail you already started';
  const savedDocsList = createElement('ul', 'saved_docs_list');

  documents.forEach((document) => {
    const savedDocCard = createElement('li', 'saved_doc_card');
    const savedDocTitle = createElement('h4', 'saved_doc_title');
    const savedDocShortText = createElement('span', 'saved_doc_text');
    const noHTMLText = stripHTML(document.docTextShort) + '...';

    savedDocShortText.innerText = noHTMLText;
    savedDocTitle.innerText = document.docTitle;

    const buttonContainer = createElement('div', 'btn_container');

    const editBtn = createButton('Edit', 'edit_btn', () => {
      editDocument(document.UUID, loggedInContainer);
      localStorage.setItem('document', document.UUID);
      window.scrollTo(0, 0);
    });
    const previewBtn = createButton('Preview', 'preview_btn', () => {
      previewDocument(document.UUID, loggedInContainer);
      localStorage.setItem('document', document.UUID);
      window.scrollTo(0, 0);
    });

    buttonContainer.append(editBtn, previewBtn);

    const deleteBtn = createButton('', 'delete_btn', () => {
      createPopup(
        'Are you sure you want to delete this trail?',
        'Delete',
        'popup_delete_btn',
        () => {
          deleteDocument(document.UUID);
          savedDocsList.removeChild(savedDocCard);
        }
      );
    });
    const deleteIcon = createElement('span', 'material-symbols-outlined');
    deleteIcon.innerText = 'delete';

    deleteBtn.appendChild(deleteIcon);

    savedDocCard.append(
      savedDocTitle,
      savedDocShortText,
      buttonContainer,
      deleteBtn
    );
    savedDocsList.appendChild(savedDocCard);
  });

  savedDocsContainer.append(savedDocsHeader, savedDocsList);
  loggedInContainer.appendChild(savedDocsContainer);
}
