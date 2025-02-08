import { Pool } from 'pg';

export class Cliente {
    private idCliente: number;
    private nomeCliente: string;
    private nomeCompleto: string;
    private logradouro: string;
    private numero: number;
    private bairro: string;
    private cidade: string;
    private telefoneContato: string;

    constructor(idCliente: number, nomeCliente: string, nomeCompleto: string, logradouro: string, numero: number, bairro: string, cidade: string, telefoneContato: string) {
        this.idCliente = idCliente;
        this.nomeCliente = nomeCliente;
        this.nomeCompleto = nomeCompleto;
        this.logradouro = logradouro;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.telefoneContato = telefoneContato;
    }

    public getIdCliente(): number {
        return this.idCliente;
    }

    public setIdCliente(idCliente: number): void {
        this.idCliente = idCliente;
    }

    public getNomeCliente(): string {
        return this.nomeCliente;
    }

    public setNomeCliente(nomeCliente: string): void {
        this.nomeCliente = nomeCliente;
    }

    public getNomeCompleto(): string {
        return this.nomeCompleto;
    }

    public setNomeCompleto(nomeCompleto: string): void {
        this.nomeCompleto = nomeCompleto;
    }

    public getLogradouro(): string {
        return this.logradouro;
    }

    public setLogradouro(logradouro: string): void {
        this.logradouro = logradouro;
    }

    public getNumero(): number {
        return this.numero;
    }

    public setNumero(numero: number): void {
        this.numero = numero;
    }

    public getBairro(): string {
        return this.bairro;
    }

    public setBairro(bairro: string): void {
        this.bairro = bairro;
    }

    public getCidade(): string {
        return this.cidade;
    }

    public setCidade(cidade: string): void {
        this.cidade = cidade;
    }

    public getTelefoneContato(): string {
        return this.telefoneContato;
    }

    public setTelefoneContato(telefoneContato: string): void {
        this.telefoneContato = telefoneContato;
    }
}

class DadosLogin {
    private login: string;
    private senha: string;

    constructor(login: string, senha: string) {
        this.login = login;
        this.senha = senha;
    }

    public getLogin(): string {
        return this.login;
    }

    public setLogin(login: string): void {
        this.login = login;
    }

    public getSenha(): string {
        return this.senha;
    }

    public setSenha(senha: string): void {
        this.senha = senha;
    }
}

class Tipos {
    private codTipo: number;
    private nome: string;
    private tamanho: string;
    private preco: number;

    constructor(codTipo: number, nome: string, tamanho: string, preco: number) {
        this.codTipo = codTipo;
        this.nome = nome;
        this.tamanho = tamanho;
        this.preco = preco;
    }

    public getCodTipo(): number {
        return this.codTipo;
    }

    public setCodTipo(codTipo: number): void {
        this.codTipo = codTipo;
    }

    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public getTamanho(): string {
        return this.tamanho;
    }

    public setTamanho(tamanho: string): void {
        this.tamanho = tamanho;
    }

    public getPreco(): number {
        return this.preco;
    }

    public setPreco(preco: number): void {
        this.preco = preco;
    }
}

class Sabores {
    private codPizza: number;
    private nomePizza: string;
    private codTipo: number;

    constructor(codPizza: number, nomePizza: string, codTipo: number) {
        this.codPizza = codPizza;
        this.nomePizza = nomePizza;
        this.codTipo = codTipo;
    }

    public getCodPizza(): number {
        return this.codPizza;
    }

    public setCodPizza(codPizza: number): void {
        this.codPizza = codPizza;
    }

    public getNomePizza(): string {
        return this.nomePizza;
    }

    public setNomePizza(nomePizza: string): void {
        this.nomePizza = nomePizza;
    }

    public getCodTipo(): number {
        return this.codTipo;
    }

    public setCodTipo(codTipo: number): void {
        this.codTipo = codTipo;
    }
}

export class Atendente {
    private codAtendente: number;
    private nomeAtendente: string;

    constructor(codAtendente: number, nomeAtendente: string) {
        this.codAtendente = codAtendente;
        this.nomeAtendente = nomeAtendente;
    }

    public getCodAtendente(): number {
        return this.codAtendente;
    }

    public setCodAtendente(codAtendente: number): void {
        this.codAtendente = codAtendente;
    }

    public getNomeAtendente(): string {
        return this.nomeAtendente;
    }

    public setNomeAtendente(nomeAtendente: string): void {
        this.nomeAtendente = nomeAtendente;
    }
}

export class Pedido {
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

export class ItemPedido {
    private idItemPedido: number;
    private codPizza: number;
    private codPedido: number;
    private quantidade: number;

    constructor(idItemPedido: number, codPizza: number, codPedido: number, quantidade: number) {
        this.idItemPedido = idItemPedido;
        this.codPizza = codPizza;
        this.codPedido = codPedido;
        this.quantidade = quantidade;
    }

    public getIdItemPedido(): number {
        return this.idItemPedido;
    }

    public setIdItemPedido(idItemPedido: number): void {
        this.idItemPedido = idItemPedido;
    }

    public getCodPizza(): number {
        return this.codPizza;
    }

    public setCodPizza(codPizza: number): void {
        this.codPizza = codPizza;
    }

    public getCodPedido(): number {
        return this.codPedido;
    }

    public setCodPedido(codPedido: number): void {
        this.codPedido = codPedido;
    }


    public getQuantidade(): number {
        return this.quantidade
    }

    public setQuantidade(quantidade: number): void {
        this.quantidade = quantidade;
    }
}

export class NotaFiscal {
    private id: number;
    private codPedido: number;
    private nomeCliente: string;
    private logradouroCliente: string;
    private numeroCliente: number;
    private bairroCliente: string;
    private cidadeCliente: string;
    private telefoneCliente: string;
    private pizzariaTelefone: string;
    private cnpjPizzaria: string;
    private nomePizzaria: string;
    private razaoSocial: string;
    private pedido: Pedido;
    private valorTotal: number;
    private codAtendente: number;
    private nomeAtendente: string;

    constructor(id: number, codPedido: number, nomeCliente: string, logradouroCliente: string, numeroCliente: number, bairroCliente: string, cidadeCliente: string, telefoneCliente: string, pizzariaTelefone: string, cnpjPizzaria: string, nomePizzaria: string, razaoSocial: string, pedido: Pedido, valorTotal: number, codAtendente: number, nomeAtendente: string) {
        this.id = id;
        this.codPedido = codPedido;
        this.nomeCliente = nomeCliente;
        this.logradouroCliente = logradouroCliente;
        this.numeroCliente = numeroCliente;
        this.bairroCliente = bairroCliente;
        this.cidadeCliente = cidadeCliente;
        this.telefoneCliente = telefoneCliente;
        this.pizzariaTelefone = pizzariaTelefone;
        this.cnpjPizzaria = cnpjPizzaria;
        this.nomePizzaria = nomePizzaria;
        this.razaoSocial = razaoSocial;
        this.pedido = pedido;
        this.valorTotal = valorTotal;
        this.codAtendente = codAtendente;
        this.nomeAtendente = nomeAtendente;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getCodPedido(): number {
        return this.codPedido;
    }

    public setCodPedido(codPedido: number): void {
        this.codPedido = codPedido;
    }

    public getNomeCliente(): string {
        return this.nomeCliente;
    }

    public setNomeCliente(nomeCliente: string): void {
        this.nomeCliente = nomeCliente;
    }

    public getLogradouroCliente(): string {
        return this.logradouroCliente;
    }

    public setLogradouroCliente(logradouroCliente: string): void {
        this.logradouroCliente = logradouroCliente;
    }

    public getNumeroCliente(): number {
        return this.numeroCliente;
    }

    public setNumeroCliente(numeroCliente: number): void {
        this.numeroCliente = numeroCliente;
    }

    public getBairroCliente(): string {
        return this.bairroCliente;
    }

    public setBairroCliente(bairroCliente: string): void {
        this.bairroCliente = bairroCliente;
    }

    public getCidadeCliente(): string {
        return this.cidadeCliente;
    }

    public setCidadeCliente(cidadeCliente: string): void {
        this.cidadeCliente = cidadeCliente;
    }

    public getTelefoneCliente(): string {
        return this.telefoneCliente;
    }

    public setTelefoneCliente(telefoneCliente: string): void {
        this.telefoneCliente = telefoneCliente;
    }

    public getPizzariaTelefone(): string {
        return this.pizzariaTelefone;
    }

    public setPizzariaTelefone(pizzariaTelefone: string): void {
        this.pizzariaTelefone = pizzariaTelefone;
    }

    public getCnpjPizzaria(): string {
        return this.cnpjPizzaria;
    }

    public setCnpjPizzaria(cnpjPizzaria: string): void {
        this.cnpjPizzaria = cnpjPizzaria;
    }

    public getNomePizzaria(): string {
        return this.nomePizzaria;
    }

    public setNomePizzaria(nomePizzaria: string): void {
        this.nomePizzaria = nomePizzaria;
    }

    public getRazaoSocial(): string {
        return this.razaoSocial;
    }

    public setRazaoSocial(razaoSocial: string): void {
        this.razaoSocial = razaoSocial;
    }

    public getPedido(): Pedido {
        return this.pedido;
    }

    public setPedido(pedido: Pedido): void {
        this.pedido = pedido;
    }

    public getValorTotal(): number {
        return this.valorTotal;
    }

    public setValorTotal(valorTotal: number): void {
        this.valorTotal = valorTotal;
    }

    public getCodAtendente(): number {
        return this.codAtendente;
    }

    public setCodAtendente(codAtendente: number): void {
        this.codAtendente = codAtendente;
    }

    public getNomeAtendente(): string {
        return this.nomeAtendente;
    }

    public setNomeAtendente(nomeAtendente: string): void {
        this.nomeAtendente = nomeAtendente;
    }
}

// Métodos:


export interface ClienteDAO {
    cadastrar(cliente: Cliente): Promise<void>;
}

// Classe de acesso a dados (exemplo com PostgreSQL e biblioteca pg)
class ClientePostgreSQL implements ClienteDAO {
    private pool: Pool; // Pool de conexões com o banco de dados

    constructor() {
        // Configuração da conexão com o banco de dados
        this.pool = new Pool({
            user: 'postgres',
            host: '127.0.0.1',
            database: 'pizzaria CS',
            password: '2710Lc',
            port: 5432, // Porta padrão do PostgreSQL
          });
        };
    

    async cadastrar(cliente: Cliente): Promise<void> {
        const client = await this.pool.connect();
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

// Método de cadastro
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
    nomeCliente: 'cla',
    nomeCompleto: 'nW',
    logradouro: 'Rua X',
    numero: 123,
    bairro: 'Bairro y',
    cidade: 'Cidade a',
    telefoneContato: '12345',
};

cadastrarCliente(dadosCliente)
    .then((cliente) => {
        console.log('Cliente cadastrado com sucesso:', cliente);
    })
    .catch((error) => {
        console.error('Erro ao cadastrar cliente:', error);
    });
