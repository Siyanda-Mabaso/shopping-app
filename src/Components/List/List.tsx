import { useDispatch } from "react-redux";

import Button from "../Button/Button";

import type { AppDispatch } from "../../Store/store";

import {
  deleteItemThunk,
  type ShoppingItem,
} from "../../ReduxSlice/shoppingListSlice";

import styles from "./List.module.css";

interface ListProps {
  id: string;
  name: string;
  items: ShoppingItem[];

  onAddItem: (listId: string) => void;

  onEditItem: (
    listId: string,
    item: ShoppingItem
  ) => void;
}

const List = ({
  id,
  name,
  items,
  onAddItem,
  onEditItem,
}: ListProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (itemId: string) => {
    dispatch(
      deleteItemThunk({
        listId: id,
        itemId: itemId,
      })
    );
  };

  return (
    <div className={styles.list}>

      <div className={styles.header}>
        <h2>{name}</h2>

        <Button onClick={() => onAddItem(id)}>
          + Add Item
        </Button>
      </div>

      {items.length === 0 ? (
        <p className={styles.empty}>
          No items in this list yet.
        </p>
      ) : (
        <div className={styles.items}>

          {items.map((item) => (
            <div
              key={item.id}
              className={styles.item}
            >

              <div className={styles.itemInfo}>
                <span className={styles.itemName}>
                  {item.name}
                </span>

                <span className={styles.quantity}>
                  Qty: {item.quantity}
                </span>
              </div>

              <div className={styles.actions}>

                <Button
                  variant="secondary"
                  onClick={() =>
                    onEditItem(id, item)
                  }
                >
                  Edit
                </Button>

                <Button
                  variant="danger"
                  onClick={() =>
                    handleDelete(item.id)
                  }
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
