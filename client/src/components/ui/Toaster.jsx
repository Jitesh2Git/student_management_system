import { toast } from "sonner";

const typeStyles = {
  success: {
    backgroundColor: "var(--custom-success)",
    color: "var(--custom-success-content)",
  },
  error: {
    backgroundColor: "var(--custom-error)",
    color: "var(--custom-primary-content)",
  },
};

export const showToast = ({
  type,
  message,
  className = "",
  icon = undefined,
}) => {
  if (!message) return;

  if (type === "success" && icon === undefined) {
    return toast.success(message, {
      style: typeStyles.success,
      className: className,
    });
  }

  if (type === "error" && icon === undefined) {
    return toast.error(message, {
      style: typeStyles.error,
      className: className,
    });
  }

  const style = type && typeStyles[type] ? typeStyles[type] : undefined;

  toast(message, {
    ...(style && { style }),
    ...(icon !== undefined && { icon }),
    ...(className && { className }),
  });
};
