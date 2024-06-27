//ESTES ARQUIVOS SERVEM APENAS COMO BASE DE CRUD
//CREATE

import { collection, doc, addDoc } from "firebase/firestore";
import { db } from "./Firebase/Firebase";

const task = {
  title: "totesnaoasd",
  description: "Thasdaoijsuhbdiuaysbdis a new task"
};
const taskRef = (collection(db, "task"));
export default function Teste2() {
    const addTask = async () => {
      await addDoc(taskRef, task);
    };
  
    return (
      <button onClick={addTask}>Adicionar Tarefa</button>
    );
  }
  