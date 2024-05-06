import removeTiny from './lib/removeTiny.mjs';
import printStartPage from './printStartPage.mjs';

export default function logoutUser() {
  localStorage.clear();
  removeTiny();
  printStartPage();
}
