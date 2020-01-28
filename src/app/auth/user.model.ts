
export class User {
    public id: number;
    public firstname: string;
    public lastname: string;
    public email: string;
    public password: string;
    public role?: string;
    public cartId: number;

    constructor(firstname: string, lastname: string, email: string, password:string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password=password;

    }


}