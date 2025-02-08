import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres', // Usuário do PostgreSQL
  host: '127.0.0.1', // Host do PostgreSQL
  database: 'pizzaria CS',
  password: '2710lc',
  port: 5432, // Porta padrão do PostgreSQL
});

export default pool;
