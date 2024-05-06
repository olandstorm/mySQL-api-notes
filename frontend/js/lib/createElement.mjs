export default function createElement(element, className) {
  const newElement = document.createElement(element);
  newElement.classList.add(className);
  return newElement;
}
