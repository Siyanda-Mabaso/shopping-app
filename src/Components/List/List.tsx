import Button from "../Button/Button";
import styles from "./List.module.css";

interface Item {
  id: string;
  name: string;
  quantity: number;
  completed: boolean;
}

interface ListProps {
  id: string;
  name: string;
  items: Item[];
  onAddItem: (listId: string) => void;
  onEditItem: (listId: string, item: Item) => void;
  onDeleteItem: (listId: string, itemId: string) => void;
}

const List = ({
  id,
  name,
  items,
  onAddItem,
  onEditItem,
  onDeleteItem,
}: ListProps) => {
  return (
    <div className={styles.list}>

      <div className={styles.header}>
        <div>
          <h2>{name}</h2>

          <p>
            {items.length}{" "}
            {items.length === 1 ? "item" : "items"}
          </p>
        </div>

        <Button
          variant="secondary"
          onClick={() => onAddItem(id)}
        >
          + Add Item
        </Button>
      </div>

      {items.length > 0 && (
        <div className={styles.items}>
          {items.map((item) => (
            <div
              key={item.id}
              className={styles.item}
            >
              <div className={styles.itemInfo}>
                <span>{item.name}</span>
                <span>Qty: {item.quantity}</span>
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
                    onDeleteItem(id, item.id)
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
