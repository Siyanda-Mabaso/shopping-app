import styles from "./Input.module.css";

interface InputProps  {
  label: string;
  type?: string;
  placeholder?: string;
  id: string;
  value?:string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  label,
  type ,
  placeholder,
  id,
  value,
  onChange
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
        value={value}
        onChange={onChange}
      />
    </div>
  );
      
};

export default Input;