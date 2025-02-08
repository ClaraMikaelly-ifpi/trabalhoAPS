"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotaFiscal = exports.ItemPedido = exports.Pedido = exports.Atendente = exports.Cliente = void 0;
const pg_1 = require("pg");
class Cliente {
    constructor(idCliente, nomeCliente, nomeCompleto, logradouro, numero, bairro, cidade, telefoneContato) {
        this.idCliente = idCliente;
        this.nomeCliente = nomeCliente;
        this.nomeCompleto = nomeCompleto;
        this.logradouro = logradouro;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.telefoneContato = telefoneContato;
    }
    getIdCliente() {
        return this.idCliente;
    }
    setIdCliente(idCliente) {
        this.idCliente = idCliente;
    }
    getNomeCliente() {
        return this.nomeCliente;
    }
    setNomeCliente(nomeCliente) {
        this.nomeCliente = nomeCliente;
    }
    getNomeCompleto() {
        return this.nomeCompleto;
    }
    setNomeCompleto(nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
    }
    getLogradouro() {
        return this.logradouro;
    }
    setLogradouro(logradouro) {
        this.logradouro = logradouro;
    }
    getNumero() {
        return this.numero;
    }
    setNumero(numero) {
        this.numero = numero;
    }
    getBairro() {
        return this.bairro;
    }
    setBairro(bairro) {
        this.bairro = bairro;
    }
    getCidade() {
        return this.cidade;
    }
    setCidade(cidade) {
        this.cidade = cidade;
    }
    getTelefoneContato() {
        return this.telefoneContato;
    }
    setTelefoneContato(telefoneContato) {
        this.telefoneContato = telefoneContato;
    }
}
exports.Cliente = Cliente;
class DadosLogin {
    constructor(login, senha) {
        this.login = login;
        this.senha = senha;
    }
    getLogin() {
        return this.login;
    }
    setLogin(login) {
        this.login = login;
    }
    getSenha() {
        return this.senha;
    }
    setSenha(senha) {
        this.senha = senha;
    }
}
class Tipos {
    constructor(codTipo, nome, tamanho, preco) {
        this.codTipo = codTipo;
        this.nome = nome;
        this.tamanho = tamanho;
        this.preco = preco;
    }
    getCodTipo() {
        return this.codTipo;
    }
    setCodTipo(codTipo) {
        this.codTipo = codTipo;
    }
    getNome() {
        return this.nome;
    }
    setNome(nome) {
        this.nome = nome;
    }
    getTamanho() {
        return this.tamanho;
    }
    setTamanho(tamanho) {
        this.tamanho = tamanho;
    }
    getPreco() {
        return this.preco;
    }
    setPreco(preco) {
        this.preco = preco;
    }
}
class Sabores {
    constructor(codPizza, nomePizza, codTipo) {
        this.codPizza = codPizza;
        this.nomePizza = nomePizza;
        this.codTipo = codTipo;
    }
    getCodPizza() {
        return this.codPizza;
    }
    setCodPizza(codPizza) {
        this.codPizza = codPizza;
    }
    getNomePizza() {
        return this.nomePizza;
    }
    setNomePizza(nomePizza) {
        this.nomePizza = nomePizza;
    }
    getCodTipo() {
        return this.codTipo;
    }
    setCodTipo(codTipo) {
        this.codTipo = codTipo;
    }
}
class Atendente {
    constructor(codAtendente, nomeAtendente) {
        this.codAtendente = codAtendente;
        this.nomeAtendente = nomeAtendente;
    }
    getCodAtendente() {
        return this.codAtendente;
    }
    setCodAtendente(codAtendente) {
        this.codAtendente = codAtendente;
    }
    getNomeAtendente() {
        return this.nomeAtendente;
    }
    setNomeAtendente(nomeAtendente) {
        this.nomeAtendente = nomeAtendente;
    }
}
exports.Atendente = Atendente;
class Pedido {
    constructor(codPedido, idCliente, codAtendente, observacao, dataPedido) {
        this.codPedido = codPedido;
        this.idCliente = idCliente;
        this.codAtendente = codAtendente;
        this.observacao = observacao;
        this.dataPedido = dataPedido;
    }
    getCodPedido() {
        return this.codPedido;
    }
    setCodPedido(codPedido) {
        this.codPedido = codPedido;
    }
    getIdCliente() {
        return this.idCliente;
    }
    setIdCliente(idCliente) {
        this.idCliente = idCliente;
    }
    getCodAtendente() {
        return this.codAtendente;
    }
    setCodAtendente(codAtendente) {
        this.codAtendente = codAtendente;
    }
    getObservacao() {
        return this.observacao;
    }
    setObservacao(observacao) {
        this.observacao = observacao;
    }
    getDataPedido() {
        return this.dataPedido;
    }
    setDataPedido(dataPedido) {
        this.dataPedido = dataPedido;
    }
}
exports.Pedido = Pedido;
class ItemPedido {
    constructor(idItemPedido, codPizza, codPedido, quantidade) {
        this.idItemPedido = idItemPedido;
        this.codPizza = codPizza;
        this.codPedido = codPedido;
        this.quantidade = quantidade;
    }
    getIdItemPedido() {
        return this.idItemPedido;
    }
    setIdItemPedido(idItemPedido) {
        this.idItemPedido = idItemPedido;
    }
    getCodPizza() {
        return this.codPizza;
    }
    setCodPizza(codPizza) {
        this.codPizza = codPizza;
    }
    getCodPedido() {
        return this.codPedido;
    }
    setCodPedido(codPedido) {
        this.codPedido = codPedido;
    }
    getQuantidade() {
        return this.quantidade;
    }
    setQuantidade(quantidade) {
        this.quantidade = quantidade;
    }
}
exports.ItemPedido = ItemPedido;
class NotaFiscal {
    constructor(id, codPedido, nomeCliente, logradouroCliente, numeroCliente, bairroCliente, cidadeCliente, telefoneCliente, pizzariaTelefone, cnpjPizzaria, nomePizzaria, razaoSocial, pedido, valorTotal, codAtendente, nomeAtendente) {
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
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getCodPedido() {
        return this.codPedido;
    }
    setCodPedido(codPedido) {
        this.codPedido = codPedido;
    }
    getNomeCliente() {
        return this.nomeCliente;
    }
    setNomeCliente(nomeCliente) {
        this.nomeCliente = nomeCliente;
    }
    getLogradouroCliente() {
        return this.logradouroCliente;
    }
    setLogradouroCliente(logradouroCliente) {
        this.logradouroCliente = logradouroCliente;
    }
    getNumeroCliente() {
        return this.numeroCliente;
    }
    setNumeroCliente(numeroCliente) {
        this.numeroCliente = numeroCliente;
    }
    getBairroCliente() {
        return this.bairroCliente;
    }
    setBairroCliente(bairroCliente) {
        this.bairroCliente = bairroCliente;
    }
    getCidadeCliente() {
        return this.cidadeCliente;
    }
    setCidadeCliente(cidadeCliente) {
        this.cidadeCliente = cidadeCliente;
    }
    getTelefoneCliente() {
        return this.telefoneCliente;
    }
    setTelefoneCliente(telefoneCliente) {
        this.telefoneCliente = telefoneCliente;
    }
    getPizzariaTelefone() {
        return this.pizzariaTelefone;
    }
    setPizzariaTelefone(pizzariaTelefone) {
        this.pizzariaTelefone = pizzariaTelefone;
    }
    getCnpjPizzaria() {
        return this.cnpjPizzaria;
    }
    setCnpjPizzaria(cnpjPizzaria) {
        this.cnpjPizzaria = cnpjPizzaria;
    }
    getNomePizzaria() {
        return this.nomePizzaria;
    }
    setNomePizzaria(nomePizzaria) {
        this.nomePizzaria = nomePizzaria;
    }
    getRazaoSocial() {
        return this.razaoSocial;
    }
    setRazaoSocial(razaoSocial) {
        this.razaoSocial = razaoSocial;
    }
    getPedido() {
        return this.pedido;
    }
    setPedido(pedido) {
        this.pedido = pedido;
    }
    getValorTotal() {
        return this.valorTotal;
    }
    setValorTotal(valorTotal) {
        this.valorTotal = valorTotal;
    }
    getCodAtendente() {
        return this.codAtendente;
    }
    setCodAtendente(codAtendente) {
        this.codAtendente = codAtendente;
    }
    getNomeAtendente() {
        return this.nomeAtendente;
    }
    setNomeAtendente(nomeAtendente) {
        this.nomeAtendente = nomeAtendente;
    }
}
exports.NotaFiscal = NotaFiscal;
// Classe de acesso a dados (exemplo com PostgreSQL e biblioteca pg)
class ClientePostgreSQL {
    constructor() {
        // Configuração da conexão com o banco de dados
        this.pool = new pg_1.Pool({
            user: 'postgres',
            host: '127.0.0.1',
            database: 'pizzaria CS',
            password: '2710Lc',
            port: 5432, // Porta padrão do PostgreSQL
        });
    }
    ;
    cadastrar(cliente) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                yield client.query('BEGIN'); // Inicia uma transação
                const result = yield client.query('INSERT INTO CLIENTE (NOME_CLIENTE, NOME_COMPLETO, LOGRADOURO, NUMERO, BAIRRO, CIDADE, TELEFONE_CONTATO) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING ID_CLIENTE', [
                    cliente.getNomeCliente(),
                    cliente.getNomeCompleto(),
                    cliente.getLogradouro(),
                    cliente.getNumero(),
                    cliente.getBairro(),
                    cliente.getCidade(),
                    cliente.getTelefoneContato(),
                ]);
                const idCliente = result.rows[0].id_cliente;
                cliente.setIdCliente(idCliente); // Atualiza o ID do cliente
                yield client.query('COMMIT'); // Confirma a transação
            }
            catch (error) {
                yield client.query('ROLLBACK'); // Desfaz a transação em caso de erro
                throw error; // Lança o erro para ser tratado
            }
            finally {
                client.release(); // Libera a conexão de volta para o pool
            }
        });
    }
}
// Método de cadastro
function cadastrarCliente(dadosCliente) {
    return __awaiter(this, void 0, void 0, function* () {
        const cliente = new Cliente(0, // ID será gerado pelo banco de dados
        dadosCliente.nomeCliente, dadosCliente.nomeCompleto, dadosCliente.logradouro, dadosCliente.numero, dadosCliente.bairro, dadosCliente.cidade, dadosCliente.telefoneContato);
        const clienteDAO = new ClientePostgreSQL();
        yield clienteDAO.cadastrar(cliente);
        return cliente;
    });
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
