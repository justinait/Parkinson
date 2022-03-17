const fs = require('fs');
const path = require('path');

module.exports = {
    fileName: path.resolve(__dirname, "../data/paintings.json"),

    readFile(){
        const paintingsJSON = fs.readFileSync(this.fileName,'utf-8');
        return JSON.parse(paintingsJSON);
    },
    writeFile(newData){
        const dataJSON = JSON.stringify(newData, null, 2);
        return fs.writeFileSync(this.fileName, dataJSON);
    },
    findAll(){
        return this.readFile();
    },
    listByCategory(category){
        const paintings = this.findAll();
        return paintings.filter(e=> e.category == category);
    },
    store(newPainting){
        newPainting.id = this.generateID();
        const paintings = this.findAll();
        const updatedPaintings = [...paintings, newPainting]
        this.writeFile(updatedPaintings);
        
    },
    findByPk(id){
        const paintings = this.findAll();
        return paintings.find(e => e.id == id);
    },
    generateID(){
        const paintings = this.findAll();
        const lastPainting = paintings.pop();
        //const lastPainting = paintings[paintings.length];

        if(lastPainting)
            return lastPainting.id + 1;
        else
            return 1;
    },
    destroy(id){
        const paintings = this.findAll();
        const updatedPaintings = paintings.filter(e => e.id != id)
        this.writeFile(updatedPaintings);
    },
    editProcess(data, id){
        const paintings = this.findAll();
        const updated = paintings.map(e => {
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