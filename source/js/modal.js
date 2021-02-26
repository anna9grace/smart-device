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
