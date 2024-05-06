import createButton from './lib/createButton.mjs';
import createElement from './lib/createElement.mjs';
import createNewDocument from './createNewDocument.mjs';
import logoutUser from './logoutUser.mjs';
import getUserName from './lib/getUserName.mjs';
import getSavedDocuments from './getSavedDocuments.mjs';
import backHome from './backHome.mjs';

const mainContainer = document.querySelector('#mainContainer');

export default async function printLoggedInPage() {
  mainContainer.innerHTML = '';

  const logoImg = createElement('img', 'logo_img');
  logoImg.src = 'assets/img/logo_black.webp';
  logoImg.alt = 'PaperTrail logo in black';

  const logoutBtn = createButton('Logout', 'logout_btn', logoutUser);

  const backHomeBtn = createButton('Back home', 'back_home_btn', backHome);

  const menuButtonsContainer = createElement('div', 'menu_btns_container');
  menuButtonsContainer.append(backHomeBtn, logoutBtn);

  const stickyTest = createElement('div', 'sticky');
  stickyTest.appendChild(menuButtonsContainer);

  const loggedInContainer = createElement('div', 'logged_in_container');
  loggedInContainer.id = 'loggedInContainer';

  try {
    const userName = await getUserName();
    const loginHeader = createElement('h2', 'login_header');
    loginHeader.innerText = `Welcome ${userName}!`;

    loggedInContainer.appendChild(loginHeader);
  } catch (error) {
    console.error('Error getting user name:', error);
    const loginHeader = createElement('h2', 'login_header');
    loginHeader.innerText = `Welcome!`;

    loggedInContainer.appendChild(loginHeader);
  }

  const newDocBtn = createButton('Create a new trail', 'new_doc_btn', () => {
    createNewDocument(loggedInContainer);
  });

  getSavedDocuments(loggedInContainer);

  loggedInContainer.append(newDocBtn);
  mainContainer.append(stickyTest, logoImg, loggedInContainer);
}
