document.addEventListener('DOMContentLoaded', () => {
      const devisForm = document.getElementById('devisForm');
  
      devisForm.addEventListener('submit', (event) => {
        document.getElementById('submitButton').disabled = true;
          if (!validateForm()) {
              document.getElementById('submitButton').disabled = false;
              event.preventDefault();
          }
      });
  
      function validateForm() {
          let isValid = true;
          const username = document.getElementById('name');
          const email = document.getElementById('email');
          const phone = document.getElementById('phone');
          const service = document.getElementById('service');
          const address = document.getElementById('address');
          const description = document.getElementById('description');
  
          document.getElementById('nameError').innerHTML = '';
          document.getElementById('emailError').innerHTML = '';
          document.getElementById('phoneError').innerHTML = '';
          document.getElementById('serviceError').innerHTML = '';
          document.getElementById('addressError').innerHTML = '';
          document.getElementById('descriptionError').innerHTML = '';
  
          if (username.value.trim() === '') {
              document.getElementById('nameError').innerHTML = '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>';
              isValid = false;
          }
  
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailRegex.test(email.value)) {
              document.getElementById('emailError').innerHTML = `<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>`;
              isValid = false;
          }
  
          const phoneRegex = /^\d{10}$/;
          if (!phoneRegex.test(phone.value)) {
              document.getElementById('phoneError').innerHTML = `<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>`;
              isValid = false;
          }
  
          if (service.value === '') {
              document.getElementById('serviceError').innerHTML = `<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>`;
              isValid = false;
          }
  
          if (address.value.trim() === '') {
              document.getElementById('addressError').innerHTML = `<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>`;
              isValid = false;
          }
  
          if (description.value.trim() === '') {
              document.getElementById('descriptionError').innerHTML = `<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>`;
              isValid = false;
          }
  
          return isValid;
      }
  
     
  });
  