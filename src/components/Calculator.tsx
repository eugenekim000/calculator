import React, { ReactElement } from "react";

interface Props {}

export default function Calculator({}: Props): ReactElement {
  return (
    <div className="calculator">
      <div className="calculator-header">Header</div>
      <div className="calculator-buttons">
        <button></button>
        <button>C</button>
        <button>x</button>
        <button>÷</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>X</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>-</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>+</button>
        <button>+/-</button>
        <button>0</button>
        <button>.</button>
        <button>=</button>
      </div>
    </div>
  );
}
