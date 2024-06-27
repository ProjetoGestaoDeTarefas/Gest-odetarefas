//ESTES ARQUIVOS SERVEM APENAS COMO BASE DE CRUD // https://firebase.google.com/docs/firestore/manage-data/add-data?hl=pt&authuser=1
//CREATE

import { collection, doc, addDoc } from "firebase/firestore"; //às vezes não há um ID significativo para o documento e é mais conveniente permitir que o Cloud Firestore gere automaticamente um ID para você. Você pode fazer isso chamando os métodos add()
import { setDoc, Timestamp } from "firebase/firestore";// Para criar ou substituir um único documento, use os métodos set()
import { db } from "./Firebase/Firebase";//instancia importando as configurações do Firebase

//por favor façam os testes olhando o banco de dados e a pagina ao mesmo tempo.

//aqui foram declarados alguns objetos e classes...
const task = {
  title: "totesnaoasd",
  description: "That a new task",
};

const docData = {
    stringExample: "Hello world!",
    booleanExample: true,
    numberExample: 3.14159265,
    dateExample: Timestamp.fromDate(new Date("December 10, 1815")),//"Date.now()" tambem funciona para pegar a data no momento em que o botao é pressionado.
    arrayExample: [5, true, "hello"],
    nullExample: null,
    objectExample: {
        a: 5,
        b: {
            nested: "foo"
        }
    }
};

class City {
    constructor (name, state, country ) {
        this.name = name;
        this.state = state;
        this.country = country;
    }
    toString() {
        return this.name + ', ' + this.state + ', ' + this.country;
    }
}
//objetos e classes terminam aqui.


/*NAO PODE PASSAR O ID QUE VOCE DESESJA↓*/// Ñ faz alterações por conta desse mesmo motivo. !!!!!!SEMPRE CRIA UM DOCUMENTO NOVO COM UM ID ALEATORIO
const taskRefColection = (collection(db, "task"));

/*DEVE PASSAR O ID QUE VOCE DESESJA ↓*/// Faz alteraçoes no documento. !!!!!!! "setDoc" ALTERA O DOCUMENTO INTEIRO, ele REESCREVE totalmente o documento, a menos que você especifique que os dados devem ser mesclados no documento existente.
const taskRefDoc = doc(db, "task", "Bagunça");



// Firestore conversor de dados
//Usar objetos Map ou Dictionary para representar seus documentos geralmente não é muito conveniente, portanto, o Cloud Firestore converte os objetos em tipos de dados compatíveis.
const cityConverter = {
    toFirestore: (city) => {
        return {
            name: city.name,
            state: city.state,
            country: city.country
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new City(data.name, data.state, data.country);
    }
};

export default function Teste2() {
    const addTask = async () => {
      await addDoc(taskRefColection, task);
      //Em addDoc(), o primeiro parâmetro tem que ser a referência da Coleção que voce deseja adicionar o documento por exemplo "(collection("instancia do seu banco", "Nome da coleção"))"
      //O segundo parâmetro tem que ser o objeto que voce deseja adicionar no documento, que sera criado junto com ele.
    };

    const setTask = async () => {
        await setDoc(taskRefDoc, task);
        //Em setDoc(), o primeiro parâmetro tem que ser a referência do documento que voce deseja adicionar o documento por exemplo "doc("instancia do seu banco", "Nome da coleção", "id do documento")"
        //O segundo parâmetro tem que ser o objeto que voce deseja adicionar no documento, que sera CRIADO junto com ele, ou ALTERADO caso o ID seja Existente. Lembre-se, a ALTERAÇÃO é no documento INTEIRO.
        /*Se você não tiver certeza se o documento existe, passe a opção de mesclar os novos dados com qualquer documento existente para evitar a substituição de documentos inteiros. Para documentos contendo mapas, observe que especificar um conjunto com um campo contendo um mapa vazio substituirá o campo de mapa do documento de destino.*/

    };

    //O Cloud Firestore permite gravar vários tipos de dados em um documento, incluindo strings, booleanos, números, datas, nulos e matrizes e objetos aninhados. O Cloud Firestore sempre armazena números duplos, independentemente do tipo de número usado no código.
    const setTaskWALLDATATYPE = async () => {
        await setDoc(taskRefDoc, docData);
    }
    const setTaskWALLDATATYPe = async () => {
        await addDoc(taskRefColection, docData);
    }
    
    //O Cloud Firestore oferece suporte à gravação de documentos com classes personalizadas.
    const refdocClass = doc(db, "task", "LA").withConverter(cityConverter);
    const setTaskDocClass = async() => {
        await setDoc(refdocClass, new City("Los Angeles", "CA", "USA"));
    }
    const refColClass = (collection(db, "task")).withConverter(cityConverter);
    const setTaskColClass = async() => {
        await addDoc(refColClass, new City("Los Angeles", "CA", "USA"));
    }
    return (
    <>
      <button onClick={addTask}>Criar Documento via addDoc</button>
      <button onClick={setTask}>Criar/Alterar Documento via setDoc</button>
      <button onClick={setTaskWALLDATATYPE}>Criar/Alterar Documento com varios tipos de Dados via setDoc</button>
      <button onClick={setTaskWALLDATATYPe}>Criar Documento com varios tipos de Dados via addDoc</button>
      <button onClick={setTaskDocClass}>Criar/Alterar Documento Baseado em um Classe via setDoc</button>
      <button onClick={setTaskColClass}>Criar Documento Baseado em um Classe via addDoc</button>
    </>
    );
  }



