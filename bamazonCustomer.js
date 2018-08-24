//Require NPM packages
var mysql = require("mysql");
var inquirer = require("inquirer");

//Connection to MySQL Database
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

//When Connected to MySQL Database
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    welcomeMessage();
});

//Function that welcomes user and runs the inquirer program.
function welcomeMessage() {
    inquirer.prompt ({
        name: "action",
        type: "list",
        message: "Welcome to BAMazon!",
        choices: [
            "Shop",
            "Exit"
        ]
    })
    .then(function(answer) {
        switch (answer.action) {
            case "Shop":
                start();
                break;

            case "Exit":
                exit();
                break;
        }
    });
}

//Function that starts the shopping experience.
function start(){
    //Prints items in shop database
    connection.query('SELECT * FROM Products', function(err, res) {
    if (err) throw err;
  
    console.log("~Welcome to BAMazon")
    console.log('-------------------------------------------------------------------------------------')
  
    for(var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
      console.log('-----------------------------------------------------------------------------------')
    }
  
    console.log(' ');

    //Promting Inquiere to engage shopper.
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "Type the product_ID of the item you want to buy.",
            validate: function(value) {
                if (isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0) {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "qty",
            message: "How many do you want to buy?",
            validate: function(value) {
                if (isNaN(value)) {
                    return false;
                }
                else {
                    return true;
                }
            }
        }
        ]).then(function (ans) {
            var whatToBuy = (ans.id) -1;
            var howMuchToBuy = parseInt(ans.qty);
            var grandTotal = parseFloat(((res[whatToBuy].price)*howMuchToBuy).toFixed(2))
    
            //To checks if there is enough in stock
            if (res[whatToBuy].stock_quantity >= howMuchToBuy) {
                //After a buy, update quantity in products in database
                connection.query("UPDATE Products SET ? WHERE ?", [
                {stock_quantity: (res[whatToBuy].stock_quantity - howMuchToBuy)},
                {item_id: ans.id}
                ], function(err, result) {
                    if(err) throw err;
                    console.log('\n-------------------------------------------------------------------------------------\n')
                    console.log("Success! Your total is $" + grandTotal.toFixed(2) + ". Your item will be shipped shortly :D");
                    console.log('\n-------------------------------------------------------------------------------------\n')
                    console.log("Press ENTER to Buy More!");
                    console.log("Press ARROW UP or DOWN keys to return to menu");
                }).then(welcomeMessage());

                //After a buy, update quantity in departments in database
                connection.query("SELECT * FROM Departments", function(err, deptRes){
                    if (err) throw err;
                    var index;
                    for (var i = 0; i < deptRes.length; i++) {
                    if (deptRes[i].department_name === res[whatToBuy].department_name){
                        index = i;
                        }
                    }
                //Update total_sales in departments table
                connection.query("UPDATE Departments SET ? WHERE ?", [
                {total_sales: deptRes[index].total_sales + grandTotal},
                {department_name: res[whatToBuy].department_name}
                ], function (err, deptRes) {
                        if (err) throw err;
                        console.log("Updated Dept Sales.");
                    });
                });
            }
            else {
                console.log('\n-------------------------------------------------------------------------------------\n')
                console.log("Sorry, out of stock!");
                console.log('\n-------------------------------------------------------------------------------------\n')
                welcomeMessage();
            }         
        })     
    })
}

//Function that ends MySQL connection and exits program.
function exit() {
  connection.end();
}
