import createButton from './lib/createButton.mjs';
import createElement from './lib/createElement.mjs';
import createInput from './lib/createInput.mjs';
import intitTiny from './lib/initTiny.mjs';
import updateDocument from './updateDocument.mjs';
import printLoggedInPage from './printLoggedInPage.mjs';
import deleteDocument from './deleteDocument.mjs';
import saveAndPreview from './saveAndPreview.mjs';
import createPopup from './lib/createPopup.mjs';
import removeTiny from './lib/removeTiny.mjs';

export default function printEdit(title, text, loggedInContainer) {
  loggedInContainer.innerHTML = '';

  const editDocHeader = createElement('h2', 'edit_doc_header');
  editDocHeader.innerText = 'Edit trail';

  const editDocContainer = createElement('div', 'edit_doc_container');

  const editDocTitleLabel = createElement('label', 'doc_title_label');
  const editDocTitleText = createElement('span', 'doc_title_text');
  editDocTitleText.innerText = 'Trail title:';
  const editDocTitleInput = createInput('text', 'Title');
  editDocTitleInput.id = 'editDocTitleInput';
  editDocTitleInput.value = title;

  const editDocTextField = createElement('textarea', 'doc_text_field');
  editDocTextField.id = 'docTextField';
  editDocTextField.innerHTML = text;

  const saveBtn = createButton('Save', 'save_doc_btn', () => {
    const documentId = localStorage.getItem('document');
    const text = editDocTextField.value;
    const title = editDocTitleInput.value;

    if (!text || !title) {
      createPopup('You need a title and text to save your trail!');
      return;
    }

    updateDocument(documentId, title, text);
  });

  const savePreviewBtn = createButton(
    'Save and preview',
    'save_preview_doc_btn',
    () => {
      const text = editDocTextField.value;
      const title = editDocTitleInput.value;
      removeTiny();
      saveAndPreview(title, text);
    }
  );

  const deleteBtn = createButton('Delete', 'delete_doc_btn', () => {
    const documentId = localStorage.getItem('document');
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
  });

  editDocTitleLabel.append(editDocTitleText, editDocTitleInput);
  editDocContainer.append(
    editDocTitleLabel,
    editDocTextField,
    saveBtn,
    savePreviewBtn,
    deleteBtn
  );
  loggedInContainer.append(editDocHeader, editDocContainer);

  intitTiny();
}
