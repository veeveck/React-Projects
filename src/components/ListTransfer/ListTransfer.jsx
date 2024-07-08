import React, { useState } from "react";
import "./ListTransfer.css";
function intersect(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}
function nonintersect(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}
const ListTransfer = () => {
  const [left, setLeft] = useState([1, 2, 3, 4]);
  const [right, setRight] = useState([5, 6, 7, 8]);
  const [checked, setChecked] = useState([]);
  const leftChecked = intersect(checked, left);
  const rightChecked = intersect(checked, right);
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
  const handleLeftChecked = () => {
    setRight(right.concat(leftChecked));
    setLeft(nonintersect(left, leftChecked));
    setChecked(nonintersect(checked, leftChecked));
  };
  const handleRightChecked = () => {
    setLeft(left.concat(rightChecked));
    setRight(nonintersect(right, rightChecked));
    setChecked(nonintersect(checked, rightChecked));
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
        <button onClick={handleLeftChecked}>&gt;</button>
        <button onClick={handleRightChecked}>&lt;</button>
        <button onClick={handleAllRight}>&lt;&lt;</button>
      </div>
      <div className="list-container">{customList(right)}</div>
    </div>
  );
};

export default ListTransfer;
