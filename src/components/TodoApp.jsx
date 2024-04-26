import React, { useState } from 'react';

const TodoApp = () => {
  // ↓タイトルのstate
  const [titles, setTitles] = useState([]);
  // ↓リストのstate?
  const [inputTodo, setInputTodo] = useState([]);
  // ↓詳細のstate
  const [detail, setDetail] = useState([])
  // ↓idのstate
  const [id, setId] = useState(1)
  // ↓進行中のstate
  const [inProgress, setInProgress] = useState([]);
  // ↓完了のstate
  const [complete, setComplete] = useState([]);

  // 入力された値を保持する関数(Todoタイトル)
  const handleOnChange = (event) => {
    setInputTodo(event.target.value);
  };

  // 入力された値を保持する関数(Todo詳細)
  const handleDetail = (event) => {
    setDetail(event.target.value)
  }

  // 追加ボタン機能
  const todoAddClick = () => {
    if (inputTodo === '') return
    setInputTodo([
      ...inputTodo,
      {
        id: id,
        title: titles,
        detail: detail
      }
    ])
    const newTitles = [...titles, inputTodo, detail, id]
    setTitles(newTitles)
    setInputTodo('')
    setDetail('')
    setId(id)
  };

  // 削除ボタン機能
  const todoDeleteClick = (index) => {
    const deleteTodo = [...titles];
    deleteTodo.splice(index, 1);
    setTitles(deleteTodo);
  };

  // 進行中ボタン機能
  const todoInProgress = (index) => {
    const taskToMove = titles[index];
    const newTitles = [...titles.slice(0, index), ...titles.slice(index + 1)];
    setInProgress([...inProgress, taskToMove]);
    setTitles(newTitles);
  };

  // 完了ボタン機能
  const completeTodo = (index) => {
    const taskToMove = titles[index];
    const newTitles = [...titles.slice(0, index), ...titles.slice(index + 1)];
    setComplete([...complete, taskToMove]);
    setTitles(newTitles);
  };

  return (
    <>
      <div>
        <h1 className="title">YourTodo</h1>
      </div>
      <div className="input-area">
        <div className="todoTitle">Todoのタイトル:</div>
        <input placeholder="例) 読書など" value={inputTodo} onChange={handleOnChange} />
        <div className="todoDetail">Todoの詳細:</div>
        <input placeholder="例) 本のタイトルなど" value={detail} onChange={handleDetail} />
        <button onClick={todoAddClick}>Add</button>
        <div>
          <ul>       
            {titles.map((element, index) => {
              return (
                <div key={index}>
                  <li className="todoTitle">{element}</li>
                  <button onClick={() => todoInProgress(index)}>進行中</button>
                  <button onClick={() => completeTodo(index)}>完了</button>
                  <button onClick={() => todoDeleteClick(index)}>削除</button>
                </div>
              )
            })}
          </ul>
        </div>
      </div>
      <div className="status-area">
        <div className="in-progress">
          <p className="progress-letter">進行中</p>
          <ul>
            {inProgress.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </div>
        <div className="complete">
          <p className="complete-letter">完了</p>
          <ul>
            {complete.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default TodoApp
