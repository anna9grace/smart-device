'use strict';

(function () {
  const phoneFields = document.querySelectorAll(`#modal-phone, #customer-phone`);
  const PHONE_TEMPLATE_START = `+7(`;
  const PHONE_TEMPLATE_MIDDLE = `)`;

  if (phoneFields.length < 1) {
    return;
  }

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
      if (evt.target.value.length === 6) {
        evt.target.value += PHONE_TEMPLATE_MIDDLE;
      }
    });
  }
})();
