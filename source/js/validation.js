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
        const userValue = evt.target.value;
        const regexp = /[^+?^\(?\)?\d?]/;

        if (userValue && userValue[userValue.length - 1].match(regexp)) {
          evt.target.value = userValue.slice(0, userValue.length - 1);
          field.reportValidity();
        }

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
