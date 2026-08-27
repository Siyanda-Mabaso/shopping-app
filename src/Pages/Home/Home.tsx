// import Header from "../../Components/Header/Header";
// import Button from "../../Components/Button/Button";
// import styles from "./Home.module.css";
// import { useState } from "react";
// // import { AddListModal } from "../../Components/AddListModal/AddListModal";
// // import { ListCard } from '../../Components/ListCard/ListCard';
// import { useSelector } from 'react-redux';
// import type { RootState } from '../../Store/store';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
   
//   const navigate = useNavigate();

//   return (
//     <>
//       {/* <AddListModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onCreate={(name, description) => {
//           console.log(name, description);
//         }}
//       /> */}
//       <div className={styles.homePage}>
//         <Header />
//         {/* <main className={styles.main}>
//           <section className={styles.heading}>
//             <div>
//               <h1>My Shopping Lists</h1>
//               <p>Keep track of everything you need to buy.</p>
//             </div>
//             <Button onClick={() => setIsModalOpen(true)}>
//               + Create Shopping List
//             </Button>
//           </section>
          
//           {/* <section className={styles.shoppingLists}>
//             {lists.length === 0 ? (
//               <div className={styles.emptyState}>
//                 <div className={styles.emptyIcon}>🛒</div>
//                 <h2>No Shopping Lists Yet</h2>
//                 <p>
//                   You haven't created a shopping list yet. Start by adding your
//                   first list.
//                 </p>
//               </div>
//             ) : (
//               <div className={styles.listGrid}>
//                 {/* {lists.map((list) => (
//                   <ListCard
//                     key={list.id}
//                     list={list}
//                     onClick={(id) => navigate(`/list/${id}`)}
//                     onEdit={(wrappedList) => console.log("edit", wrappedList.list)} 
//                     onDelete={(id) => console.log("delete", id)}
//                   />
//                 ))} */}
//               </div>
//             )}
//           {/* </section> */}

//         </main> */}
//       </div>
//     </> */}
//   );
// };

// export default Home;
