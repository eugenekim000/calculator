import React, { ReactElement, useEffect, useState } from "react";
import { fireStoreDB } from "../firebase";
import { motion } from "framer-motion";

interface Props {}

interface FirebaseEquationHistory {
  id: number;
  equation: string;
}

export default function History({}: Props): ReactElement {
  const [equationArray, setEquationArray] = useState<any>([]);

  useEffect(() => {
    const unsubscribe = fireStoreDB
      .collection("equation-history")
      .orderBy("timestamp", "desc")
      .limit(10)
      .onSnapshot((snapshot) => {
        setEquationArray(
          snapshot.docs.map((doc) => {
            return { equation: doc.data().equation, id: doc.id };
          })
        );
      });

    return () => unsubscribe();
  }, []);

  return (
    <div className="history">
      {equationArray.map((data: FirebaseEquationHistory) => {
        const { equation, id } = data;
        const equalIndex = equation.indexOf("=");
        const slicedEquation = equation.slice(0, equalIndex + 1);
        const slicedAnswer = equation.slice(equalIndex + 2);

        return (
          <motion.div className="history-item" key={id} layout>
            <div>{slicedEquation}</div>
            <div className="history-answer">{slicedAnswer}</div>
          </motion.div>
        );
      })}
    </div>
  );
}
