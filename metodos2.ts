import pool from './db';
import { Pedido, ItemPedido, NotaFiscal, Cliente, Atendente, Pizzaria} from './classes';

interface PedidoDAO {
    cadastrar(pedido: Pedido, itensPedido: ItemPedido[]): Promise<NotaFiscal>;
}

class PedidoPostgreSQL implements PedidoDAO {
    async cadastrar(pedido: Pedido, itensPedido: ItemPedido[]): Promise<NotaFiscal> {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const resultPedido = await client.query(
                'INSERT INTO PEDIDO (ID_CLIENTE, COD_ATENDENTE, OBSERVACAO) VALUES ($1, $2, $3) RETURNING COD_PEDIDO',
                [pedido.getIdCliente(), pedido.getCodAtendente(), pedido.getObservacao()]
            );

            const codPedido = resultPedido.rows[0].cod_pedido;
            pedido.setCodPedido(codPedido);

            for (const itemPedido of itensPedido) {
                await client.query(
                    'INSERT INTO ITEM_PEDIDO (COD_PIZZA, COD_PEDIDO, QUANTIDADE) VALUES ($1, $2, $3)',
                    [itemPedido.getCodPizza(), codPedido, itemPedido.getQuantidade()]
                );
            }

            const cliente = await this.buscarCliente(client, pedido.getIdCliente());
            const atendente = await this.buscarAtendente(client, pedido.getCodAtendente());
            const pizzaria = await this.buscarPizzaria(client);

            const valorTotal = await this.calcularValorTotal(client, codPedido);

            const notaFiscal = new NotaFiscal(
                0,
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

            await client.query('COMMIT');

            return notaFiscal;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
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

async function cadastrarPedido(dadosPedido: any, itensPedido: any[], atendente: Atendente): Promise<NotaFiscal> {
    // Cria objetos Pedido e ItemPedido
    const pedido = new Pedido(
        0, // ID será gerado pelo banco de dados
        dadosPedido.idCliente,
        atendente.getCodAtendente(), // Utiliza o código do atendente logado
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

interface ClienteDAO {
    cadastrar(cliente: Cliente): Promise<void>;
}

export class ClientePostgreSQL implements ClienteDAO {
    async cadastrar(cliente: Cliente): Promise<void> {
        const client = await pool.connect();
        try {
            await client.query('BEGIN'); // Inicia uma transação

            const result = await client.query(
                'INSERT INTO CLIENTE (NOME_CLIENTE, NOME_COMPLETO, LOGRADOURO, NUMERO, BAIRRO, CIDADE, TELEFONE_CONTATO) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING ID_CLIENTE',
                [
                    cliente.getNomeCliente(),
                    cliente.getNomeCompleto(),
                    cliente.getLogradouro(),
                    cliente.getNumero(),
                    cliente.getBairro(),
                    cliente.getCidade(),
                    cliente.getTelefoneContato(),
                ]
            );

            const idCliente = result.rows[0].id_cliente;
            cliente.setIdCliente(idCliente); // Atualiza o ID do cliente

            await client.query('COMMIT'); // Confirma a transação
        } catch (error) {
            await client.query('ROLLBACK'); // Desfaz a transação em caso de erro
            throw error; // Lança o erro para ser tratado
        } finally {
            client.release(); // Libera a conexão de volta para o pool
        }
    }
}


async function cadastrarCliente(dadosCliente: any): Promise<Cliente> {
    const cliente = new Cliente(
        0, // ID será gerado pelo banco de dados
        dadosCliente.nomeCliente,
        dadosCliente.nomeCompleto,
        dadosCliente.logradouro,
        dadosCliente.numero,
        dadosCliente.bairro,
        dadosCliente.cidade,
        dadosCliente.telefoneContato
    );

    const clienteDAO = new ClientePostgreSQL();
    await clienteDAO.cadastrar(cliente);

    return cliente;
}

// Exemplo de uso
const dadosCliente = {
    nomeCliente: 'Nome do Cliente',
    nomeCompleto: 'Nome Completo do Cliente',
    logradouro: 'Rua Exemplo',
    numero: 123,
    bairro: 'Bairro Exemplo',
    cidade: 'Cidade Exemplo',
    telefoneContato: '123456789',
};

cadastrarCliente(dadosCliente)
    .then((cliente) => {
        console.log('Cliente cadastrado com sucesso:', cliente);
    })
    .catch((error) => {
        console.error('Erro ao cadastrar cliente:', error);
    });
