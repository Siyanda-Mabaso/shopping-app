import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../Components/Header/Header";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import List from "../../Components/List/List";
import AddItem from "../../Components/AddItem/AddItem";

import type { RootState, AppDispatch } from "../../Store/store";

import {
  fetchListsThunk,
  createShoppingListThunk,
  editListThunk,
  type ShoppingItem,
} from "../../ReduxSlice/shoppingListSlice";



import styles from "./Home.module.css";

const Home = () => {

  const dispatch = useDispatch<AppDispatch>();

  // Get shopping lists from Redux
  const { lists, loading } = useSelector(
    (state: RootState) => state.shoppingLists
  );
    //Search 
   const [searchQuery, setSearchQuery] = useState("")
   const filteredLinks = lists.filter(list =>
    list.name.toLowerCase().includes(searchQuery.toLowerCase())
   )

  // Get logged-in user
  const user = useSelector(
    (state: RootState) => state.login.user
  );

  // Create list form
  const [showListForm, setShowListForm] =
    useState(false);

  const [listName, setListName] =
    useState("");

      const [category, setCategory] =
    useState("");

  // Add/Edit item modal
  const [selectedListId, setSelectedListId] =
    useState<string | null>(null);

  const [editingItem, setEditingItem] =
    useState<ShoppingItem | null>(null);

  // Load shopping lists
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchListsThunk(user.id));
    }
  }, [dispatch, user?.id]);

  // Create shopping list
  const handleCreateList = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!listName.trim() || !user?.id) return;

   
    await dispatch(
      createShoppingListThunk({
        userId: user.id,
        name: listName.trim(),
        notes: "",
        category: category.trim(),
        items: [],
        createdAt: new Date().toISOString(),
      })
    );

    setListName("");
    setCategory("");
    setShowListForm(false);
  };

  // Open Add Item modal
  const handleAddItem = (listId: string) => {
    setSelectedListId(listId);
    setEditingItem(null);
  };

  // Open Edit Item modal
  const handleEditItem = (
    listId: string,
    item: ShoppingItem
  ) => {
    setSelectedListId(listId);
    setEditingItem(item);
  };

  // Close Add/Edit modal
  const handleCloseItemModal = () => {
    setSelectedListId(null);
    setEditingItem(null);
  };


  return (
    <>
    <div>
         <Input
                id="search"
                label="Search Bar"
                placeholder="Search...."
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
              />
    </div>
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
                 <Input
                id="list-name"
                label="Category"
                placeholder="e.g. Groceries"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
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
              {filteredLinks.map((list) => (
                <List
                  key={list.id}
                  id={list.id}
                  name={list.name}
                  items={list.items}
                  catergory={list.category}
                  onAddItem={handleAddItem}
                  onEditItem={handleEditItem}
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
