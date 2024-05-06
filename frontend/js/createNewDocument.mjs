import createButton from './lib/createButton.mjs';
import createElement from './lib/createElement.mjs';
import createInput from './lib/createInput.mjs';
import intitTiny from './lib/initTiny.mjs';
import saveNewDocument from './saveNewDocument.mjs';
import updateDocument from './updateDocument.mjs';
import printLoggedInPage from './printLoggedInPage.mjs';
import deleteDocument from './deleteDocument.mjs';
import saveAndPreview from './saveAndPreview.mjs';
import createPopup from './lib/createPopup.mjs';
import removeTiny from './lib/removeTiny.mjs';

export default function createNewDocument(loggedInContainer) {
  loggedInContainer.innerHTML = '';
  localStorage.removeItem('document');

  const newDocHeader = createElement('h2', 'new_doc_header');
  newDocHeader.innerText = 'New trail';

  const newDocContainer = createElement('div', 'new_doc_container');

  const newDocTitleLabel = createElement('label', 'doc_title_label');
  const newDocTitleText = createElement('span', 'doc_title_text');
  newDocTitleText.innerText = 'Trail title:';
  const newDocTitleInput = createInput('text', 'Title');
  newDocTitleInput.id = 'newDocTitleInput';

  const newDocTextField = createElement('textarea', 'doc_text_field');
  newDocTextField.id = 'docTextField';

  const saveBtn = createButton('Save', 'save_doc_btn', () => {
    const text = document.querySelector('#docTextField').value;
    const title = document.querySelector('#newDocTitleInput').value;
    const documentId = localStorage.getItem('document');

    if (!text || !title) {
      createPopup('You need a title and text to save your trail!');
      return;
    }

    if (!documentId) {
      saveNewDocument(title, text);
    } else {
      updateDocument(documentId, title, text);
    }
  });

  const savePreviewBtn = createButton(
    'Save and preview',
    'save_preview_doc_btn',
    () => {
      const text = document.querySelector('#docTextField').value;
      const title = document.querySelector('#newDocTitleInput').value;
      saveAndPreview(title, text);
    }
  );

  const deleteBtn = createButton('Delete', 'delete_doc_btn', () => {
    const documentId = localStorage.getItem('document');

    if (!documentId) {
      removeTiny();
      printLoggedInPage();
    } else {
      createPopup(
        'Are you sure you want to delete this trail?',
        'Delete',
        'popup_delete_btn',
        () => {
          removeTiny();
          deleteDocument(documentId);
          localStorage.removeItem('document');
          printLoggedInPage();
        }
      );
    }
  });

  newDocTitleLabel.append(newDocTitleText, newDocTitleInput);
  newDocContainer.append(
    newDocTitleLabel,
    newDocTextField,
    saveBtn,
    savePreviewBtn,
    deleteBtn
  );
  loggedInContainer.append(newDocHeader, newDocContainer);

  intitTiny();
}
