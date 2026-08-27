// import {useState}from 'react'
// import styles from './AddListModal.module.css'
// import type{ RootState } from '../../Store/store';
// import { useDispatch,useSelector } from 'react-redux';
// // import { addListThunk } from '../../ReduxSlice/ListSlice';
// interface AddListModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onCreate: (name: string,description:string) => void;
// }

// export const AddListModal = ({ 
//     isOpen,
//      onClose, 
//      onCreate 
//     }: AddListModalProps) => {

//         const dispacth = useDispatch()
//         const user = useSelector((state:RootState)=>state.login.user)
//         const[name,setName]=useState("");
//         const[description,setDescription]=useState("");
//         if (!isOpen) return null;

//         const handleSubmit = async(e:React.FormEvent)=>{
//             e.preventDefault()

//             if (!name.trim())return;
//             onCreate(name, description)

        
//             // const response = await dispacth (addListThunk({
//             //     userId: user?.id ?? '',
//             //     name: name,
//             //     description: description,
//             //     numberOfItems: 0,
//             //     createdAt: new Date().toISOString (),
//             //     items: [],

//             // }) as any )
            
//         //     if (addListThunk.fulfilled.match(response)){
//         //             setName("")
//         //     setDescription("")
//         //     onClose()

//         //     }

//         // }
//   return (

//     <div className={styles.overlay}>
//         <div className={styles.modal}>
            
//             <h2>Create Shopping List</h2>
//             <input
//             type='text'
//             placeholder='ListName'
//             value={name}
//             onChange={(e)=> setName(e.target.value)}
//             />
//             <textarea
//             placeholder='Description'
//             value={description}
//             onChange={(e)=>setDescription(e.target.value)}
//             />

//             <div className={styles.actions}>
//                 <button onClick={onClose}>Cancel</button>

//                 <button onClick={handleSubmit}>Create</button>

//             </div>
    

//         </div>

//     </div>
//   )
// }
