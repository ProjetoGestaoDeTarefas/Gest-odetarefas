//ESTES ARQUIVOS SERVEM APENAS COMO BASE DE CRUD
//DELETE

import { doc, updateDoc, deleteField } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";
import { db } from "./Firebase/Firebase";

const taskRef = doc(db, 'taks', 'b51ZPJHYllW8SC6ANlqc');/*AQUI TEM Q SER O ID DO !DOCUMENTO! QUE VOCE DESEJA APAGAR O CAMPO*/

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
     {/*Pelo que eu vi no firebase, não é recomendado apagar coleções por aqui.*/}
      <button onClick={delDoc}>Deleta um documento da coleção</button>
      {/*Deleta um documento da coleção Task*/}
      <button onClick={deleteTaskField}>Deleta um campo do documento</button>
      {/*Deleta um campo do documento cujos parametros passados*/}
    </>
  );
}
