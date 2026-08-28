import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../Components/Header/Header";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import List from "../../Components/List/List";
import AddItem from "../../Components/AddItem/AddItem";

import type {
  RootState,
  AppDispatch,
} from "../../Store/store";

import {
  fetchListsThunk,
  createShoppingListThunk,
  deleteItemThunk,
  type ShoppingItem,
} from "../../ReduxSlice/shoppingListSlice";

import styles from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { lists, loading } = useSelector(
    (state: RootState) => state.shoppingLists
  );
  const listId = useSelector(
    (state: RootState) => state.shoppingLists.lists
  );

  const [showListForm, setShowListForm] = useState(false);
  const [listName, setListName] = useState("")

  const user=useSelector((state:RootState)=>state.login.user)

  const [selectedListId, setSelectedListId] =
    useState<string | null>(null);

  const [editingItem, setEditingItem] =
    useState<ShoppingItem | null>(null);

  /* =========================
     LOAD SHOPPING LISTS
  ========================= */

  useEffect(() => {
    // For now we use "1" as the user ID.
   if (user?.id){
    dispatch(fetchListsThunk(user.id));
    }
  }, [dispatch]);

  /* =========================
     CREATE LIST
  ========================= */

  const handleCreateList = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!listName.trim()) return;

    await dispatch(
      createShoppingListThunk({
        userId:user?.id ?? '',
        name: listName.trim(),
        notes: "",
        category: "General",
        items: [],
        createdAt: new Date().toISOString(),
      })
    );

    setListName("");
    setShowListForm(false);
  };

  /* =========================
     OPEN ADD ITEM MODAL
  ========================= */

  const handleAddItem = (listId: string) => {
    setSelectedListId(listId);
    setEditingItem(null);
  };

  /* =========================
     OPEN EDIT ITEM MODAL
  ========================= */

  const handleEditItem = (
    listId: string,
    item: ShoppingItem
  ) => {
    setSelectedListId(listId);
    setEditingItem(item);
  };

// const handleDelete = (itemId: string) => {
//   dispatch(
//     deleteItemThunk({
//       itemId,
//       listId : lists. ?? '',
//     })
//   );
// };


  /* =========================
     CLOSE ITEM MODAL
  ========================= */

  const handleCloseItemModal = () => {
    setSelectedListId(null);
    setEditingItem(null);
  };

  return (
    <>
      <Header />

      <main className={styles.home}>
        <div className={styles.container}>

          {/* PAGE HEADER */}

          <div className={styles.pageHeader}>
            <div>
              <h1>My Shopping Lists</h1>

              <p>
                Keep track of everything you need to buy.
              </p>
            </div>

            <Button
              onClick={() => {
                setListName("");
                setShowListForm(true);
              }}
            >
              + Create Shopping List
            </Button>
          </div>

          {/* CREATE LIST FORM */}

          {showListForm && (
            <form
              className={styles.form}
              onSubmit={handleCreateList}
            >
              <h2>Create Shopping List</h2>

              <Input
                id="list-name"
                label="List Name"
                placeholder="e.g. Weekly Shopping"
                value={listName}
                onChange={(e) =>
                  setListName(e.target.value)
                }
              />

              <div className={styles.formButtons}>
                <Button
                  type="submit"
                  disabled={loading}
                >
                  Create
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowListForm(false);
                    setListName("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}

          {/* SHOPPING LISTS */}

          {lists.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.cartIcon}>
                🛒
              </div>

              <h2>No Shopping Lists Yet</h2>

              <p>
                You haven't created a shopping list yet.
                Start by adding your first list.
              </p>
            </div>
          ) : (
            <div className={styles.listContainer}>
              {lists.map((list) => (
                <List
                  key={list.id}
                  id={list.id}
                  name={list.name}
                  items={list.items}
                  onAddItem={handleAddItem}
                  onEditItem={handleEditItem}
                  onDeleteItem={() => {}}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ADD / EDIT ITEM MODAL */}

      {selectedListId && (
        <AddItem
          listId={selectedListId}
          item={editingItem || undefined}
          onClose={handleCloseItemModal}
        />
      )}
    </>
  );
};

export default Home;
