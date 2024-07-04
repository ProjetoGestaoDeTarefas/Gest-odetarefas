
class helpDeskDatabase {
  
  initConnection(connection) {
    this.connection = connection; 
    this.initDatabase(); 
  }


  initDatabase() {
    this.connection.connect((error) => {
      if (error) {
        console.log("Ocorreu um erro ao conectar no banco de dados...");
        console.log(error.message); 
        return;
      }
      console.log("Banco de dados conectado com sucesso..."); 
      this.createDatabase(); 
    });
  }

  createDatabase() {
    const sql = "CREATE DATABASE IF NOT EXISTS db_helpDesk";
    this.connection.query(sql, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar o banco de dados..."); 
        console.log(error.message); 
        return;
      }
      console.log("Banco de dados criado com sucesso..."); 
      this.connection.query("USE db_helpDesk", (error) => {
        if (error) {
          console.log("Ocorreu um erro ao selecionar o banco de dados..."); 
          return;
        }
        console.log("Banco de dados selecionado com sucesso..."); 
        this.createTableStatus();
        this.createTableUsers();  
        this.createTableEquipe();
        this.createTableProjeto(); 
        this.createTableTarefa(); 
        this.createTableUserTeam();
        this.createInsertStatus();
    });
  });
}

  createTableStatus() {
    const sql = `
      CREATE TABLE IF NOT EXISTS status(  
          id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
          descricao VARCHAR(60)
      ) COMMENT 'Tabela Status que faz referencia na tabela tarefa';
      `;

    this.connection.query(sql, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar a tabela status..."); 
        console.log(error.message); 
        return;
      }
      console.log("Tabela status criada com sucesso..."); 
    });
  }
  createTableProjeto() {
    const sql = `
    create table projetos (
      id int auto_increment primary key,
        name varchar(200) not null,
        descricao text,
        start_date date,
        end_date date,
        created_by int,
        FOREIGN KEY (created_by) REFERENCES users(id),
        created_at timestamp default current_timestamp
    );
      `;

    this.connection.query(sql, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar a tabela projetos..."); 
        console.log(error.message); 
        return;
      }
      console.log("Tabela projetos criada com sucesso..."); 
    });
  }
  createTableEquipe() {
    const sql = `
    create table equipes (
      id int auto_increment primary key,
        name varchar(200) not null
    );
      `;

    this.connection.query(sql, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar a tabela equipes..."); 
        console.log(error.message); 
        return;
      }
      console.log("Tabela equipes criada com sucesso..."); 
    });
  }
  createTableUsers() {
    const sql = `
    create table users (
      id int auto_increment primary key,
        name varchar(200) not null,
        email varchar(100) not null unique,
        password varchar(255) not null,
        role enum('admin', 'member') default 'member',
        created_at timestamp default current_timestamp
    );    
      `;

    this.connection.query(sql, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar a tabela Usuários..."); 
        console.log(error.message); 
        return;
      }
      console.log("Tabela Usuários criada com sucesso..."); 
    });
  }

  createTableTarefa() {
    const sql = `
    create table tarefas (
      id int auto_increment primary key,
        title varchar(200) not null,
        description text,
        start_date date,
        end_date date,
        priority enum('low', 'medium', 'high') default 'medium',
        project_id int,
        assigned_to int,
        FOREIGN KEY (project_id) REFERENCES projetos(id),
        FOREIGN KEY (assigned_to) REFERENCES users(id),
        created_at timestamp default current_timestamp
    );
      `;

    this.connection.query(sql, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar a tabela tarefa..."); 
        console.log(error.message); 
        return;
      }
      console.log("Tabela tarefa criada com sucesso..."); 
    });
  }
  createTableUserTeam() {
    const sql = `  
    create table user_team (
      id int auto_increment primary key,
        start_date date,
        end_date date,
      team_id int,
        member_id int,
        FOREIGN KEY (team_id) REFERENCES equipes(id),
        FOREIGN KEY (member_id) REFERENCES users(id)
    );
      `;

    this.connection.query(sql, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar a tabela relacional user_team ..."); 
        console.log(error.message); 
        return;
      }
      console.log("Tabela relacional user_team  criada com sucesso..."); 
    });
  }
  createInsertStatus() {
    // Definindo a consulta para contar o número de registros na tabela
    let contadorQuery = `SELECT COUNT(*) AS count FROM status`;
    
    // Executando a consulta para contar os registros
    this.connection.query(contadorQuery, (error, results) => {
      if (error) {
        console.log("Erro ao verificar os registros na tabela 'status':", error.message);
        return;
      }
  
      // Verificando o resultado da contagem
      let contador = results[0].count;
      if (contador === 0) {
        // Se não houver registros, inserir novos registros
        let sql = `
          INSERT INTO status (descricao) VALUES ('Aberto'),
                                                ('Em Analise'),
                                                ('Encaminhado Desenvolvimento'),
                                                ('Finalizado');
        `;
        
        // Executando a consulta para inserir novos registros
        this.connection.query(sql, (insertError) => {
          if (insertError) {
            console.log("Erro ao criar registros na tabela 'status':", insertError.message);
            return;
          }
          console.log("Registros criados com sucesso na tabela 'status'...");
        });
      } else {
        console.log("A tabela 'status' já contém registros, nenhum novo registro foi inserido.");
      }
    });
  }
  

}

module.exports = new helpDeskDatabase();
