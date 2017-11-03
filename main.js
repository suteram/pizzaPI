/**
 * Imports
 */
var pizzapi = require('dominos');
var Gpio = require('onoff').Gpio;
var pepButton = new Gpio(21, 'in', 'falling');
var cheeseButton = new Gpio(16, 'in', 'falling');
var sausageButton = new Gpio(15, 'in', 'falling');
var brownieButton = new Gpio(14, 'in', 'falling');
var finishButton = new Gpio(24, 'in', 'falling');

pepButton.watch(function(err, value) {
    if(err){
        console.log('There was an error:', err);
        return;
    }
    addItemOrder('P_14SCREEN');
    console.log('Added Pepperoni pizza to order');
});

cheeseButton.watch(function(err, value) {
    if(err){
        console.log('There was an error:', err);
        return;
    }
    addItemOrder('14SCREEN');
    console.log('Added Cheese pizza to order');
});

sausageButton.watch(function(err, value) {
    if(err){
        console.log('There was an error:', err);
        return;
    }
    addItemOrder('S_14SCREEN');
    console.log('Added sausage pizza to order');
});

brownieButton.watch(function(err, value) {
    if(err){
        console.log('There was an error:', err);
        return;
    }
    addItemOrder('MARBRWNE');
    console.log('Added marble brownie to order');
});

finishButton.watch(function(err, value) {
    if(err){
        console.log('There was an error:', err);
        return;
    }
    finishOrder();
    console.log('Finished order');
});
/**
 * Define the store
 */
var myStore = new pizzapi.Store(5347);
myStore.ID = 5347;

var cust = new pizzapi.Customer(
    {
        firstName: 'Michael',
        lastName: 'Sutera',
        address: '609 SW 8th St, Bentonville, AR',
        email: 'hatsing1237@gmail.com'
    }
);

var order = new pizzapi.Order(
    {
        customer: cust,
        storeID: myStore.ID,
        deliveryMethod: 'Delivery'
    }
);

var addItemOrder = ((code) => {
    var pizza = new pizzapi.Item(
        {
            code: code,
            quantity: 1,
            options: []
        }
    );
    order.addItem(pizza);
});

var finishOrder = (() => {
    order.validate((result) => {
        console.log(result.result.StatusItems[0].Code);
    });
    order.price((result) => {
        console.log(result.result.Order.PriceOrderTime)
    });
});
