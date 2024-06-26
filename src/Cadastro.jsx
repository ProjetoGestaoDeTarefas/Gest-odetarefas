import "./cadastro.module.css"
// import React, { useState } from 'react';

// import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';


function Cadastro() {


return(

<div className="container-cadastro">
      <div className="cadastro">
      <h3>Criar conta</h3>
      <form>
        <div className="infos">
        <label htmlFor="username"> Email: </label>
        <input type="text" id="username" name="username" placeholder="email@gmail.com" />

        <label htmlFor="password"> Senha: </label>
        <input type="password" id="password" name="password" placeholder="senha"/>
        </div>

        <h6 > ou continue com </h6>

        <button className="btn-google" type="submit"> Google</button>

        <button className="btn-git" type="submit"> Github</button>


        <div className="servEpriv">
        <input type="checkbox" id="termos" name="termos" />
        <label id="termos" >Eu aceito os termos de serviços e politica de privacidade</label> 
        </div>
        <button className="btn-cadastro" type="submit"> Cadastrar</button>


        <hr />
        <h6> Já tem uma conta? </h6>

        <button className="btn-log" type="submit"> Login</button>

      
      </form>
      </div>
    </ div>
)
}

export default Cadastro;
