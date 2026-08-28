import { useState } from "react";
import { useDispatch } from "react-redux";

import Button from "../Button/Button";
import Input from "../Input/Input";

import type { AppDispatch } from "../../Store/store";

import {
  addItemThunk,
  updateItemThunk,
  type ShoppingItem,
} from "../../ReduxSlice/shoppingListSlice";

import styles from "./AddItem.module.css";

interface AddItemProps {
  listId: string;
  item?: ShoppingItem;
  onClose: () => void;
}

const AddItem = ({
  listId,
  item,
  onClose,
}: AddItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState(
    item?.name || ""
  );

  const [quantity, setQuantity] = useState(
    item?.quantity.toString() || ""
  );

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!name.trim() || !quantity) return;

    const number = Number(quantity);

    if (number < 1) return;

    if (item) {
      await dispatch(
        updateItemThunk({
          listId,
          item: {
            ...item,
            name: name.trim(),
            quantity: number,
          },
        })
      );
    } else {
      await dispatch(
        addItemThunk({
          listId,
          name: name.trim(),
          quantity: number,
        })
      );
    }

    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        <div className={styles.header}>
          <h2>
            {item ? "Edit Item" : "Add Item"}
          </h2>

          <button
            className={styles.close}
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          <Input
            id="item-name"
            label="Item Name"
            placeholder="e.g. Milk"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <Input
            id="item-quantity"
            label="Quantity"
            type="text"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) {
                setQuantity(e.target.value);
              }
            }}
          />

          <div className={styles.buttons}>
            <Button
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button type="submit">
              {item ? "Update Item" : "Add Item"}
            </Button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default AddItem;
