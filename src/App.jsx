import './App.css'
import  Cadastro  from './Cadastro';
import { db } from './Firebase/Firebase';
import Teste2 from './Teste2';
import Teste from './Teste';
import Teste3 from './Teste3';
import Teste4 from './Teste4';
//npm install -g firebase-tools
 function App() {

  return (
      <div>
        <Teste />
        <Teste2 />
        <Teste3 />
        <Teste4 />
        <Cadastro />
        </div>
     
  )
}



// import { useEffect, useState } from 'react';
// import { initializeApp } from "firebase/app";
// import { getDocs, getFirestore,  collection } from "firebase/firestore";

// const firebaseApp = initializeApp( {
//   apiKey: "AIzaSyDpuex-aY_mW9p-al4e-ulh5avRiZrvnY0",
//   authDomain: "login-cadastro-efe4d.firebaseapp.com",
//   projectId: "login-cadastro-efe4d",
//   storageBucket: "login-cadastro-efe4d.appspot.com",
//   messagingSenderId: "156627490813",
//   appId: "1:156627490813:web:f7fa8fd867e59d6a8f2b94"
// });




//   const [email, setEmail] = useState('');
//   const [senha, setSenha] = useState('');
//   const [login, setLogin] = useState([]);


//   const db = getFirestore(firebaseApp);

//   const usersCollectionRef = collection(db, 'login');

//   useEffect(()=>{
//       const getLogin = async () =>{
//         const data = await getDocs(usersCollectionRef)
//         setLogin (data.docs.map((doc)=>({...doc.data(), id: doc.id})))
//       };
//       getLogin();
//   },[])



    //  <div class="login-container">
    //     <h2>Login</h2>
    //     <form action="/login" method="POST">
    //         <label for="username">Nome de Usuário:</label>
    //         <input type="text" id="username" name="username" required>
            
    //         <label for="password">Senha:</label>
    //         <input type="password" id="password" name="password" required>
            
    //         <button type="submit">Entrar</button>
    //     </form>
    // </div>

    


export default App;
