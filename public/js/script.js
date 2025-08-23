// Example starter JavaScript for disabling form submissions if there are invalid fields

(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()
  document.querySelector("form").addEventListener("submit", function (e) {
    const alphaRegex = /^[A-Za-z\s]{2,50}$/;
    const title = document.querySelector('input[name="listing[title]"]');
    const country = document.querySelector('input[name="listing[country]"]');
    const location = document.querySelector('input[name="listing[location]"]');

    if (!alphaRegex.test(title.value)) {
      alert("Title must contain only letters and spaces.");
      title.focus();
      e.preventDefault();
    } else if (!alphaRegex.test(country.value)) {
      alert("Country must contain only letters and spaces.");
      country.focus();
      e.preventDefault();
    } else if (!alphaRegex.test(location.value)) {
      alert("Location must contain only letters and spaces.");
      location.focus();
      e.preventDefault();
    }
  });

