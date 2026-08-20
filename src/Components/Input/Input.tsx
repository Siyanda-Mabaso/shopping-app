import styles from "./Input.module.css";

interface InputProps  {
  label: string;
  type?: string;
  placeholder?: string;
  id: string;
};

const Input = ({
  label,
  type = "text",
  placeholder,
  id,
}: InputProps) => {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
};

export default Input;