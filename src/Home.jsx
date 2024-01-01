import styles from './Home.module.css';
import rocketSvg from './assets/rocket.svg';
import clipboard from './assets/Clipboard.svg';
import { PlusCircle } from '@phosphor-icons/react';
import { Task } from './components/Task.jsx';
import { v4 as uuidv4 } from 'uuid';


import './global.css'
import { useEffect, useState } from 'react';

function Home() {
  const [newTaskText, setNewTaskText] = useState('')
  const [tasks, setTasks] = useState([
    {
      id: 1,
      content: "Arrumar a cama.",
      isCompleted: true,
    },
    {
      id: 2,
      content: "Terminar projeto do EBS.",
      isCompleted: false,
    },
    {
      id: 3,
      content: "Correr ao final da tarde.",
      isCompleted: false,
    },
  ])

  function handleNewTaskChange(event){
    setNewTaskText(event.target.value);

  }
  function handleCreateTask(event){
    event.preventDefault()
    

    if(newTaskText === ""){
      return alert('Não é possivel criar uma Task vazia.')
    }

    setTasks([ ...tasks, {
      id: uuidv4().toString(),
      content: newTaskText,
      isCompleted: false
    }])
    setNewTaskText("")
  }

  function handleDeleteTask(taskToDelete){
    const tasksWhitoutChosenOne = tasks.filter(task => {
      return task.id !== taskToDelete
    })
    setTasks(tasksWhitoutChosenOne)
   
  }

  const totalTasksCounter = tasks.length.toString()
  const tasksAreEmpty = tasks.length === 0

  if (tasks.length === 0) {
    <>
      <img className={styles.clipboard} src={clipboard} />
      <b>Você ainda não tem tarefas cadastradas</b>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </>
  }


  
  return (
    <>
      <header>
        <img src={rocketSvg} alt="" />
        <h1>to<span>do</span></h1>
      </header>
      <main className={styles.wrapper}>
        <form>
          <input 
            type="text" 
            placeholder='Adicione uma nova tarefa'
            onChange={handleNewTaskChange}
            value={newTaskText}
            />
          <button 
            onClick={handleCreateTask}
            className={styles.buttonCreateTask}
          >
            Criar
            <PlusCircle size={20}/>
          </button>
        </form>
        <div className={styles.counterContainer}>
          <p>Tarefas criadas <span className={styles.counters}>{ totalTasksCounter }</span></p>

          <p>Concluídas <span className={styles.counters}>1 de {totalTasksCounter}</span></p>
        </div>
        {
          tasksAreEmpty ? (
            <div className={styles.taskListEmpty}>
              <img className={styles.clipboard} src={clipboard} />
              <b>Você ainda não tem tarefas cadastradas</b>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          ) : (
            <div className={styles.taskListFull}>
              {
                tasks.map(task => (
                  <Task 
                    id={task.id}
                    key={task.id}
                    content={task.content}
                    isCompleted={task.isCompleted}
                    onDeleteTask={handleDeleteTask}
                  />
                ))
              }
            </div>
          )
        }
      </main>
    </>

    )
}

export default Home
