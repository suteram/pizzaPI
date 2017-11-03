/**
 * Imports
 */
var pizzapi = require('dominos');
var Gpio = require('onoff').Gpio;
var pepButton = new Gpio(6, 'in', 'both');
var cheeseButton = new Gpio(19, 'in', 'both');
var sausageButton = new Gpio(20, 'in', 'both');
var brownieButton = new Gpio(21, 'in', 'both');
var finishButton = new Gpio(26, 'in', 'both');

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
var optionArray = [];
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
        console.log(result.result.success);
    });
    order.price((result) => {
        console.log(result.result.Order.Amounts)
    });
});
