//ESTES ARQUIVOS SERVEM APENAS COMO BASE DE CRUD
//DELETE

import { doc, updateDoc, deleteField } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";
import { db } from "./Firebase/Firebase";

const taskRef = doc(db, 'task', 'WJOD98z6DJA0dGbgSgCY');/*AQUI TEM Q SER O ID DO !DOCUMENTO! QUE VOCE DESEJA APAGAR O CAMPO*/

export default function Teste4() {
    //delete de campo
    const deleteTaskField = async() =>{
    await updateDoc(taskRef, {description: deleteField()});
    }


    //delete de documento
    const delDoc = async() =>{
    await deleteDoc(taskRef);
    }



  return (
    <>
    <button onClick={delDoc}>Deleta um documento da coleção Task</button>
    <button onClick={deleteTaskField}>Deleta um campo da Tarefa</button>
    </>
  )
}
