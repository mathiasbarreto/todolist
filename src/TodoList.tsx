import React, {useState, useEffect } from 'react';
import './TodoList.css';
import TodoListIcon from './assets/todo.webp';

function TodoList() {

  const tarefasStorage = localStorage.getItem('tarefas');
  const [tarefas, setTarefas] = useState(tarefasStorage ? JSON.parse(tarefasStorage) : []);
  const [tarefa, setTarefa] = useState("");

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);


  function addTask(form){
    form.preventDefault();
    if (!tarefa) {
      return;
    }
    setTarefas([...tarefas, {text:tarefa, isCompleted:false}]);
    setTarefa("");
    document.getElementById("tarefa").focus();
  }

  function click(index){
    const newTarefas = [...tarefas];
    newTarefas[index].isCompleted = !newTarefas[index].isCompleted;
    setTarefas(newTarefas);
  }

  function deleta(index){
    const newTarefas = [...tarefas];
    newTarefas.splice(index, 1);
    setTarefas(newTarefas);
  }

    return (
      <div>
        <h1>Lista de Tarefas</h1>
        <form onSubmit={addTask}>
          <input id="tarefa" type="text" value={tarefa} onChange={(e)=>{setTarefa(e.target.value)}} placeholder="Adicione uma tarefa"/>
          <button type="submit" className='add'>Add</button>
        </form>
        <div className='listaTarefas'>
          {
            tarefas.length < 1 
            ? 
            <img src={TodoListIcon} className='icon'alt="lista de tarefas" /> 
            :
            tarefas.map((tarefa, index) => (
              <div className={tarefa.isCompleted ? "item completo" : "item"} key={index}>
                <span onClick={()=>{click(index)}}>{tarefa.text}</span>
                <button onClick={()=>{deleta(index)}} className='del'>Deletar</button>
              </div>
            ))
          }
          {
            tarefas.length >= 1 && <button className='delAll' onClick={()=>{setTarefas([])}}>Deletar tudo</button>
          }
        </div>
      </div>
    )
  }

export default TodoList