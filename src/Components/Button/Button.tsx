import styles from "./Button.module.css";

interface ButtonProps  {
  children: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({
  children,
  type = "button",
  variant = "primary",
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;