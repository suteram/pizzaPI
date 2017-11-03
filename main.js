/**
 * Imports
 */
const pizzapi = require('dominos');

/**
 * Define the store
 */
let optionArray = [];
let myStore = new pizzapi.Store(5347);
myStore.ID = 5347;

// myStore.getFriendlyNames(
//     getMenuData
// );
//
// function getMenuData(menuData) {
//     console.log(menuData);
// };

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

const addOption = ((buttonCode) => { //This takes whatever the button passes through and throws it into the function
    optionArray.push(buttonCode); //Adds the 'buttonCode' option to the options array
});

const removeOption = ((buttonCode) => { //This takes whatever the button passes through and throws it into the function
    let index = null;
    optionArray.forEach((option) => {
        if(option = buttonCode){
            index = option.indexOf();
        }
    });
    optionArray.pop(index); //Removes the 'buttonCode' option from the options array
});

const addItemOrder = ((options) => {  //This takes the options array and throws it into the function
    let pizza = new pizzapi.Item( //Creates the pizza with the passed in option array
        {
            code: '14SCREEN',
            quantity: 1,
            options: options
        }
    )
    order.addItem(pizza) //Adds the pizza to the order
});

// removeOption('STRING BASED ON WHICH BUTTON PRESSED'); //Call this when a button is pressed, pass in a string based on which button it is
addOption('P'); //Call this when a button is pressed, pass in a string based on which button it is
addItemOrder(optionArray); //Call when 'Complete Order' button is pressed

order.validate(
    function(result) {
        console.log('We did it!')
    }
);

order.price(
    function(result) {
        console.log('Price: ', result)
    }
);

/**
 * CODES:
 * P - PEPPERONI
 * S - SAUSAGE
 * B - BACON
 * H - HAM
 *
 */
