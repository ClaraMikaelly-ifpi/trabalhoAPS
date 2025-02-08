export class Atendente {
    private codAtendente: number;
    private nomeAtendente: string;
    private senha: string;

    constructor(codAtendente: number, nomeAtendente: string, senha: string) {
        this.codAtendente = codAtendente;
        this.nomeAtendente = nomeAtendente;
        this.senha = senha;
    }

    // Getters e setters para cada atributo
    public getCodAtendente(): number { return this.codAtendente; }
    public setCodAtendente(codAtendente: number): void { this.codAtendente = codAtendente; }
    public getNomeAtendente(): string { return this.nomeAtendente; }
    public setNomeAtendente(nomeAtendente: string): void { this.nomeAtendente = nomeAtendente; }
    public getSenha(): string { return this.senha; }
    public setSenha(senha: string): void { this.senha = senha; }
}
