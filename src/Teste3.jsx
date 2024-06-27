//ESTES ARQUIVOS SERVEM APENAS COMO BASE DE CRUD
//UPDATE

import { doc, updateDoc } from "firebase/firestore";//Para atualizar alguns campos de um documento sem substituir todo o documento, use os métodos update()
import { db } from "./Firebase/Firebase";

//doc(db, "Coleção","IDentificador");
//*deve ser async*  await updateDoc(variavel que recebe o codigo acima, dado a ser adicioando no lugar)
const taskqueseraupdatada = doc(db, "taks", "b51ZPJHYllW8SC6ANlqc");//AQUI TEM Q SER O ID DO !DOCUMENTO! QUE VOCE DESEJA ALTERAR
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
