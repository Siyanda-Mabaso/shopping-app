import { useState } from "react";
import styles from "./AddItem.module.css";
type AddItemProps = {
  onAddItem: (item: {
    name: string;
    quantity: number;
    notes: string;
    catergory: string;
  }) => void;
};
export const AddItem = ({ onAddItem }: AddItemProps) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [catergory, setCatergory] = useState("");
  const [notes, setNotes] = useState("");
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name.trim() === "") {
      return;
    }
    onAddItem({ name, quantity, catergory, notes });
    setName("");
    setQuantity(1);
    setCatergory("");
    setNotes("");
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
         <h3>Add Shopping Item</h3>  {" "}
      <div className={styles.inputGroup}>
            <label>Item Name</label>
           {" "}
        <input
          type="text"
          placeholder="e.g. Milk"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
          {" "}
      </div>
        {" "}
      <div className={styles.inputGroup}>
            <label>Quantity</label>
           {" "}
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
        />
          {" "}
      </div>
        {" "}
      <div className={styles.inputGroup}>
            <label>Category</label>   {" "}
        <select
          value={catergory}
          onChange={(event) => setCatergory(event.target.value)}
        >
               <option value="">Select a category</option>    {" "}
          <option value="Food">Food</option>    {" "}
          <option value="Drinks">Drinks</option>    {" "}
          <option value="Dairy">Dairy</option>    {" "}
          <option value="Fruit & Vegetables">
                  Fruit & Vegetables    {" "}
          </option>
               <option value="Household">Household</option>    {" "}
          <option value="Toiletries">Toiletries</option>    {" "}
          <option value="Other">Other</option>   {" "}
        </select>
          {" "}
      </div>
        {" "}
      <div className={styles.inputGroup}>
            <label>Notes</label>
           {" "}
        <textarea
          placeholder="e.g. Full cream milk"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
          {" "}
      </div>
        {" "}
      <button type="submit" className={styles.addButton}>
            + Add Item  {" "}
      </button>
       {" "}
    </form>
  );
};
