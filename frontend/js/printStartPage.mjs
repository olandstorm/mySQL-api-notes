import createButton from './lib/createButton.mjs';
import createElement from './lib/createElement.mjs';
import createInput from './lib/createInput.mjs';
import newUserForm from './newUserForm.mjs';
import loginUser from './loginUser.mjs';

const mainContainer = document.querySelector('#mainContainer');

export default function printStartPage() {
  mainContainer.innerHTML = '';

  const startPage = createElement('div', 'start_container');

  const startLogo = createElement('img', 'start_logo');
  startLogo.src = 'assets/img/logo_white.webp';
  startLogo.alt = 'PaperTrail logo in white';

  const loginContainer = createElement('div', 'login_container');

  const startHeader = createElement('h1', 'start_header');
  startHeader.innerText = 'Ready to create your path?';

  const emailLabel = createElement('label', 'email_label');
  emailLabel.classList.add('login_label');
  const emailInputText = createElement('span', 'email_input_text');
  emailInputText.innerText = 'Email:';
  const emailInput = createInput('email', 'Email');

  const passwordLabel = createElement('label', 'password_label');
  passwordLabel.classList.add('login_label');
  const passwordInputText = createElement('span', 'password_input_text');
  passwordInputText.innerText = 'Password:';
  const passwordInput = createInput('password', 'Password');

  const loginBtn = createButton('Login', 'login_btn', () => {
    const password = passwordInput.value;
    const email = emailInput.value;
    loginUser(email, password);
  });

  const newUserBtn = createButton('Create a new user', 'new_user_btn', () => {
    newUserForm(loginContainer);
  });
  newUserBtn.classList.add('no_border_btn');

  emailLabel.append(emailInputText, emailInput);
  passwordLabel.append(passwordInputText, passwordInput);
  loginContainer.append(emailLabel, passwordLabel, loginBtn, newUserBtn);
  startPage.append(startLogo, startHeader, loginContainer);
  mainContainer.appendChild(startPage);
}
