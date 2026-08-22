// Custom Toast Notification System
// Lightweight alternative to react-hot-toast

class ToastManager {
  constructor() {
    this.toasts = [];
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this.toasts));
  }

  add(toast) {
    const id = Date.now() + Math.random();
    const newToast = { id, ...toast, timestamp: Date.now() };
    this.toasts = [...this.toasts, newToast];
    this.notify();

    // Auto remove after duration
    setTimeout(() => {
      this.remove(id);
    }, toast.duration || 3000);

    return id;
  }

  remove(id) {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.notify();
  }

  success(message, options = {}) {
    return this.add({ type: 'success', message, ...options });
  }

  error(message, options = {}) {
    return this.add({ type: 'error', message, ...options });
  }

  info(message, options = {}) {
    return this.add({ type: 'info', message, ...options });
  }

  warning(message, options = {}) {
    return this.add({ type: 'warning', message, ...options });
  }

  loading(message, options = {}) {
    return this.add({ type: 'loading', message, duration: 0, ...options });
  }

  promise(promise, messages) {
    const id = this.loading(messages.loading || 'Loading...');
    
    promise
      .then((data) => {
        this.remove(id);
        this.success(messages.success || 'Success!');
        return data;
      })
      .catch((error) => {
        this.remove(id);
        this.error(messages.error || 'Something went wrong');
        throw error;
      });

    return promise;
  }
}

export const toast = new ToastManager();
