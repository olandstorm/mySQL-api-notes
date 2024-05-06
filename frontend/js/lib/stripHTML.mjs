export default function stripHTML(html) {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = html;
  return tempElement.textContent || tempElement.innerText || '';
}
