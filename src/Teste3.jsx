//ESTES ARQUIVOS SERVEM APENAS COMO BASE DE CRUD
//UPDATE
//Atenção! updateDoc() somente atualiza Documentos EXISTENTES.

import { doc, updateDoc } from "firebase/firestore";//Para atualizar alguns campos de um documento sem substituir todo o documento, use os métodos update()
import { db } from "./Firebase/Firebase";

//doc(db, "Coleção","IDentificador");
//*deve ser async*  await updateDoc(variavel que recebe o codigo acima, dado a ser adicioando no lugar)
const taskUpdate = doc(db, "task", "LA");//AQUI TEM Q SER O ID DO !DOCUMENTO! QUE VOCE DESEJA ALTERAR
const taskDados = {
    title: "teste de update",
    description: "espero q tenha dado certo to usando esse documento para a maioria dos testes"
  };
export default function Teste3() {
    const updateTask = async () => {
        await updateDoc(taskUpdate, taskDados)
        //Em updateDoc(), o primeiro parâmetro tem que ser a referência do Documento que voce deseja Atualizar o documento por exemplo "doc("instancia do seu banco", "Nome da coleção", "ID do Documento")"
        //O segundo parâmetro tem que ser um objeto com os dados que voce deseja atualizar no documento, por exemplo "const taskDados = {title: "teste de update", description: "espero q tenha dado certo to usando esse documento para a maioria dos testes"}"
        console.log("Tarefa atualizada com sucesso");
  
    }
      
  return (
    <button onClick={updateTask}>Atualizar Tarefa</button>
  )
}
