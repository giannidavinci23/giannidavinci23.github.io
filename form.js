document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form[data-form]');

  forms.forEach((form) => {
    // Crée dynamiquement la zone de message sous le bouton
    const message = document.createElement('p');
    message.className = 'form-message';
    form.appendChild(message);

    form.addEventListener('submit', (event) => {
      event.preventDefault(); // on empêche le rechargement de la page

      let isValid = true;

      // On vérifie chaque champ requis un par un
      form.querySelectorAll('[required]').forEach((field) => {
        const value = field.value.trim();
        field.classList.remove('invalid');

        if (!value) {
          field.classList.add('invalid');
          isValid = false;
        }

        if (field.type === 'email' && value && !value.includes('@')) {
          field.classList.add('invalid');
          isValid = false;
        }
      });

      message.className = 'form-message'; // reset

      if (isValid) {
        message.textContent = form.dataset.successText || 'Merci, votre envoi a bien été pris en compte.';
        message.classList.add('success');
        form.reset();
      } else {
        message.textContent = 'Merci de vérifier les champs en rouge avant de continuer.';
        message.classList.add('error');
      }
    });
  });
});
