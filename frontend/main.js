import './css/style.scss';
import printStartPage from './js/printStartPage.mjs';
import printLoggedInPage from './js/printLoggedInPage.mjs';

// Login state check
if (localStorage.getItem('user')) {
  printLoggedInPage();
} else {
  printStartPage();
}
