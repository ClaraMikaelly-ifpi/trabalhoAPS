import pool from './db'; // Importa o pool de conexões do arquivo db.ts
import { Atendente } from './atendente'; // Importa a classe Atendente
import { DadosLogin } from './dados_login'; // Importa a classe DadosLogin

interface AuthDAO {
    login(dadosLogin: DadosLogin): Promise<Atendente | null>;
}

export class AuthPostgreSQL implements AuthDAO {
    async login(dadosLogin: DadosLogin): Promise<Atendente | null> {
        const client = await pool.connect();
        try {
            const result = await client.query(
                'SELECT * FROM ATENDENTE WHERE NOME_ATENDENTE = $1 AND SENHA = $2', // Adapte a consulta para sua tabela ATENDENTE
                [dadosLogin.getLogin(), dadosLogin.getSenha()]
            );
            if (result.rows.length > 0) {
                const atendenteData = result.rows[0];
                const atendente = new Atendente(
                    atendenteData.cod_atendente,
                    atendenteData.nome_atendente,
                    atendenteData.senha
                );
                return atendente;
            } else {
                return null;
            }
        } finally {
            client.release();
        }
    }
}
