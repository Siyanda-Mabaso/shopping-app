
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
  type ShoppingItem,
} from "../../ReduxSlice/shoppingListSlice";

import styles from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Get shopping lists from Redux
  const { lists, loading } = useSelector(
    (state: RootState) => state.shoppingLists
  );

  // Get logged-in user
  const user = useSelector(
    (state: RootState) => state.login.user
  );

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLists = lists.filter((list) =>
    list.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Dashboard statistics
  const totalLists = lists.length;

  const totalItems = lists.reduce(
    (total, list) => total + (list.items?.length || 0),
    0
  );

  const completedItems = lists.reduce(
    (total, list) =>
      total + (list.items?.filter((item) => item.completed).length || 0),
    0
  );

  // Create list form
  const [showListForm, setShowListForm] = useState(false);
  const [listName, setListName] = useState("");
  const [category, setCategory] = useState("");

  // Add/Edit item modal
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);

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
      <Header />

      <main className={styles.home}>
        <div className={styles.container}>

          {/* WELCOME SECTION */}
          <section className={styles.welcome}>
            <div>
              <h1>
                Welcome back, {user?.name || "Shopper"}! 👋
              </h1>

              <p>
                Manage your shopping lists and keep everything organised.
              </p>
            </div>
          </section>

          {/* STATISTICS */}
          <section className={styles.statsGrid}>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>🛒</div>
              <div>
                <h2>{totalLists}</h2>
                <p>Shopping Lists</p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>📦</div>
              <div>
                <h2>{totalItems}</h2>
                <p>Total Items</p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>✅</div>
              <div>
                <h2>{completedItems}</h2>
                <p>Completed Items</p>
              </div>
            </div>

          </section>

          {/* PAGE HEADER */}
          <div className={styles.pageHeader}>
            <div>
              <h1>My Shopping Lists</h1>
              <p>Keep track of everything you need to buy.</p>
            </div>

            <Button
              onClick={() => {
                setListName("");
                setCategory("");
                setShowListForm(true);
              }}
            >
              + Create Shopping List
            </Button>
          </div>

          {/* SEARCH BAR */}
          <div className={styles.searchBox}>
            <Input
              id="search"
              label="Search Shopping Lists"
              placeholder="Search by list name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
                onChange={(e) => setListName(e.target.value)}
              />

              <Input
                id="category"
                label="Category"
                placeholder="e.g. Groceries, Cosmetics"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />

              <div className={styles.formButtons}>
                <Button type="submit" disabled={loading}>
                  Create
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowListForm(false);
                    setListName("");
                    setCategory("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}

          {/* SHOPPING LISTS */}
          {loading ? (
            <div className={styles.emptyState}>
              <h2>Loading your shopping lists...</h2>
            </div>
          ) : lists.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.cartIcon}>🛒</div>

              <h2>No Shopping Lists Yet</h2>

              <p>
                You haven't created a shopping list yet.
                Start by adding your first list.
              </p>
            </div>
          ) : filteredLists.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.cartIcon}>🔍</div>

              <h2>No Results Found</h2>

              <p>
                We couldn't find any shopping lists matching
                "{searchQuery}".
              </p>
            </div>
          ) : (
            <div className={styles.listContainer}>
              {filteredLists.map((list) => (
                <List
                  key={list.id}
                  id={list.id}
                  name={list.name}
                  items={list.items}
                  category={list.category}
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
