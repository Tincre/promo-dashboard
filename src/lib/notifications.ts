import toast from 'react-hot-toast';

export function successToast(message: string, icon?: string) {
  return toast.success(message, { icon: icon || '👍️' });
}

export function failureToast(message: string, icon?: string) {
  return toast.error(message, { icon: icon || '⚠️' });
}

export function infoToast(message: string, icon?: string) {
  return toast(message, { icon: icon || 'ℹ️' });
}


export function copyToast(message: string, icon?: string) {
  return toast(message, { icon: icon || '📋️' });
}
