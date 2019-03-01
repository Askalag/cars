export class SignUpInfo {
    name: string;
    userName: string;
    email: string;
    role: string[];
    password: string;

    constructor(name: string, userName: string, email: string, password: string) {
        this.name = name;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.role = ['user'];
    }
}
