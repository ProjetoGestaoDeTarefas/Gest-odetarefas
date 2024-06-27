import styles from './ProjetoEdit.module.css'
import Table from 'react-bootstrap/Table';

export function ProjetoEdit(){
    return(
      <div style={{paddingLeft:'300px',
        display:'flex',
                   justifyContent: 'center',
                   alignItems: 'center',
         }}>
        <Table  striped="columns">
        <thead className={styles.cabecalho}>
          <tr>
            <th></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          
        </tbody>
      </Table>
      </div>
    )
}