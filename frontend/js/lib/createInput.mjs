export default function createInput(type, placeholder) {
  const input = document.createElement('input');
  input.classList.add(`${type}_input`);
  input.type = type;
  input.placeholder = placeholder;
  return input;
}
