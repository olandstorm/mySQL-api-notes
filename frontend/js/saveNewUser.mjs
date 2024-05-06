import createPopup from './lib/createPopup.mjs';
import printLoggedInPage from './printLoggedInPage.mjs';

export default function saveNewUser(
  newNameInput,
  newEmailInput,
  newPasswordInput
) {
  const userName = newNameInput.value.trim();
  const userEmail = newEmailInput.value.trim();
  const password = newPasswordInput.value.trim();

  if (!userName || !userEmail || !password) {
    createPopup('Make sure to fill in all fields!');
    return;
  }

  const sendUser = {
    userName: userName,
    userEmail: userEmail,
    password: password,
  };

  fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sendUser),
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem('user', data.user);
      printLoggedInPage();
    });
}
