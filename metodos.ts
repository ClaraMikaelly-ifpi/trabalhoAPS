import pool from './db'; // Importa o pool de conexões do arquivo db.ts
import { Cliente, Atendente, Pedido, ItemPedido, Sabores, NotaFiscal, DadosLogin } from './classes'; // Importa as classes

// Interface para acesso a dados (opcional)
interface AuthDAO {
    login(dadosLogin: DadosLogin): Promise<Atendente | null>;
}

// Classe de acesso a dados para autenticação
class AuthPostgreSQL implements AuthDAO {
    async login(dadosLogin: DadosLogin): Promise<Atendente | null> {
        const client = await pool.connect();
        try {
            const result = await client.query(
                'SELECT * FROM ATENDENTE WHERE NOME_ATENDENTE = $1 AND SENHA = $2', // Adapte a consulta para sua tabela ATENDENTE
                [dadosLogin.getLogin(), dadosLogin.getSenha()]
            );
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                return null;
            }
        } finally {
            client.release();
        }
    }
}

// Método para fazer login
async function fazerLogin(dadosLogin: any): Promise<Atendente | null> {
    const dadosLoginObj = new DadosLogin(dadosLogin.login, dadosLogin.senha);
    const authDAO = new AuthPostgreSQL();
    const atendente = await authDAO.login(dadosLoginObj);
    return atendente;
}

// ... (código para cadastrar pedido - PedidoPostgreSQL e cadastrarPedido)
interface PedidoDAO {
    cadastrar(pedido: Pedido, itensPedido: ItemPedido[]): Promise<NotaFiscal>;
}

// Classe de acesso a dados (exemplo com PostgreSQL e biblioteca pg)
class PedidoPostgreSQL implements PedidoDAO {
    async cadastrar(pedido: Pedido, itensPedido: ItemPedido[]): Promise<NotaFiscal> {
        const client = await pool.connect(); // Utiliza o pool importado
        try {
            await client.query('BEGIN'); // Inicia uma transação

            // Insere o pedido na tabela PEDIDO
            const resultPedido = await client.query(
                'INSERT INTO PEDIDO (ID_CLIENTE, COD_ATENDENTE, OBSERVACAO) VALUES ($1, $2, $3) RETURNING COD_PEDIDO',
                [pedido.getIdCliente(), pedido.getCodAtendente(), pedido.getObservacao()]
            );

            const codPedido = resultPedido.rows[0].cod_pedido;
            pedido.setCodPedido(codPedido); // Atualiza o código do pedido

            // Insere os itens do pedido na tabela ITEM_PEDIDO
            for (const itemPedido of itensPedido) {
                await client.query(
                    'INSERT INTO ITEM_PEDIDO (COD_PIZZA, COD_PEDIDO, QUANTIDADE) VALUES ($1, $2, $3)',
                    [itemPedido.getCodPizza(), codPedido, itemPedido.getQuantidade()]
                );
            }

            // Busca os dados do cliente, atendente e pizzaria para a nota fiscal
            const cliente = await this.buscarCliente(client, pedido.getIdCliente());
            const atendente = await this.buscarAtendente(client, pedido.getCodAtendente());
            const pizzaria = await this.buscarPizzaria(client);

            // Calcula o valor total do pedido
            const valorTotal = await this.calcularValorTotal(client, codPedido);

            // Cria a nota fiscal
            const notaFiscal = new NotaFiscal(
                0, // ID será gerado pelo banco de dados
                codPedido,
                cliente.getNomeCliente(),
                cliente.getLogradouro(),
                cliente.getNumero(),
                cliente.getBairro(),
                cliente.getCidade(),
                cliente.getTelefoneContato(),
                pizzaria.getTelefone(),
                pizzaria.getCnpj(),
                pizzaria.getNome(),
                pizzaria.getRazaoSocial(),
                pedido,
                valorTotal,
                atendente.getCodAtendente(),
                atendente.getNomeAtendente()
            );

            await client.query('COMMIT'); // Confirma a transação

            return notaFiscal;
        } catch (error) {
            await client.query('ROLLBACK'); // Desfaz a transação em caso de erro
            throw error; // Lança o erro para ser tratado
        } finally {
            client.release(); // Libera a conexão de volta para o pool
        }
    }

    private async buscarCliente(client: any, idCliente: number): Promise<Cliente> {
        const result = await client.query('SELECT * FROM CLIENTE WHERE ID_CLIENTE = $1', [idCliente]);
        return result.rows[0];
    }

    private async buscarAtendente(client: any, codAtendente: number): Promise<Atendente> {
        const result = await client.query('SELECT * FROM ATENDENTE WHERE COD_ATENDENTE = $1', [codAtendente]);
        return result.rows[0];
    }

    private async buscarPizzaria(client: any): Promise<Pizzaria> {
        const result = await client.query('SELECT * FROM PIZZARIA'); // Adapte a consulta para sua tabela PIZZARIA
        return result.rows[0];
    }

    private async calcularValorTotal(client: any, codPedido: number): Promise<number> {
        const result = await client.query(
            'SELECT SUM(ITEM_PEDIDO.QUANTIDADE * TIPOS.PRECO) AS valor_total FROM ITEM_PEDIDO INNER JOIN SABORES ON ITEM_PEDIDO.COD_PIZZA = SABORES.COD_PIZZA INNER JOIN TIPOS ON SABORES.COD_TIPO = TIPOS.COD_TIPO WHERE ITEM_PEDIDO.COD_PEDIDO = $1',
            [codPedido]
        );
        return result.rows[0].valor_total || 0;
    }
}
// Adaptação do método cadastrarPedido para pegar dados do atendente logado
async function cadastrarPedido(dadosPedido: any, itensPedido: any[], atendente: Atendente): Promise<NotaFiscal> {
    // Cria objetos Pedido e ItemPedido
    const pedido = new Pedido(
        0, // ID será gerado pelo banco de dados
        dadosPedido.idCliente,
        atendente.getCodAtendente(), // Utiliza o código do atendente logado
        dadosPedido.observacao,
        new Date() // Data e hora atual
    );

    const pedido = new Pedido(
        0, // ID será gerado pelo banco de dados
        dadosPedido.idCliente,
        dadosPedido.codAtendente,
        dadosPedido.observacao,
        new Date() // Data e hora atual
    );

    const itensPedidoObj = itensPedido.map((item) => {
        return new ItemPedido(0, item.codPizza, 0, item.quantidade); // ID será gerado pelo banco de dados
    });

    const pedidoDAO = new PedidoPostgreSQL();
    const notaFiscal = await pedidoDAO.cadastrar(pedido, itensPedidoObj);

    return notaFiscal;
}

// Exemplo de uso
const dadosLogin = {
    login: 'nome_do_atendente',
    senha: 'senha_do_atendente',
};

fazerLogin(dadosLogin)
    .then((atendente) => {
        if (atendente) {
            console.log('Login realizado com sucesso:', atendente);
            const dadosPedido = {
                idCliente: 1,
                observacao: 'Observações do pedido',
            };

            const itensPedido = [
                { codPizza: 101, quantidade: 2 },
                { codPizza: 201, quantidade: 1 },
            ];

            cadastrarPedido(dadosPedido, itensPedido, atendente) // Passa o atendente logado para a função
                .then((notaFiscal) => {
                    console.log('Pedido cadastrado com sucesso:', notaFiscal);
                })
                .catch((error) => {
                    console.error('Erro ao cadastrar pedido:', error);
                });
        } else {
            console.log('Login e/ou senha inválidos!');
        }
    })
    .catch((error) => {
        console.error('Erro ao fazer login:', error);
    });

    export class Pizzaria {
        private cnpj: string;
        private nome: string;
        private razaoSocial: string;
        private telefone: string;
    
        constructor(cnpj: string, nome: string, razaoSocial: string, telefone: string) {
            this.cnpj = cnpj;
            this.nome = nome;
            this.razaoSocial = razaoSocial;
            this.telefone = telefone;
        }
    
        // Getters e setters para cada atributo
        public getCnpj(): string { return this.cnpj; }
        public setCnpj(cnpj: string): void { this.cnpj = cnpj; }
    
        public getNome(): string { return this.nome; }
        public setNome(nome: string): void { this.nome = nome; }
    
        public getRazaoSocial(): string { return this.razaoSocial; }
        public setRazaoSocial(razaoSocial: string): void { this.razaoSocial = razaoSocial; }
    
        public getTelefone(): string { return this.telefone; }
        public setTelefone(telefone: string): void { this.telefone = telefone; }
    }

    class Pedido {
        private codPedido: number;
        private idCliente: number;
        private codAtendente: number;
        private observacao: string;
        private dataPedido: Date;
    
        constructor(codPedido: number, idCliente: number, codAtendente: number, observacao: string, dataPedido: Date) {
            this.codPedido = codPedido;
            this.idCliente = idCliente;
            this.codAtendente = codAtendente;
            this.observacao = observacao;
            this.dataPedido = dataPedido;
        }
    
        public getCodPedido(): number {
            return this.codPedido;
        }
    
        public setCodPedido(codPedido: number): void {
            this.codPedido = codPedido;
        }
    
        public getIdCliente(): number {
            return this.idCliente;
        }
    
        public setIdCliente(idCliente: number): void {
            this.idCliente = idCliente;
        }
    
        public getCodAtendente(): number {
            return this.codAtendente;
        }
    
        public setCodAtendente(codAtendente: number): void {
            this.codAtendente = codAtendente;
        }
    
        public getObservacao(): string {
            return this.observacao;
        }
    
        public setObservacao(observacao: string): void {
            this.observacao = observacao;
        }
    
        public getDataPedido(): Date {
            return this.dataPedido;
        }
    
        public setDataPedido(dataPedido: Date): void {
            this.dataPedido = dataPedido;
        }
    }
