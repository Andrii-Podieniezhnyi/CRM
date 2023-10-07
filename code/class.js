class StoreElementCRM {
    constructor (productName = "", productPrice = 0, currencyUnits = "", productImage = "/img/error.png", productDescription = "", productQuantity = 0, keywords = "", dateNow = () => {}, id = () => {}) {
        this.id = id()
        this.date = dateNow()
        this.productName = productName;
        this.productPrice = productPrice;
        this.currencyUnits = currencyUnits;
        this.productImage = productImage;
        this.productDescription = productDescription;
        this.productQuantity = productQuantity;
        this.keywords = keywords;
        this.status = false
    }
}

export {StoreElementCRM}