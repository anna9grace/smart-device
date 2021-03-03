'use strict';

const anchors = document.querySelectorAll(`a[href*='#']`)

if (anchors.length > 0) {
	for (const anchor of anchors)	{
		anchor.addEventListener( `click`, (evt) => {
			evt.preventDefault();

			const destinationId = anchor.getAttribute(`href`).substr(1);

			document.getElementById(destinationId).scrollIntoView({
				behavior: `smooth`,
				block: `start`,
			})
		})
	}
}
