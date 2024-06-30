const chatbotContainer = document.getElementById('chatbot-container');
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotForm = document.getElementById('chatbot-form');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');
const chargement = document.getElementById('chargement');

chatbotToggle.addEventListener('click', () => {
      chatbotContainer.classList.remove('translate-x-full', 'hidden');
      chatbotContainer.classList.add('translate-x-0');
      chatbotToggle.classList.add('hidden');
});

chatbotClose.addEventListener('click', () => {
      chatbotContainer.classList.remove('translate-x-0');
      chatbotContainer.classList.add('translate-x-full', 'hidden');
      chatbotToggle.classList.remove('hidden');
});

chatbotForm.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(event) {
      event.preventDefault();
      chargement.classList.remove('hidden');

      const question = chatbotInput.value;

      addMessage('user', question);

      const answer = await fetchAnswerFromAI(question);

      addMessage('ai', answer || 'Désolé, je ne peux pas répondre à cette question pour le moment.');

      chatbotInput.value = '';
}

function addMessage(sender, message) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('chatbot-message', sender === 'user' ? 'chatbot-message-user' : 'chatbot-message-ai');

      const iconElement = document.createElement('i');
      iconElement.classList.add('fas', sender === 'user' ? 'fa-user' : 'fa-robot');

      const contentElement = document.createElement('div');
      contentElement.classList.add('chatbot-message-content');
      contentElement.textContent = message;

      messageElement.appendChild(iconElement);
      messageElement.appendChild(contentElement);

      chatbotMessages.appendChild(messageElement);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

}

chatbotInput.addEventListener('input', () => {
      chatbotInput.style.height = 'auto';
      chatbotInput.style.height = chatbotInput.scrollHeight + 'px';
});
chatbotInput.addEventListener('input', () => {
      chatbotInput.style.height = 'auto';
      chatbotInput.style.height = chatbotInput.scrollHeight + 'px';
});

document.addEventListener('click', event => {
      if (!chatbotInput.contains(event.target)) {
            chatbotInput.style.height = '2.5rem';
      }
});

document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
            chatbotInput.style.height = '2.5rem';
      }
});

async function fetchAnswerFromAI(question) {
      try {
            const csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

            const response = await fetch(document.getElementById('chatbot-form').getAttribute('action'), {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken
                  },
                  body: JSON.stringify({ question })
            });

            if (!response.ok) {
                  console.error('erreur lors de la recup réponse :', response.status);
                  return null;
            }

            const data = await response.json();
            return data.reponse;
      } catch (error) {
            console.error(error);
            return null;
      }
      finally {
            chargement.classList.add('hidden');
      }
}
