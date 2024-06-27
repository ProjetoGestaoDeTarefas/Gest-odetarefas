//ESTES ARQUIVOS SERVEM APENAS COMO BASE DE CRUD
//REQUEST
//Aqui é onde puxamos os dados do Banco Firebase
import { useState, useEffect } from "react";
import { db } from "./Firebase/Firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

export default function Teste() {

    const [tarefas, setTarefas] = useState([]);

    useEffect(()=>{
        const q = query(collection(db, "task"));
        onSnapshot(q, (querySnapshot) => {
            setTarefas(querySnapshot.docs.map(doc=>({
                data: doc.data()
            })))
        });
    },[])

  return (

    tarefas.map(function (e, val) {
        return (
            <div className="list">
            <ol>
                <li>{e?.data?.title}</li>
                <li>{e?.data?.description}</li>
                <li>{e?.data?.status}</li>
            </ol>
            </div>
        )
    })
)}