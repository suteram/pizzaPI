/**
 * Imports
 */
const pizzapi = require('dominos');
const buttons = require('rpi-gpio-buttons')([19, 16, 26, 20, 21]);

/**
 * Define the store
 */
let optionArray = [];
let myStore = new pizzapi.Store(5347);
myStore.ID = 5347;

const cust = new pizzapi.Customer(
    {
        firstName: 'Michael',
        lastName: 'Sutera',
        address: '609 SW 8th St, Bentonville, AR',
        email: 'hatsing1237@gmail.com'
    }
);

let order = new pizzapi.Order(
    {
        customer: cust,
        storeID: myStore.ID,
        deliveryMethod: 'Delivery'
    }
);

const addItemOrder = ((code) => {
    let pizza = new pizzapi.Item(
        {
            code: code
        }
    );
    order.addItem(pizza);
});

const finishOrder = (() => {
    order.validate((result) => {
        console.log(result.result.success);
    });
    order.price((result) => {
        console.log(result.result.Order.Amounts)
    });
});

buttons.on('clicked', function(pin) {
    switch(pin) {
        case 19:
            addItemOrder('P_14SCREEN');
            break;
        case 16:
            addItemOrder('14SCREEN');
            break;
        case 26:
            addItemOrder('S_14SCREEN');
            break;
        case 20:
            addItemOrder('MARBRWNE');
            break;
        case 21:
            finishOrder();
            break;
    }
});
