const fs = require('fs')
const path = require('path');

module.exports ={
    fileName: path.resolve(__dirname, '../data/users.json'),
    readFile(){
        const usersJSON = fs.readFileSync(this.fileName, 'utf-8');
        return JSON.parse(usersJSON);
    },
    writeFile(newData){
        const users = JSON.stringify(newData, null, 2);
        return fs.writeFileSync(this.fileName, users);
    }, 
    generateID(){
        const users = this.findAll();
        const lastUser = users.pop();
        if(lastUser)
            return lastUser.id + 1;
        else
            return 1;
    },
    findAll(){
        return this.readFile()
    },
    findByPk(id){
        const users = this.findAll()
        return users.find(e => e.id == id);
    },
    findByField(field, text){
        const users = this.findAll()
        return users.find(e => e[field] === text);
    },//unicamente el primero
    store(user){
        user.id = this.generateID();
        const users = this.findAll()
        const usersUpdated = [...users, user];//tmb podria usar push
        this.writeFile(usersUpdated);
    },
    destroy(id){
        const users = this.findAll();
        const updatedUsers = users.filter(e => e.id != id)
        this.writeFile(updatedUsers);
    },
    editProcess(data, id){
        const users = this.findAll();
        const updated = users.map(e => {
            if(e.id == id){
                e = {
                    id,
                    ...data
                }
            }
            return e;
        })
        this.writeFile(updated)       
    }
}
