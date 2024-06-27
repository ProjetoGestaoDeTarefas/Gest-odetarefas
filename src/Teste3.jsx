//ESTES ARQUIVOS SERVEM APENAS COMO BASE DE CRUD
//UPDATE

import { doc, updateDoc } from "firebase/firestore";
import { db } from "./Firebase/Firebase";

const taskqueseraupdatada = doc(db, "task", "WJOD98z6DJA0dGbgSgCY"/*AQUI TEM Q SER O ID DO !DOCUMENTO! QUE VOCE DESEJA ALTERAR*/);
const taskdados = {
    title: "teste de update",
    description: "espero q tenha dado certo to usando esse documento para a maioria dos testes"
  };
export default function Teste3() {
    const updateTask = async () => {
        await updateDoc(taskqueseraupdatada, taskdados)
      }
      
  return (
    <button onClick={updateTask}>Atualizar Tarefa</button>
  )
}
