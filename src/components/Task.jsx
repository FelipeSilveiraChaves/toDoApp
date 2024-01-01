import { useState } from 'react';
import styles from './Task.module.css';
import { Trash, Check } from '@phosphor-icons/react';


export function Task({ isCompleted = false, content, onDeleteTask, id}){
  const [completeState, setCompleteState] = useState(isCompleted)
  
  function handleComplete(){
    setCompleteState(!completeState)
  }
  function handleDeleteComment(){
    onDeleteTask(id)
  }

  return (
    <div className={styles.wrapper}>

      <div className={completeState ? styles.inpuWrapperChecked : styles.inputWrapperNoChecked }>
      
        <input className={styles.checkbox} type="checkbox" onChange={handleComplete}/>

      </div>
      
      <p className={completeState ? styles.taskCompleted : styles.taskNoCompleted}>{ content }</p>

      <button onClick={handleDeleteComment}>
          <Trash className={styles.trashIcon} size={18} />
      </button>

    </div>
  )
}
