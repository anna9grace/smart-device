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

'use strict';

(function () {
  const accordionElements = document.querySelectorAll(`.page-footer__navigation, .page-footer__contacts`);
  const mobileScreen = window.matchMedia(`(max-width: 767px)`);

  if (!accordionElements) {
    return;
  }

  const turnOnAccordion = () => {
    for (const accordionElement of accordionElements) {
      accordionElement.classList.add(`accordion`);
      accordionElement.classList.add(`accordion--closed`);
    }
  };

  const turnOffAccordion = () => {
    for (const accordionElement of accordionElements) {
      accordionElement.classList.remove(`accordion`);
      accordionElement.classList.remove(`accordion--closed`);
    }
  };

  const onMenuToggle = (accordionElement) => {
    if (mobileScreen.matches) {
      const isClosed = accordionElement.classList.contains(`accordion--closed`);
      for (const element of accordionElements) {
        element.classList.add(`accordion--closed`);
      }
      if (isClosed) {
        accordionElement.classList.remove(`accordion--closed`);
      }
    }
  };

  if (mobileScreen.matches) {
    turnOnAccordion();
  }

  for (const accordionElement of accordionElements) {
    accordionElement.querySelector(`h3`).addEventListener(`click`, onMenuToggle.bind(null, accordionElement));
  }

  mobileScreen.addEventListener(`change`, () => {
    if (mobileScreen.matches) {
      turnOnAccordion();
    } else {
      turnOffAccordion();
    }
  });
})();
