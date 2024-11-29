import { ref } from "vue";
import { Toast } from "./toast.type";

export const useToast = () => {
  const toasts = ref<Toast[]>([]);

  const showToast = (
    message: string,
  ) => {
    const id = Date.now();
    toasts.value.push({ id, message });

    setTimeout(() => {
      toasts.value = toasts.value.filter((toast) => toast.id !== id);
    }, 5000);
  };

  return {
    toasts,
    showToast,
  };
}
