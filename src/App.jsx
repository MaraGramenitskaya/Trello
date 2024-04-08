import React from 'react'
import { useState } from 'react'

export default function App() {
  const [boards, setBoards] = useState([
    { id: 1, title: "STARTED", items: [{ id: 1, title: "react" }, { id: 2, title: "vue" }, { id: 3, title: "ancular" }] },
    { id: 2, title: "IN PROCESS", items:[] },
    { id: 3, title: "FINISHED",  items:[]}
  ])

  const [currentItem, setCurrentItem] = useState(null)
  const [currentBoard, setCurrentBoard] = useState(null)
  const [input, setInput] = useState('')
 
 
   const onDragStartFunc = (e, board, item) => {
    setCurrentBoard(board)
    setCurrentItem(item)

   }

   const onDragFunc = (e) =>{
    e.preventDefault()

   }

   const onDropFunc = (e, board) => {
    board.items.push(currentItem);
    const index =  currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(index ,1);
    setBoards(boards.map(b => {
      if (board.id === b.id) {
        return board
      } if(b.id === currentBoard.id ) {
        return  currentBoard
      }
      return b;

    }))

   }

  const addItem = () => {
    const item = { id: Date.now(), title: input }
    const newItem = [item, ...boards[0]['items']]

    setBoards(boards.map(board => {
      if (board.id === 1) board.items = newItem;
      return board;
    }))
  }

  const submit = (e) => {
    e.preventDefault();
    addItem(input);
    setInput('');
  }

  const deleteItem = (board, item) => {
    const index = board.items.indexOf(item);

    board.items.splice(index, 1);

    setBoards(boards.map(b => {
      if (board.id === b.id) {
        return board
      } return b;

    }))
  }

  return (
    <div className='App'     >
      <form onSubmit={submit}>
        <input type="text" placeholder='todo' value={input} onChange={e => setInput(e.target.value)} />
      </form>
      
      {boards.map(board =>
        <div className='board' key={board.id} onDragOver={e => onDragFunc(e)} onDrop={e => onDropFunc(e, board)}>
          < h2 >
            {board.title}
          </h2>
          {
            board.items.map(item =>
              <div className='item' key={item.id} draggable={true} onDragStart={e => onDragStartFunc(e, board, item)} onDragOver={e => onDragFunc(e, board, item)}>
                <span>{item.title}</span>
                <span className='x' onClick={() => deleteItem(board, item)}> x</span>

              </div>
            )
          }
        </div>)}
    </div >
  )
}
