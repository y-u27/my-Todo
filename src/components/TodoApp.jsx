import React, { useState } from "react";

// NICE: コメントが丁寧でわかりやすいです！
// NICE: 命名が端的でわかりやすいです！

const TodoApp = () => {
  // REVIEW: このtitlesはtodoの一覧を保持するstateなので、todosという名前の方が適切かもしれないですね😊
  // ↓タイトルのstate
  const [titles, setTitles] = useState([]);
  // REVIEW: このinputTodoListはtodoのタイトルを保持するstateなので、詳細のstateに合わせてinputTodoTitleという名前の方が適切かもしれないですね😊
  // ↓リストのstate
  const [inputTodoList, setInputTodoList] = useState("");
  // ↓詳細のstate
  const [inputTodoDetail, setInputTodoDetail] = useState("");
  // ↓idのstate
  const [id, setId] = useState(0);
  // REVIEW: todoOpenEditはidが入るのでeditIdという名前の方が適切かもしれないですね😊
  // REVIEW: idは数字なので、初期値はnullよりも0の方が適切かもしれないですね😊
  // ↓編集のstate
  const [todoOpenEdit, setTodoOpenEdit] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDetail, setEditDetail] = useState("");
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
  };

  // 追加ボタン機能
  const todoAddClick = () => {
    // NICE: ここで空文字の場合の処理を追加しているのがGoodです！
    // REVIEW: 詳細も入力してほしい情報なので、詳細が空文字の場合も処理を追加すると良いかもしれませんね😊
    if (inputTodoList === "") return;
    // 新しいTodoオブジェクトを作成して配列に追加
    const newTodo = {
      id: id,
      title: inputTodoList,
      detail: inputTodoDetail,
    };
    setTitles([...titles, newTodo]);
    // NICE: 入力フォームをクリアする処理があるのがGoodです！
    setInputTodoList("");
    setInputTodoDetail("");
    // NICE: idの更新処理があって良いですね！
    setId(id + 1);
  };

  // 編集ボタン機能
  const editButton = (todo) => {
    setTodoOpenEdit(todo.id);
    setEditTitle(todo.title);
    setEditDetail(todo.detail);
  };

  // 編集を保存する機能
  const updateEditButton = () => {
    const updatedTitles = titles.map((todo) =>
      todo.id === todoOpenEdit
        ? { ...todo, title: editTitle, detail: editDetail }
        : todo
    );
    setTitles(updatedTitles);
    // ↓編集できるか判定？
    setTodoOpenEdit(null);
    // ↓更新関数を空文字に設定
    setEditTitle("");
    setEditDetail("");
  };

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
    const newTitles = [...complete];
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
    const newTitles = [...inProgress];
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
        <div>
          <input
            placeholder="Todoのタイトル（例:読書 など）"
            value={inputTodoList}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <input
            placeholder="Todoの詳細（例:5ページ読む など）"
            value={inputTodoDetail}
            onChange={handleDetail}
          />
        </div>
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
                      {todoOpenEdit === element.id ? (
                        <div>
                          <input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                          />
                          <input
                            value={editDetail}
                            onChange={(e) => setEditDetail(e.target.value)}
                          />
                          <button onClick={updateEditButton}>保存</button>
                          <button onClick={() => setTodoOpenEdit(null)}>
                            キャンセル
                          </button>
                        </div>
                      ) : (
                        <div>
                          <button onClick={() => editButton(element)}>
                            編集
                          </button>
                          <button onClick={() => todoInProgress(index)}>
                            進行中
                          </button>
                          <button onClick={() => completeTodo(index)}>
                            完了
                          </button>
                          <button onClick={() => todoDeleteClick(index)}>
                            削除
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                </div>
              );
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
                <div className="todoElement">
                  <div>{task.id}</div>
                  <div>{task.title}</div>
                  <div>{task.detail}</div>
                </div>
                <div>
                  <button onClick={() => sendCompleteTodo(index)}>
                    完了へ
                  </button>
                  <button onClick={() => todoDeleteInprogress(index)}>
                    削除
                  </button>
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
                <div className="todoElement">
                  <div>{task.id}</div>
                  <div>{task.title}</div>
                  <div>{task.detail}</div>
                </div>
                <div>
                  <button onClick={() => sendTodoInProgress(index)}>
                    進行中へ
                  </button>
                  <button onClick={() => todoDeleteComplete(index)}>
                    削除
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TodoApp;
