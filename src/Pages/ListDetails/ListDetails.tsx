import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../Store/store";
import { AddItem } from "../../Components/AddItem/AddItem";
import { addItemThunk } from "../../ReduxSlice/ListSlice";
const ListDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const lists = useSelector((state: RootState) => state.list.lists);
  const list = lists.find((item) => item.id === id);
  if (!list) {
    return (
      <div>
            <h2>Shopping list not found</h2>   {" "}
        <button onClick={() => navigate("/home")}>
               Back to Home   {" "}
        </button>
          {" "}
      </div>
    );
  }
  const handleAddItem = (item: {
    name: string;
    quantity: number;
    notes: string;
    catergory: string;
  }) => {
    dispatch(
      addItemThunk({
        listId: id!,
        item: {
          id: Date.now(),
          name: item.name,
          quantity: item.quantity,
          notes: item.notes,
          catergory: item.catergory,
        },
      }),
    );
  };
  return (
    <div>
        {" "}
      <button onClick={() => navigate("/home")}>
            ← Back to Shopping Lists  {" "}
      </button>
         <h1>{list.name}</h1>   <p>{list.description}</p>
         <AddItem onAddItem={handleAddItem} />   <h2>Shopping Items</h2>
       {" "}
      {list.items.length === 0 ? (
        <p>No items added yet.</p>
      ) : (
        <div>
              {" "}
          {list.items.map((item) => (
            <div key={item.id}>
                     <h3>{item.name}</h3>      {" "}
              <p>Quantity: {item.quantity}</p>      {" "}
              <p>Category: {item.catergory}</p>      {" "}
              {item.notes && <p>Notes: {item.notes}</p>}     {" "}
            </div>
          ))}
             {" "}
        </div>
      )}
       {" "}
    </div>
  );
};
export default ListDetails;
