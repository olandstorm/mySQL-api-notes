import printLoggedInPage from './printLoggedInPage.mjs';
import createPopup from './lib/createPopup.mjs';

export default function loginUser(email, password) {
  fetch('http://localhost:3000/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.user) {
        localStorage.setItem('user', data.user);
        printLoggedInPage();
      } else {
        createPopup(data.message);
      }
    });
}
