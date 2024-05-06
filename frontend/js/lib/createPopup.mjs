import createButton from './createButton.mjs';
import createElement from './createElement.mjs';
import closePopup from './closePopup.mjs';

const mainContainer = document.querySelector('#mainContainer');

export default function createPopup(text, btn, btnClass, btnClick) {
  const popupBackground = createElement('div', 'popup_background');
  const popup = createElement('div', 'popup_container');
  const popupText = createElement('span', 'popup_text');
  popupText.innerText = text;

  popup.appendChild(popupText);

  if (btn && btnClass && btnClick) {
    const popupBtn = createButton(btn, btnClass, () => {
      btnClick();
      closePopup(popupBackground);
    });
    popup.appendChild(popupBtn);
  }

  const closePopupBtn = createButton('Close', 'close_popup_btn', () => {
    closePopup(popupBackground);
  });

  popup.appendChild(closePopupBtn);
  popupBackground.appendChild(popup);
  mainContainer.appendChild(popupBackground);

  return popupBackground;
}
