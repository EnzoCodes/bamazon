var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'bamazon'
});

connection.connect(function(err) {
    if(!err) {
        printStock();
        // anotherApp();
    } else {
        throw err;
    }
});

function printStock(){
    //Display all items available for sale...
    console.log("\nWelcome to Bamazon. Enjoy browsing our current stock...\n-------------------------------");
    connection.query("SELECT * FROM products", function(err, res){
        if(err){
            throw err;
        } else if (!err){
            for(i=0; i<res.length; i++){
                console.log("Item: "+res[i].product_name);
                console.log("Price: "+res[i].price);
                console.log("ID: "+res[i].item_id);
                console.log("Department: "+res[i].department_name);
                console.log("In-Stock: "+res[i].stock_quantity);
                console.log("-------------------------------\n");
            }
            selectItem();
        }
    });
}

function selectItem(){
    inquirer.prompt([
        {
            type:"input",
            message:"Enter item ID: ",
            name:"chosenID",
            validate: function(value){
                if (isNaN(value) || value < 1){
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type:"input",
            message:"Enter quantity: ",
            name:"chosenAmount",
            validate: function(value){
                if (isNaN(value) || value < 1){
                    return false;
                } else {
                    return true;
                }
            }
        }]).then(function(data) {
            // var id = parseFloat(data.chosenID);
            // var amnt = parseFloat(data.chosenAmount);
            // var id = answer.chosenID;
            // var amnt = answer.chosenAmount;
            connection.query(
                "SELECT * FROM products WHERE item_id = '"+data.chosenID+"'",
                    function(err, results, fields) {
                        if(err){
                            throw err;
                        } else if (!err){
                            if (JSON.parse(data.chosenAmount) <= results[0].stock_quantity) {
                                console.log("\n You bought: "+data.product_name);
                                var total = data.chosenAmount * results[0].price;
                                console.log("Your total is $"+total);

                                var sqlVal = "UPDATE products SET stock_quantity = '"
                                            + (results[0].stock_quantity - JSON.parse(data.chosenAmount))
                                            + "' WHERE item_id= '" + data.chosenID + "'";

                                connection.query(sqlVal, function(err, result){
                                    if(err){
                                        throw err;
                                    }else if(!err){
                                        console.log("\nInventory updated!");
                                    }
                                });

                            } else if (JSON.parse(data.chosenAmount) > results[0].stock_quantity) {
                                console.log("\nNot enough stock to fill your order!");
                                selectItem();
                                return false;
                            }
                        }
                    });
                        // console.log("Item: "+res[id].product_name);
                        // console.log("Price: "+res[id].price);
                        // console.log("In-Stock: "+res[id].stock_quantity);
            // if res[answer.chosenID].stock_quantity < answer.chosenAmount....
        });
};


// function contShopping(){
//
// }

// then.
//  Check if 'bamazon' has product amount to meet ORDER
//
// If not, 'Insufficient quantity!', and break/restart
//
// ELSE, fulfill the customer's order.
// Updating SQL database to reflect the remaining quantity.
// Show the customer the total cost of their purchase.
