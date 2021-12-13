import Item from "./item";

describe('Suite de testes do item', () => {
    test("Retorna o volume de um item",()=>{
        const item = new Item(1,"INSTRUMENTO","GUITARRA",200,30,20,10)
        expect(item.getVolume()).toBe(0.006)
    })    
    test("Retorna a densidade de um item",()=>{
        const item = new Item(1,"INSTRUMENTO","GUITARRA",200,30,20,10,2)
        expect(item.getDensity()).toBe(333)
    })
    
});