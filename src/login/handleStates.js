export class AuthState{
    static Unknown = new AuthState('Unknown');
    static Authenticated = new AuthState('Authenticated');
    static UnAuthenticated = new AuthState('UnAuthenticated');

    constructor(name){
        this.name = name;
    }
}