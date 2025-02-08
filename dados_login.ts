export class DadosLogin {
    private login: string;
    private senha: string;

    constructor(login: string, senha: string) {
        this.login = login;
        this.senha = senha;
    }

    // Getters e setters para cada atributo
    public getLogin(): string { return this.login; }
    public setLogin(login: string): void { this.login = login; }
    public getSenha(): string { return this.senha; }
    public setSenha(senha: string): void { this.senha = senha; }
}
