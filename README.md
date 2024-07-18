Para garantir o funcionamento correto da aplicação, siga estes passos:

Instalação de Dependências:

Navegue até o diretório "\Gest-odetarefas" usando seu terminal, logo após execute "npm i" neste mesmo diretório.
Navegue até o diretório "\Gest-odetarefas\back-end" e execute "npm i" neste diretório e após isso vá ao diretório anterior (Gest-odetarefas).
Navegue até o diretório "\Gest-odetarefas\front-end" e execute "npm i" no terminal, após isso, execute "npm i mdb-react-ui-kit" para as dependências do bootstrap.
Retorne para o diretório "\Gest-odetarefas".
Após estes passos, você deve estar no diretório "\Gest-odetarefas".

Configuração do Banco de Dados:

Verifique se o MySQL está configurado e se o seu serviço está em execução na sua máquina.
Configure extensões e plugins necessários no seu ambiente de desenvolvimento para interagir com o MySQL.
Navegue até o diretório back-end\db, após isso, vá até o arquivo "conn.js" e altere as configurações padrão para as suas credenciais e o banco ao qual irá se conectar. 

Configuração do servidor Back-end:

Navegue até a pasta back-end.
Nesse diretório vá ate o arquivo server.js e na Constante "port" defina a porta que o servidor Back-end irá rodar, por padrão a porta é "3000".
OBS:O terminal informa apenas o texto pré configurado no arquivo package.json, então caso a porta seja alterada, o terminal ainda irá informar que a porta do servidor back-end é "3000"(apenas visual).

Configuração do Arquivo vite.config.js:

Navegue até a pasta front-end.
Nesse diretório, edite o arquivo "vite.config.js" com as seguintes configurações:

Dentro do arquivo js, !CASO NÃO EXISTIR!, apague todas as linhas e adicione o comando a seguir para configurar a conexão com o Back-end da aplicação:
--copie apartir da linha abaixo deste ponto.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})

--até a acima deste.
OBS: Substitua a porta caso a mesma tenha sido alterada no arquivo "server.js".

Isso define a rota que o front-end da aplicação enviará as requisições para o servidor back-end.

Inicialização dos Servidores:

Certifique-se de estar no diretório "\Gest-odetarefas".
No terminal digite: npm start
Isso iniciará os dois servidores da aplicação.

Visualização da Aplicação:

Após iniciar ambos os servidores, você pode acessar o site através do link localhost:(porta) exibido no terminal ou 127.0.0.1:(porta) dependendo da maquina.
Certifique-se de usar as portas corretas configuradas nos scripts de inicialização, como localhost:5173 para o cliente e localhost:3000 (ou a porta especificada no server.js) para o servidor.
Seguindo esses passos, você estará pronto para desenvolver e visualizar sua aplicação localmente, garantindo que todas as configurações e dependências estejam corretamente configuradas.
