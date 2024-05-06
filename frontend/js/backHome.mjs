import removeTiny from './lib/removeTiny.mjs';
import printLoggedInPage from './printLoggedInPage.mjs';

export default function backHome() {
  const documentId = localStorage.getItem('document');
  removeTiny();

  if (!documentId) {
    printLoggedInPage();
  } else {
    localStorage.removeItem('document');
    printLoggedInPage();
  }
}
