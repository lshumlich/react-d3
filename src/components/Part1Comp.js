import React from 'react';

let v1 = "Some silly value";
let count = 3;

const onPush = event => {
  count++;
  console.log("Part1 Comp You Pushed Me", count);
}

function Part1Comp() {
  return (
    <div>
      <h1>Hello from Part1Comp {count}</h1>
      <h2>{v1}</h2>
      <button onClick={onPush}>Part1 Push Me</button>
    </div>
  );
}

export default Part1Comp;