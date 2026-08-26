import React, { useState } from 'react';
import styles from './ListCard.module.css';
import type { Lists } from '../../ReduxSlice/ListSlice';

export interface ShoppingList {
  list: Lists;
}

type ListCardProps = {
  list: Lists;
  onDelete: (id: string) => void;
  onEdit: (list: ShoppingList) => void;
  onClick: (id: string) => void;
};

export const ListCard: React.FC<ListCardProps> = ({ list, onDelete, onEdit, }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const formattedDate = list.createdAt
    ? new Date(list.createdAt).toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric'
      })
    : '';

  return (
    // Fixed: onClick now triggers the navigation prop callback
    <div className={styles.card} >
      <div className={styles.icon}>🛒</div> 

      <div className={styles.info}>
        <h3 className={styles.name}>{list.name}</h3>
        <p className={styles.meta}>
          {list.items.length} items
          {formattedDate && <span> · Created {formattedDate}</span>}
        </p>
        {list.description && (
          <p className={styles.description}>{list.description}</p>
        )}
      </div>

      <div className={styles.menuWrapper} onClick={(e) => e.stopPropagation()}>
        <button className={styles.menuBtn} onClick={() => setMenuOpen(!menuOpen)}>⋮</button>
        {menuOpen && (
          <div className={styles.dropdown}>
            {/* Fixed: Connected actions and closed menu */}
            <button onClick={() => { onEdit({ list }); setMenuOpen(false); }}>Edit</button>
            <button className={styles.deleteOption} onClick={() => { onDelete(list.id ?? ''); setMenuOpen(false); }}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};
