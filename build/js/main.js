'use strict';

(function () {
  const MAX_TEXT_LENGTH = 371;
  const textElements = document.querySelectorAll(`.about__wrapper p`);
  const smallScreen = window.matchMedia(`(max-width: 1024px)`);
  let textElementToCut = null;
  let uncuttedText = null;
  let previousTextLength = 0;

  if (textElements.length < 1) {
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
  const accordionTogglers = document.querySelectorAll(`.page-footer__navigation h3, .page-footer__contacts h3`);
  const mobileScreen = window.matchMedia(`(max-width: 767px)`);

  if (accordionElements.length < 1 || accordionTogglers.length < 1) {
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

'use strict';

(function () {
  const page = document.querySelector(`.page`);
  const loginOpenBtn = document.querySelector(`.page-header__modal-btn`);
  const formModal = document.querySelector(`.modal`);
  const closeBtn = formModal.querySelector(`.modal__close-btn`);
  const form = formModal.querySelector(`form`);
  const nameField = form.querySelector(`#modal-name`);
  const phoneField = form.querySelector(`#modal-phone`);
  const questionField = form.querySelector(`#modal-question`);
  const isAllFieldsExist = nameField && phoneField && questionField;
  let storageName = ``;
  let storagePhone = ``;
  let storageQuestion = ``;

  if (!loginOpenBtn || !formModal || !closeBtn || !form) {
    return;
  }
  try {
    storageName = localStorage.getItem(`name`);
    storagePhone = localStorage.getItem(`phone`);
    storageQuestion = localStorage.getItem(`question`);
  } catch (err) {
    throw new Error(err);
  }

  const openModal = () => {
    formModal.classList.remove(`hidden`);
    document.addEventListener(`keydown`, escKeyPressHandler);
    page.classList.add(`page--inactive`);

    if (!isAllFieldsExist) {
      return;
    }
    nameField.focus();

    if (storageName) {
      nameField.value = storageName;
      phoneField.focus();
    }

    if (storagePhone) {
      phoneField.value = storagePhone;
      questionField.focus();
    }

    if (storageQuestion) {
      questionField.value = storageQuestion;
    }
  };

  const closeModal = () => {
    formModal.classList.add(`hidden`);
    page.classList.remove(`page--inactive`);
    document.removeEventListener(`keydown`, escKeyPressHandler);
  };

  const escKeyPressHandler = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      closeModal();
    }
  };

  loginOpenBtn.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    openModal();
  });

  closeBtn.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    closeModal();
  });

  formModal.addEventListener(`click`, (evt) => {
    if (evt.target === formModal) {
      closeModal();
    }
  });

  form.addEventListener(`submit`, () => {
    if (isAllFieldsExist) {
      localStorage.setItem(`name`, nameField.value);
      localStorage.setItem(`phone`, phoneField.value);
      localStorage.setItem(`question`, questionField.value);
    }
  });
})();

'use strict';

(function () {
  const forms = document.querySelectorAll(`.form`);
  const phoneFields = document.querySelectorAll(`#modal-phone, #customer-phone`);
  const PHONE_TEMPLATE_START = `+7(`;
  const PHONE_TEMPLATE_MIDDLE = `)`;
  let isPhoneBeingWritten = false;

  if (phoneFields.length > 0) {
    for (const field of phoneFields) {
      field.addEventListener(`focus`, (evt) => {
        if (!evt.target.value) {
          evt.target.value = PHONE_TEMPLATE_START;
        }
      });

      field.addEventListener(`blur`, (evt) => {
        if (evt.target.value === PHONE_TEMPLATE_START) {
          evt.target.value = ``;
        }
      });

      field.addEventListener(`input`, (evt) => {
        if (evt.target.value.length === 5) {
          isPhoneBeingWritten = true;
        }
        if (evt.target.value.length === 6 && isPhoneBeingWritten) {
          evt.target.value += PHONE_TEMPLATE_MIDDLE;
          isPhoneBeingWritten = false;
        }
      });
    }
  }


  if (forms.length > 0) {
    for (const form of forms) {
      const agreement = form.querySelector(`#modal-data-agreement`) || form.querySelector(`#data-agreement`);

      agreement.addEventListener(`change`, () => {
        agreement.setCustomValidity(
            agreement.checked
              ? ``
              : `Для отправки согласитесь на обработку данных`
        );
      });

      form.addEventListener(`submit`, () => {
        agreement.reportValidity();
      });
    }
  }
})();
