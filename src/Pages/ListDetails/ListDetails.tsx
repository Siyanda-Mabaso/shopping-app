// import React, { useState } from 'react';
// import styles from './ListCard.module.css';
// import type { Lists } from '../../ReduxSlice/ListSlice';



// export interface ShoppingList {
//   list: Lists;
// }

// type ListCardProps = {
//   list: Lists;
//   onDelete: (id: string) => void;
//   onEdit: (list: ShoppingList) => void;
//   onClick: (id: string) => void;
//   onAddItem?: (id: string) => void; // Added optional handler for adding items
// };

// const ListCard: React.FC<ListCardProps> = ({
//   list,
//   onDelete,
//   onEdit,
//   onClick,
//   onAddItem,
// }) => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   // Formats date to "DD MMM YYYY" safely
//   const formattedDate = list.createdAt
//     ? new Date(list.createdAt).toLocaleDateString('en-GB', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric',
//       })
//     : '';

//   const listId = list.id ?? '';

//   return (
//     <div className={styles.card} onClick={() => onClick(listId)}>
//       <div className={styles.icon}>🛒</div>
      
//       <div className={styles.info}>
//         <h3 className={styles.name}>{list.name}</h3>
//         <p className={styles.meta}>
//           {list.items?.length ?? 0} items 
//           {formattedDate && <span> · Created {formattedDate}</span>}
//         </p>
//         {list.description && (
//           <p className={styles.description}>{list.description}</p>
//         )}
//       </div>

//       <div className={styles.menuWrapper} onClick={(e) => e.stopPropagation()}>
//         <button className={styles.menuBtn} onClick={() => setMenuOpen(!menuOpen)}>
//           ⋮
//         </button>
//         {menuOpen && (
//           <div className={styles.dropdown}>
//             <button
//               onClick={() => {
//                 onEdit({ list });
//                 setMenuOpen(false);
//               }}
//             >
//               Edit
//             </button>
//             <button
//               className={styles.deleteOption}
//               onClick={() => {
//                 onDelete(listId);
//                 setMenuOpen(false);
//               }}
//             >
//               Delete
//             </button>
//             {onAddItem && (
//               <button
//                 onClick={() => {
//                   onAddItem(listId);
//                   setMenuOpen(false);
//                 }}
//               >
//                 Add Item
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
// export default ListCard