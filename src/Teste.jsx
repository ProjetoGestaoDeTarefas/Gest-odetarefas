//ESTES ARQUIVOS SERVEM APENAS COMO BASE DE CRUD
//REQUEST

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
            <div>{e?.data?.title}
                <div>
                    {e?.data?.description}
                    <div>
                        {e?.data?.status}
                    </div>
                </div>
            </div>
        )
    })
)}