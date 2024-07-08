import React, { useState } from "react";
import "./ListTransfer.css";
const ListTransfer = () => {
  const [left, setLeft] = useState([1, 2, 3, 4]);
  const [right, setRight] = useState([5, 6, 7, 8]);
  const [checked, setChecked] = useState([]);
  const handleToggle = (value) => {
    const currIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currIndex === -1) newChecked.push(value);
    else newChecked.splice(currIndex, 1);
    setChecked(newChecked);
    console.log(checked);
  };
  const handleAllLeft = () => {
    setRight(right.concat(left));
    setLeft([]);
  };
  const handleAllRight = () => {
    setLeft(left.concat(right));
    setRight([]);
  };
  const customList = (items) => {
    return (
      <div className="list">
        <ul>
          {items.map((value) => {
            const listId = `transfer-list-item-${value}`;
            return (
              <li key={value}>
                <input
                  type="checkbox"
                  id={listId}
                  onChange={() => handleToggle(value)}
                />
                <label htmlFor={listId}> Item {value}</label>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  return (
    <div className="list-transfer">
      <div className="list-container">{customList(left)}</div>
      <div className="buttons-container">
        <button onClick={handleAllLeft}>&gt;&gt;</button>
        <button>&gt;</button>
        <button>&lt;</button>
        <button onClick={handleAllRight}>&lt;&lt;</button>
      </div>
      <div className="list-container">{customList(right)}</div>
    </div>
  );
};

export default ListTransfer;
