export default function createButton(text, className, onClick) {
  const button = document.createElement('button');
  button.innerText = text;
  button.classList.add(className);
  button.addEventListener('click', onClick);
  return button;
}
