import React, { useState } from 'react';

const TodoApp = () => {
  // ↓タイトルのstate
  const [titles, setTitles] = useState([]);
  // ↓リストのstate
  const [inputTodoList, setInputTodoList] = useState('');
  // ↓詳細のstate
  const [inputTodoDetail, setInputTodoDetail] = useState('');
  // ↓idのstate
  const [id, setId] = useState(1);
  // ↓編集のstate
  // const [todoEdit, setTodoEdit] = useState('')
  // ↓進行中のstate
  const [inProgress, setInProgress] = useState([]);
  // ↓完了のstate
  const [complete, setComplete] = useState([]);

  // 入力された値を保持する関数(Todoタイトル)
  const handleOnChange = (event) => {
    setInputTodoList(event.target.value);
  };

  // 入力された値を保持する関数(Todo詳細)
  const handleDetail = (event) => {
    setInputTodoDetail(event.target.value);
  }

  // 追加ボタン機能
  const todoAddClick = () => {
    if (inputTodoList === '') return
    // 新しいTodoオブジェクトを作成して配列に追加
    const newTodo = {
      id: id,
      title: inputTodoList,
      detail: inputTodoDetail
    };
    setTitles([...titles, newTodo]);
    setInputTodoList('');
    setInputTodoDetail('');
    setId(id + 1);
  };

  // 編集ボタン機能
  const todoEditClick = () => {

  }

  // 進行中ボタン機能
  const todoInProgress = (index) => {
    const taskToMove = titles[index];
    const newTitles = [...titles.slice(0, index), ...titles.slice(index + 1)];
    setInProgress([...inProgress, taskToMove]);
    setTitles(newTitles);
  };

  // 「進行中へ」ボタン機能→「完了」エリアに移動後、このボタンをクリックすると「進行中」エリアにタスクが移動するような機能
  // 「完了」エリアに移動した配列のまま移動させたい
  const sendTodoInProgress = (id) => {
    const newTitles = [...complete]
    newTitles.splice(id, 1);

    const newAddTitles = [...inProgress, complete[id]];
    setComplete(newTitles);
    setInProgress(newAddTitles);
  };

  // 完了ボタン機能
  const completeTodo = (index) => {
    const taskToMove = titles[index];
    const newTitles = [...titles.slice(0, index), ...titles.slice(index + 1)];
    setComplete([...complete, taskToMove]);
    setTitles(newTitles);
  };
  
  // 「完了へ」ボタン機能→「進行中」エリアに移動後、このボタンをクリックすると「完了」エリアにタスクが移動するような機能
  // 「進行中」エリアに移動した配列のまま移動させたい
  const sendCompleteTodo = (id) => {
    const newTitles = [...inProgress]
    newTitles.splice(id, 1);

    const newAddTitles = [...complete, inProgress[id]];
    setComplete(newAddTitles);
    setInProgress(newTitles);
  };

  // 削除ボタン機能
  const todoDeleteClick = (index) => {
    const deleteTodo = [...titles];
    deleteTodo.splice(index, 1);
    setTitles(deleteTodo);
  };
  
  // 削除ボタン機能（進行中エリア）
  const todoDeleteInprogress = (index) => {
    const deleteTodo = [...titles];
    deleteTodo.splice(index, 1);
    setInProgress(deleteTodo);
  };

  // 削除ボタン機能（完了エリア）
  const todoDeleteComplete = (index) => {
    const deleteTodo = [...titles];
    deleteTodo.splice(index, 1);
    setComplete(deleteTodo);
  };

  return (
    <>
      <div>
        <h1 className="title">YourTodo</h1>
      </div>
      <div className="input-area">
        <div className="todoTitle">Todoのタイトル:</div>
        <input placeholder="例) 読書など" value={inputTodoList} onChange={handleOnChange} />
        <div className="todoDetail">Todoの詳細:</div>
        <input placeholder="例) 本のタイトルなど" value={inputTodoDetail} onChange={handleDetail} />
        <button onClick={todoAddClick}>Add</button>
        <div>
          <ul>       
            {titles.map((element, index) => {
              return (
                <div key={index}>
                  <li className="todoTitles">
                    <div className="todoElement">
                      <div>{element.id}</div>
                      <div>{element.title}</div>
                      <div>{element.detail}</div>
                    </div>
                    <div>
                      <button onClick={() => todoEditClick(index)}>✏️</button>
                      <button onClick={() => todoInProgress(index)}>進行中</button>
                      <button onClick={() => completeTodo(index)}>完了</button>
                      <button onClick={() => todoDeleteClick(index)}>削除</button>
                    </div>
                  </li>
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
              <li key={index}>
                <div>
                  <div>{task.id}</div>
                  <div>{task.title}</div>
                  <div>{task.detail}</div>
                </div>
                <div>
                  <button onClick={() => todoEditClick(index)}>✏️</button>
                  <button onClick={() => sendCompleteTodo(index)}>完了へ</button>
                  <button onClick={() => todoDeleteInprogress(index)}>削除</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="complete">
          <p className="complete-letter">完了</p>
          <ul>
            {complete.map((task, index) => (
              <li key={index}>
                <div className="completeTodo">
                  <div>{task.id}</div>
                  <div>{task.title}</div>
                  <div>{task.detail}</div>
                </div>
                <div>
                  <button onClick={() => todoEditClick(index)}>✏️</button>
                  <button onClick={() => sendTodoInProgress(index)}>進行中へ</button>
                  <button onClick={() => todoDeleteComplete(index)}>削除</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default TodoApp
