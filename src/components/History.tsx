import React, { ReactElement, useEffect, useState } from "react";
import { fireStoreDB } from "../firebase";

interface Props {}

export default function History({}: Props): ReactElement {
  const [equationArray, setEquationArray] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = fireStoreDB
      .collection("equation-history")
      .orderBy("timestamp", "desc")
      .limit(10)
      .onSnapshot((snapshot) => {
        setEquationArray(snapshot.docs.map((doc) => doc.data().equation));
      });

    return () => unsubscribe();
  }, []);

  let testArray = ["1+1", "2+4", "4+2"];
  return (
    <div className="history">
      {equationArray.map((equation) => (
        <div className="history-item">{equation}</div>
      ))}
    </div>
  );
}
