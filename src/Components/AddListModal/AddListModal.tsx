import {useState}from 'react'
import styles from './AddListModal.module.css'
// import Input from '../Input/Input';

interface AddListModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (name: string,description:string) => void;
}

export const AddListModal = ({ 
    isOpen,
     onClose, 
     onCreate 
    }: AddListModalProps) => {
        const[name,setName]=useState("");
        const[description,setDescription]=useState("");
        if (!isOpen) return null;
        const handleSubmit =()=>{
            if (!name.trim())return;
            onCreate(name, description)

            setName("")
            setDescription("")
            onClose()
        }
  return (
    <div className={styles.overlay}>
        <div className={styles.modal}>
            <h2>Create Shopping List</h2>
            <input
            type='text'
            placeholder='ListName'
            value={name}
            onChange={(e)=> setName(e.target.value)}
            />
            <textarea
            placeholder='Description'
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            />

            <div className={styles.actions}>
                <button onClick={onClose}>Cancel</button>
                <button onClick={handleSubmit}>
                    Create
                </button>

            </div>
        

        </div>

    </div>
  )
}
