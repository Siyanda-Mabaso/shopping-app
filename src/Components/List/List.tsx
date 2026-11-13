import { useDispatch } from "react-redux";

import Button from "../Button/Button";
import type { AppDispatch } from "../../Store/store";

import {
  deleteItemThunk,
  deleteListThunk,
  toggleItemThunk,
  type ShoppingItem,
} from "../../ReduxSlice/shoppingListSlice";

import styles from "./List.module.css";

interface ListProps {
  id: string;
  name: string;
  category: string;
  items: ShoppingItem[];
  onAddItem: (listId: string) => void;
  onEditItem: (listId: string, item: ShoppingItem) => void;
}

const List = ({
  id,
  name,
  category,
  items,
  onAddItem,
  onEditItem,
}: ListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  

  // Delete an item
  const handleDelete = (itemId: string) => {
    dispatch(deleteItemThunk({ listId: id, itemId }));
  };

  // Delete a shopping list
  const handleDeleteList = () => {
    dispatch(deleteListThunk(id));
  };

  // Mark an item as done or not done
  const handleToggleItem = (itemId: string) => {
    dispatch(toggleItemThunk({ listId: id, itemId }));
  };

  return (
    <div className={styles.list}>
      <div className={styles.header}>
        <h2>{name}</h2>

        <h3>Category: {category || "General"}</h3>

        <Button onClick={() => onAddItem(id)}>
          + Add Item
        </Button>

        <Button variant="danger" onClick={handleDeleteList}>
          Delete List
        </Button>
      </div>

      {items.length === 0 ? (
        <p className={styles.empty}>
          No items in this list yet. Add your first item!
        </p>
      ) : (
        <div className={styles.items}>
          {items.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.itemInfo}>
                <label className={styles.itemLabel}>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleToggleItem(item.id)}
                  />

                  <span
                    className={
                      item.completed
                        ? styles.completed
                        : styles.itemName
                    }
                  >
                    {item.name}
                  </span>
                </label>

                <span className={styles.quantity}>
                  Quantity: {item.quantity}
                </span>
              </div>

              <div className={styles.actions}>
                <Button
                  variant="secondary"
                  onClick={() => onEditItem(id, item)}
                >
                  Edit
                </Button>

                <Button
                  variant="danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;