export class User {
    private user: string;
    private pass: string;

    constructor(user: string, pass: string) {
        this.user = user;
        this.pass = pass;
    }

    public getUser(): string{
        return this.user;
    }

    public getPass(): string{
        return this.pass;
    }
}