export default class UserModel {
    constructor(id, name, email, password) {
        this.id = id
        this.name = name;
        this.email = email;
        this.password = password
    }

    static add(name, email, password) {
        let newuser = new UserModel(
            users.length + 1,
            name,
            email,
            password
        )
        console.log(newuser)
        users.push(newuser)

    }

    static checkLogin(email, password) {
        const result = users.find( (u) =>u.email == email && u.password == password );
        return result;
    }
}

const users = [];
