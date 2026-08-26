import React from 'react';
import styles from './ItemRow.module.css';

type ItemRowProps = {
  name: string;
  quantity: string | number;
  image?: string;
  checked: boolean;
  onCheck: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export const ItemRow: React.FC<ItemRowProps> = ({ name, quantity, image, checked, onCheck, onEdit, onDelete }) => {
  return (
    <div className={styles.row}>
      <input type="checkbox" checked={checked} onChange={onCheck} className={styles.checkbox} />
      <div className={styles.imgBox}>
        {image ? <img src={image} alt={name} className={styles.img} /> : <div className={styles.imgPlaceholder} />}
      </div>
      <div className={styles.details}>
        <p className={`${styles.name} ${checked ? styles.checked : ''}`}>{name}</p>
        <p className={styles.quantity}>{quantity}</p>
      </div>
      <div className={styles.actions}>
        <button className={styles.editBtn} onClick={onEdit}>✏️</button> {/* Fixed: Emojis */}
        <button className={styles.deleteBtn} onClick={onDelete}>🗑️</button>
      </div>
    </div>
  );
};
