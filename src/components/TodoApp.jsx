import React, { useState } from 'react'

const TodoApp = () => {
  const [titles, setTitles] = useState([])
  const [todos, setTodos] = useState('')
  const [inProgress, setInProgress] = useState('')
  const [complete, setComplete] = useState('')

  // 入力された値を保持する関数
  const handleOnChage = (event) => {
    setTodos(event.target.value)
  }

  // 追加ボタン機能
  const todoAddClick = () => {
    const newTodos = [...titles, todos]
    if (newTodos === '') {
      setTitles(newTodos)
    }
  }

  // 削除ボタン機能
  const todoDeleteClick = (index) => {
    const deleteTodo = [...titles]
    deleteTodo.splice(index, 1)
    setTitles(deleteTodo)
  }

  // 進行中ボタン機能
  const todoInProgress = (index) => {
    const taskToMove = titles[index]
    const newTitles = [...titles.slice(0, index), ...titles.slice(index + 1)]
      setTitles(newTitles)
      setInProgress(taskToMove)
    }

  // 完了ボタン機能
  const completeTodo = (index) => {
    const taskToMove = titles[index]
    const newTitles = [...titles.slice(0, index), ...titles.slice(index + 1)]
    setComplete(taskToMove)
    setTitles(newTitles)
  }

  return (
    <>
      <div>
        <h1 className="title">YourTodo</h1>
      </div>
      <div className="input-area">
        //valueを設定する↓
        <input placeholder="Todo入力" onChange={handleOnChage} />
        <button onClick={todoAddClick}>Add</button>
        <div>
          <ul>       
              {titles.map((element, index) => {
                return (
                  <div key={element}>
                    <li className="todoTitle">{element}</li>
                    <button onClick={() => todoInProgress(index)} >進行中</button>
                    <button onClick={() => completeTodo(index)} >完了</button>
                    <button onClick={() => todoDeleteClick(index)} >削除</button>
                  </div>
                )
              })}
          </ul>
        </div>
      </div>
      <div className="status-area">
        <div className="in-progress">
          <p className="progress-letter">進行中</p>
          <p>{inProgress}</p>
        </div>
        <div className="complete">
          <p className="complete-letter">完了</p>
          <p>{complete}</p>
        </div>
      </div>
    </>
  )
}

export default TodoApp