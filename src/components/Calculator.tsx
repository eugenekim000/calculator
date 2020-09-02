import React, { ReactElement, useState } from "react";

interface Props {}

export default function Calculator({}: Props): ReactElement {
  const [headerNumber, setHeaderNumber] = useState("");
  const [totalNumber, setTotalNumber] = useState("");
  const [operator, setOperator] = useState("");

  const handleNumberInput = (numString: string) => {
    setHeaderNumber((prevState) => prevState + numString);
  };

  const handleOperationInput = (operator: string) => {
    const opTable: { [key: string]: (arg1: number, arg2: number) => number } = {
      "/": (num1: number, num2: number) => num1 / num2,
      "+": (num1: number, num2: number) => num1 + num2,
      "-": (num1: number, num2: number) => num1 - num2,
      "*": (num1: number, num2: number) => num1 * num2,
    };

    if (operator && totalNumber !== headerNumber) {
      let number1 = Number(totalNumber);
      let number2 = Number(headerNumber);
      let newNumber = opTable[operator](number1, number2).toString();
      setHeaderNumber(newNumber);
      setTotalNumber(newNumber);
      setOperator("");
    } else {
      setOperator(operator);
    }
  };

  return (
    <div className="calculator">
      <div className="calculator-header">{headerNumber ? headerNumber : 0}</div>
      <div className="calculator-buttons">
        <button></button>
        <button>C</button>
        <button>x</button>
        <button>÷</button>
        <button onClick={() => handleNumberInput("7")}>7</button>
        <button onClick={() => handleNumberInput("8")}>8</button>
        <button onClick={() => handleNumberInput("9")}>9</button>
        <button>X</button>
        <button onClick={() => handleNumberInput("4")}>4</button>
        <button onClick={() => handleNumberInput("5")}>5</button>
        <button onClick={() => handleNumberInput("6")}>6</button>
        <button>-</button>
        <button onClick={() => handleNumberInput("1")}>1</button>
        <button onClick={() => handleNumberInput("2")}>2</button>
        <button onClick={() => handleNumberInput("3")}>3</button>
        <button>+</button>
        <button>+/-</button>
        <button onClick={() => handleNumberInput("0")}>0</button>
        <button onClick={() => handleNumberInput(".")}>.</button>
        <button>=</button>
      </div>
    </div>
  );
}
