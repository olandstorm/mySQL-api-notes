import createButton from './lib/createButton.mjs';
import createElement from './lib/createElement.mjs';
import createInput from './lib/createInput.mjs';
import printStartPage from './printStartPage.mjs';
import saveNewUser from './saveNewUser.mjs';

export default function newUserForm(loginContainer) {
  loginContainer.innerHTML = '';

  const newUserHeader = createElement('h2', 'new_user_header');
  newUserHeader.innerText = 'Create a new user';

  const newNameLabel = createElement('label', 'new_name_label');
  newNameLabel.classList.add('login_label');
  const newNameInputText = createElement('span', 'new_name_input_text');
  newNameInputText.innerText = 'Name:';
  const newNameInput = createInput('text', 'Name');

  const newEmailLabel = createElement('label', 'new_email_label');
  newEmailLabel.classList.add('login_label');
  const newEmailInputText = createElement('span', 'new_email_input_text');
  newEmailInputText.innerText = 'Email:';
  const newEmailInput = createInput('email', 'Email');

  const newPasswordLabel = createElement('label', 'new_password_label');
  newPasswordLabel.classList.add('login_label');
  const newPasswordInputText = createElement('span', 'new_password_input_text');
  newPasswordInputText.innerText = 'Password:';
  const newPasswordInput = createInput('password', 'Password');

  const createUserBtn = createButton(
    'Create and login',
    'create_user_btn',
    () => {
      saveNewUser(newNameInput, newEmailInput, newPasswordInput);
    }
  );
  createUserBtn.classList.add('login_btn');

  const backLoginBtn = createButton(
    'Back to login',
    'back_login_btn',
    printStartPage
  );
  backLoginBtn.classList.add('no_border_btn');

  newNameLabel.append(newNameInputText, newNameInput);
  newEmailLabel.append(newEmailInputText, newEmailInput);
  newPasswordLabel.append(newPasswordInputText, newPasswordInput);
  loginContainer.append(
    newUserHeader,
    newNameLabel,
    newEmailLabel,
    newPasswordLabel,
    createUserBtn,
    backLoginBtn
  );
}
