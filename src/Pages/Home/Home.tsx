import Header from '../../Components/Header/Header';
import Button from '../../Components/Button/Button';
import styles from './Home.module.css';
import { useState } from 'react';
import { AddListModal } from '../../Components/AddListModal/AddListModal';
import { addListThunk } from '../../ReduxSlice/ListSlice';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <AddListModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreate={(name, description) => {
          console.log(name, description);
        }} 
      />
      <div className={styles.homePage}>
        <Header />
        <main className={styles.main}>
          <section className={styles.heading}>
            <div>
              <h1>My Shopping Lists</h1>
              <p>Keep track of everything you need to buy.</p>
            </div>
            <Button onClick={() => setIsModalOpen(true)}>
              + Create Shopping List 
            </Button>
          </section>
          <section className={styles.shoppingLists}>
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🛒</div>
              <h2>No Shopping Lists Yet</h2>
              <p>You haven't created a shopping list yet. Start by adding your first list.</p>
              {/* <Button onClick={() => setIsModalOpen(true)}>
                Create Shopping List
              </Button> */}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
