function createToast(message, type) {
      const toastContainer = document.getElementById('toast-container');
      const toast = document.createElement('div');
      toast.classList.add(
            'toast',
            'px-6',
            'py-4',
            'shadow-lg',
            'text-white',
            'flex',
            'items-center',
            'relative',
            type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500',
      );

      const icon = document.createElement('i');
      icon.classList.add(
            'fas',
            type === 'success'
                  ? 'fa-check-circle'
                  : type === 'error'
                        ? 'fa-exclamation-circle'
                        : type === 'warning'
                              ? 'fa-exclamation-triangle'
                              : 'fa-info-circle',
            'text-2xl',
      );

      const text = document.createElement('span');
      text.textContent = message;

      const closeBtn = document.createElement('i');
      closeBtn.classList.add('fas', 'fa-times', 'text-xl', 'toast-close', 'ml-auto');
      closeBtn.onclick = () => {
            toast.classList.add('toast-hidden');
            toast.addEventListener('transitionend', () => toast.remove());
      };

      const bar = document.createElement('div');
      bar.classList.add(
            'toast-bar',
            type === 'success' ? 'bg-green-700' : type === 'error' ? 'bg-red-700' : type === 'warning' ? 'bg-yellow-700' : 'bg-blue-700',
      );

      toast.appendChild(icon);
      toast.appendChild(text);
      toast.appendChild(closeBtn);
      toast.appendChild(bar);
      toastContainer.appendChild(toast);

      setTimeout(() => {
            bar.style.width = '100%';
      }, 10);

      setTimeout(() => {
            toast.classList.add('toast-hidden');
            toast.addEventListener('transitionend', () => toast.remove());
      }, 5000);
}

function showSuccessToast() {
      createToast('Success : This is a success toast', 'success');
}

function showErrorToast() {
      createToast('Error : This is an error toast', 'error');
}

function showWarningToast() {
      createToast('Warning : This is a warning toast', 'warning');
}

function showInfoToast() {
      createToast('Info : This is an information toast', 'info');
}