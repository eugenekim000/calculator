import React, { ReactElement, useState } from "react";
import { fireStoreDB } from "../firebase";
import firebase from "firebase";

interface Props {}

const opTable: { [key: string]: (arg1: number, arg2: number) => number } = {
  "/": (num1: number, num2: number) => num1 / num2,
  x: (num1: number, num2: number) => num1 * num2,
  "+": (num1: number, num2: number) => num1 + num2,
  "-": (num1: number, num2: number) => num1 - num2,
};

const operationArray = ["/", "+", "-", "x"];

export default function Calculator({}: Props): ReactElement {
  const [headerNumber, setHeaderNumber] = useState("");
  const [operatorStack, setOperatorStack] = useState<string[]>([]);
  const [numberStack, setNumberStack] = useState<string[]>([]);
  const [result, setResult] = useState("");
  const [history, setHistory] = useState<string>("");

  const handleNumberInput = (numString: string) => {
    setResult("");
    setHeaderNumber((prevState) => prevState + numString);
  };

  const handleBackspace = () => {
    setHeaderNumber((prevState) => prevState.slice(0, -1));
  };

  const handleClear = () => {
    setHeaderNumber("");
    setOperatorStack([]);
    setNumberStack([]);
    setResult("");
    setHistory("");
  };

  const handleInverse = () => {
    if (headerNumber) {
      if (headerNumber[0] === "-") {
        setHeaderNumber((prevState) => prevState.slice(1));
      } else {
        setHeaderNumber((prevState) => "-" + prevState);
      }
    }
  };

  const handleOperationInput = (operator: string) => {
    //when user clicks a operation mulitple times before selecting a new number
    if (operatorStack.length > 1) {
      setHistory((prevState) => prevState.slice(0, -1) + " " + operator + " ");
      setOperatorStack([operator]);
      return;
    }

    //if we have number and operations execute
    if (numberStack.length && operatorStack.length && headerNumber) {
      console.log(2);
      let number1 = Number(numberStack[0]);
      let number2 = Number(headerNumber);
      let newNumber = opTable[operatorStack[0]](number1, number2).toString();
      setHistory(
        (prevState) => prevState + " " + headerNumber + " " + operator + " "
      );
      setHeaderNumber("");
      setOperatorStack([operator]);
      setNumberStack([newNumber]);
      setResult(newNumber);
    } else if (headerNumber) {
      console.log(3);

      //number or prev operator hasnt been selected yet
      setHistory(headerNumber + " " + operator + " ");
      setNumberStack([headerNumber]);
      setOperatorStack([operator]);
      setHeaderNumber("");
      setResult(headerNumber);
      return;
    }
  };

  const handleEqual = () => {
    const currentTime = firebase.firestore.Timestamp.now();

    if (operatorStack.length && numberStack.length && history) {
      let number1 = Number(numberStack[0]);
      let number2 = headerNumber ? Number(headerNumber) : 0;

      let newNumber = opTable[operatorStack[0]](number1, number2).toString();
      let finalHistory =
        history + " " + number2.toString() + " " + "=" + " " + newNumber;
      fireStoreDB
        .collection("equation-history")
        .add({ timestamp: currentTime, equation: finalHistory });

      setHeaderNumber(newNumber);
      setOperatorStack([]);
      setNumberStack([newNumber]);
      setResult(newNumber);
      setHistory("");
    }
  };

  return (
    <div className="calculator">
      <div className="calculator-header">
        {result ? result : headerNumber ? headerNumber : 0}
      </div>
      <div className="calculator-buttons">
        <button></button>
        <button onClick={() => handleClear()}>C</button>
        <button onClick={() => handleBackspace()}>x</button>
        <button onClick={() => handleOperationInput("/")}>÷</button>
        <button onClick={() => handleNumberInput("7")}>7</button>
        <button onClick={() => handleNumberInput("8")}>8</button>
        <button onClick={() => handleNumberInput("9")}>9</button>
        <button onClick={() => handleOperationInput("x")}>X</button>
        <button onClick={() => handleNumberInput("4")}>4</button>
        <button onClick={() => handleNumberInput("5")}>5</button>
        <button onClick={() => handleNumberInput("6")}>6</button>
        <button onClick={() => handleOperationInput("-")}>-</button>
        <button onClick={() => handleNumberInput("1")}>1</button>
        <button onClick={() => handleNumberInput("2")}>2</button>
        <button onClick={() => handleNumberInput("3")}>3</button>
        <button onClick={() => handleOperationInput("+")}>+</button>
        <button onClick={() => handleInverse()}>+/-</button>
        <button onClick={() => handleNumberInput("0")}>0</button>
        <button onClick={() => handleNumberInput(".")}>.</button>
        <button onClick={() => handleEqual()}>=</button>
      </div>
    </div>
  );
}
