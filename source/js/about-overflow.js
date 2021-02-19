'use strict';

(function () {
  const MAX_TEXT_LENGTH = 371;
  const textElements = document.querySelectorAll(`.about__wrapper p`);
  const smallScreen = window.matchMedia(`(max-width: 1024px)`);
  let textElementToCut = null;
  let uncuttedText = null;
  let previousTextLength = 0;

  if (!textElements) {
    return;
  }

  for (const textElement of textElements) {
    if (textElement.textContent.length >= MAX_TEXT_LENGTH - previousTextLength) {
      textElementToCut = textElement;
      uncuttedText = textElement.textContent;
    } else {
      previousTextLength += textElement.textContent.length;
    }
  }

  const showCuttedText = () => {
    if (textElementToCut) {
      const textToCut = textElementToCut.textContent;
      const cuttedText = textToCut.slice(0, textToCut.lastIndexOf(` `, MAX_TEXT_LENGTH - previousTextLength));
      textElementToCut.textContent = cuttedText + `..`;
    }
  };

  const showFullText = () => {
    if (textElementToCut) {
      textElementToCut.textContent = uncuttedText;
    }
  };

  if (smallScreen.matches) {
    showCuttedText();
  }

  smallScreen.addEventListener(`change`, () => {
    if (smallScreen.matches) {
      showCuttedText();
    } else {
      showFullText();
    }
  });
})();
