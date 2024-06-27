import "./Home.module.css"
import React from 'react';

export function Home(){

    return(
        <div className="home-container">
        <header className="home-header">
          <h1>Gestão de Tarefas</h1>
          <p>Organize suas tarefas de forma eficiente</p>
        </header>
        <section className="home-content">
          <div className="card">
            <h2>Criar Tarefa</h2>
            <p>Adicione novas tarefas para gerenciar seu tempo e produtividade.</p>
          </div>
          <div className="card">
            <h2>Visualizar Tarefas</h2>
            <p>Veja todas as suas tarefas em um único lugar.</p>
          </div>
          <div className="card">
            <h2>Relatórios</h2>
            <p>Gere relatórios para acompanhar seu progresso.</p>
          </div>
        </section>
      </div>
    )
}