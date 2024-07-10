import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';

const RedefinirSenha = () => {
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      setMensagem('As senhas não coincidem.');
    } else {

      
      setMensagem('Senha redefinida com sucesso!');
     
      setSenha('');
      setConfirmarSenha('');
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase">Redefinir Senha</h2>
              <form onSubmit={handleSubmit}>
                <MDBInput wrapperClass='mb-2 px-5 w-100 'size='lg' labelClass='text-white' label='Nova Senha' id='novaSenha' type='password'  value={senha} onChange={(e) => setSenha(e.target.value)} required />
                <MDBInput wrapperClass='mb-2 px-5 w-100 'size='lg' labelClass='text-white' label='Confirmar Nova Senha' id='confirmarSenha' type='password' value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required />
                {mensagem && <p className="mensagem">{mensagem}</p>}
                <MDBBtn outline className='mb-2 px-5' color='white' size='lg' type="submit">
                  Redefinir Senha
                </MDBBtn>
              </form>
              <p>
                Voltar para <Link to="/login">Login</Link>
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default RedefinirSenha;
