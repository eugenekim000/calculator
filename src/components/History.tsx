import React, { ReactElement } from "react";

interface Props {}

export default function History({}: Props): ReactElement {
  let testArray = ["1+1", "2+4", "4+2"];
  return (
    <div className="history">
      {testArray.map((item) => (
        <div className="history-item">{item}</div>
      ))}
    </div>
  );
}
