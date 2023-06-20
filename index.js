class Good {

    constructor(id, name, description, sizes, price, available) {
        this.id = id
        this.name = name
        this.description = description
        this.sizes = sizes
        this.price = price
        this.available = available

    }
    setAvaible(){
        if (this.available === true) {
            this.available = false
        }
        else if (this.available === false) {
            this.available = true
        }

    }
}

class BasketGood extends Good {
    constructor(Good, amount) {
        super(Good.id, Good.name, Good.description, Good.sizes, Good.price, Good.available); //Исправления
        this.amount = amount
    }
}
class GoodsList {
    #goods
    constructor(goods, filter, sortPrice, sortDir) {
        this.#goods = goods
        this.filter = filter
        this.sortPrice = sortPrice
        this.sortDir = sortDir
    }
    add(good){
        this.#goods.push(good)
    }
    remove(id){
        this.#goods.splice(id, 1)

    }
    getList(){
    const regex = new RegExp(this.filter, 'g');
    let match = this.#goods.filter(({description}) => description.match(regex));
        if (this.sortPrice) {
            if (this.sortDir) {
                match.sort((val1, val2) => val1.price - val2.price)
            } else match.sort((val1, val2) => val2.price - val1.price)
        }
        return match
    }
}

class Basket {
    constructor(goods) {
        this.goods = goods
    }
    get totalAmount(){
         return   this.goods.reduce( (accumulator, currentValue) => accumulator + currentValue.amount, 0)
    }
    get totalSum(){
         return   this.goods.reduce( (accumulator, currentValue) => accumulator + (currentValue.amount * currentValue.price), 0)
    }

    add(good, amount){
        let flag = true
        for (let i = 0; i !== this.goods.length; i++){
            if (this.goods[i].id === good.id){
                this.goods[i].amount += amount
                flag = false
            }}
            if (flag===true){
                this.goods.push(new BasketGood(good, amount))
            }
    }
    remove(good, amount){
        for (let i = 0; i !== this.goods.length; i++) {
            if (this.goods[i].id === good.id) {
                this.goods[i].amount -= amount
            }
        }   this.goods = this.goods.filter(good => good.amount > 0)
    }
    clear(){
        this.goods = []
    }

    removeUnavaible(){
        this.goods = this.goods.filter(good => good.available === true)
    }
}

newGood1 = new Good(0, 'Футболка', 'Футболка', [40, 41, 42, 43, 44, 45], 100, true)
newGood2 = new Good(1, 'Штаны', 'Штаны', [40, 41, 42, 43, 44, 45], 40, true)
newGood3 = new Good(2, 'Куртка', 'Куртка', [40, 41, 42, 43, 44, 45], 150, true)
newGood4 = new Good(3, 'Кепка', 'Кепка', [40, 41, 42, 43, 44, 45], 20, true)
newGood5 = new Good(4, 'Пальто', 'Пальто', [40, 41, 42, 43, 44, 45], 200, true)

newGood1.setAvaible()



basketGood1 = new BasketGood(newGood1, 10)
basketGood5 = new BasketGood(newGood5, 5)

basket = new Basket([basketGood1, basketGood5])
basket.add(newGood2, 1)
basket.add(newGood2, 1)
basket.remove(newGood2, 2)
// console.log(basket.totalSum)
// basket.clear()
basket.removeUnavaible()
// console.log(basket)
// console.log(basketGood1)




// Доработки
// Пункт 2
goodsList = new GoodsList([newGood1, newGood2, newGood3, newGood4], 'Штаны',
    true, false)


// Пункт 3
goodsList.remove(2)
goodsList.remove(0)

console.log(goodsList.getList())