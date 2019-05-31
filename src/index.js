const products = [
    {
        "id": 1,
        "category": [
            "fresh"
        ],
        "price": 23,
        "vat": 23
    },
    {
        "id": 2,
        "category": [
            "green",
            "soft"
        ],
        "price": 65.45,
        "vat": 23
    },
    {
        "id": 3,
        "category": [
            "black"
        ],
        "price": 12,
        "vat": 8
    },
    {
        "id": 4,
        "category": [
            "green",
            "fresh"
        ],
        "price": 12,
        "vat": 8
    },
    {
        "id": 5,
        "category": [
            "soft"
        ],
        "price": 12,
        "vat": 0
    },
    {
        "id": 6,
        "category": [
            "black",
            "green",
            "soft",
            "fresh"
        ],
        "price": 29.99,
        "vat": 0
    },
    {
        "id": 7,
        "category": [
            "green"
        ],
        "price": 19.45,
        "vat": 5
    },
    {
        "id": 8,
        "category": [
            "black",
            "soft"
        ],
        "price": 15,
        "vat": 5
    },
    {
        "id": 9,
        "category": [],
        "price": 12.45,
        "vat": null
    },
    {
        "id": 10,
        "category": [
            "black",
            "fresh",
            "soft"
        ],
        "price": 99.99,
        "vat": null
    }
];

const discounts = [
    {
        "type": "promo",
        "value": "5%"
    },
    {
        "type": "category",
        "id": "green",
        "value": "2%"
    },
    {
        "type": "category:amount",
        "id": "green",
        "minimal": 100,
        "value": "3%"
    },
    {
        "type": "category",
        "id": "fresh",
        "value": "2%"
    },
    {
        "type": "category:amount",
        "id": "fresh",
        "minimal": 100,
        "value": 300
    },
    {
        "type": "category",
        "id": "soft",
        "value": "2%"
    },
    {
        "type": "category:amount",
        "id": "black",
        "minimal": 100,
        "value": "3%"
    },
    {
        "type": "product",
        "id": 1,
        "value": "0.25"
    },
    {
        "type": "product",
        "id": 2,
        "value": "1.50"
    },
    {
        "type": "product",
        "id": 3,
        "value": 3
    },
    {
        "type": "product:amount",
        "id": 3,
        "minimal": 100,
        "value": "10%"
    },
    {
        "type": "product",
        "id": 4,
        "value": "0.25"
    },
    {
        "type": "product",
        "id": 5,
        "value": "1.50"
    },
    {
        "type": "product",
        "id": 6,
        "value": 3
    },
    {
        "type": "product:amount",
        "id": 6,
        "minimal": 100,
        "value": "10%"
    },
    {
        "type": "product:amount",
        "id": 7,
        "minimal": 2,
        "value": 10
    },
    {
        "type": "product",
        "id": 8,
        "value": "10%"
    },
    {
        "type": "product:amount",
        "id": 8,
        "minimal": 100,
        "value": 100
    },
    {
        "type": "product:amount",
        "id": 9,
        "minimal": 20,
        "value": "10%"
    },
    {
        "type": "product",
        "id": 10,
        "minimal": 30,
        "value": "10%"
    }
];

class DiscountStrategy {
    constructor(productId, amount) {
        this.amount = amount;
        this.product = this.getProductById(productId);

        this.discountsAvailable = [
            ...this.getProductDiscounts(),
            ...this.getCategoryDiscounts(),
            ...this.getCategoryAmountDiscounts(),
            ...this.getProductAmountDiscounts(),
            ...this.getPromoDiscounts()
        ];


        this.discountValues = this.mapDiscountValues()
        //

    }

    getProductById(productId) {
        return products.find(product => {
            return product.id === productId
        })
    }

    getProductDiscounts() {
        return discounts.filter(d => {
            return d.type === 'product'
                && d.id === this.product.id
        })
    }

    getCategoryDiscounts() {
        return discounts.filter(d => {
            return d.type === 'category'
                && this.product.category.indexOf(d.id) >= 0
        })
    }

    getCategoryAmountDiscounts() {
        return discounts.filter(d => {
            return d.type === 'category:amount'
                && this.product.category.indexOf(d.id) >= 0
                && this.amount >= d.minimal
        })
    }

    getProductAmountDiscounts() {
        return discounts.filter(d => {
            return d.type === 'product:amount'
                && d.id === this.product.id
                && this.amount >= d.minimal
        })
    }

    getPromoDiscounts() {
        return discounts.filter(d => {
            return d.type === 'promo'
        })
    }


    mapDiscountValues() {

        this.discountsAvailable.forEach(d => {
            // // const discountPerPiece = d.
            // // console.log(d.value);
            // const isInt = d.value % 1 === 0;
            // // const isProcent = d.value.indexof('%') >= 0;
            //
            // isprocent
            // if (!isInt && d.value.indexOf('%') >= 0) {
            //     // console.log('%', d.value.indexOf('%') >= 0);
            // }
            // console.log(isInt);
            //
            // d.totalPrice = (this.product.price - if  + this.amount);


            d.totalPrice = this[d.type](d)

            // d.final_value;
        })
    }

    category(d) {
        return this.calculateEndPrice(d.value, this.product.price, this.product.amount);
    }

    promo(d) {
        return this.calculateEndPrice(d.value, this.product.price, this.product.amount);
    }

    category_amount() {
        return this.calculateEndPrice(d.value, this.product.price, this.product.amount);
    }

    product() {
        return this.calculateEndPrice(d.value, this.product.price, this.product.amount);
    }

    product_amount() {
        return this.calculateEndPrice(d.value, this.product.price, this.product.amount);
    }

    calculateEndPrice(value, price, amount) {
        let productTotal = 0;

        if (-1 !== d.value.indexOf('%')) {
            productTotal = (value * price) * (1 - amount)

        } else if (isInt(d.value)) {
            productTotal = (value * price) - amount

        } else {
            productTotal = ((value - amount) * price)
        }

        return productTotal;
    }


}


console.log(new DiscountStrategy(10, 150));
// new DiscountStrategy(4, 50);
