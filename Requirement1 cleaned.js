var inventory = [], transactionLog = [], categoriesList = [], customFields = {};

// Add an item to the inventory
function add(itemDetails) {

        var item = {
            numberOfItems: itemDetails[0],
            category: itemDetails[1],
            quantity: itemDetails[2],
            price: itemDetails[3],
            unit: itemDetails[4],
            added: new Date(),
            customFields: itemDetails[5] || {}
        }
        inventory.push(item);

        if (!categoriesList.includes(itemDetails[1])) categoriesList.push(itemDetails[1]);

        transactionLog.push({ type: "add", item });
    }


// Edit an existing item
function edit(itemDetails) {
    if (inventory[itemDetails[0]]) {
        transactionLog.push({ type: "edit", old: inventory[itemDetails[0]], new: itemDetails.slice(1) });

        inventory[itemDetails[0]] = {
            ...inventory[itemDetails[0]],
            numberOfItems: itemDetails[1],
            category: itemDetails[2],
            quantity: itemDetails[3],
            price: itemDetails[4],
            unit: itemDetails[5],
            customFields: itemDetails[6] || {}
        };
    }
}

// Remove an item from inventory
function remove(itemDetails) {
    if (inventory[itemDetails[0]]) {
        transactionLog.push({ type: "delete", item: inventory[itemDetails[0]] });

        if (itemDetails[2] < 10) alert("quantity < 10");

        inventory.splice(itemDetails[0], 1);
    }
}

// Display inventory
console.log("=== Dashboard ===\nItems: " + inventory.length +
    "\nTotal: $" + inventory.reduce((total, x) => total + x.quantity * x.price, 0).toFixed(2) +
    "\nCategories: " + categoriesList.join(', '));

// Choose and execute tasks selected by user
function chooseTask(task, itemDetails) {
    if (task === "add") add(itemDetails);
    else if (task === "edit" && inventory[itemDetails[0]]) edit(itemDetails);
    else if (task === "remove" && inventory[itemDetails[0]]) remove(itemDetails);

    if (["Sale", "restock"].includes(task)) {
        for (let key of inventory) {
            if (key.name === itemDetails[0]) {
                if (task === "Sale" && key.quantity >= itemDetails[1]) {
                    key.quantity -= itemDetails[1];
                    transactionLog.push({ type: "sale", item: key, quantityStock: itemDetails[1], date: new Date() });
                    console.log(`Sold ${itemDetails[1]} ${key.unit} of ${key.name}`);
                } else if (task === "restock") {
                    key.quantity += itemDetails[1];
                    transactionLog.push({ type: "restock", item: key, quantityRemaining: itemDetails[1], date: new Date() });
                    console.log(`Restocked ${itemDetails[1]} ${key.unit} of ${key.name}`);
                }
                break;
            }
        }
    }

    if (task === "search") {
        console.log(inventory.filter(x =>
            [x.name, x.category, x.price].some(v => v.toString().toLowerCase().includes(itemDetails[0].toLowerCase()))
        ));
    }

    if (task === "viewInventory") console.log("=== Inventory ===", inventory);

    if (task === "xprtAll") {
        console.log("CSV:\n" + ["Name,Category,Quantity,Price,Unit,AddedAt"]
            .concat(inventory.map(x => Object.values(x).join(','))).join('\n'));
    }

    if (task === "viewAllTransactions") console.log("Transactions:\n", transactionLog);

    if (task === "viewItemAging") {
        console.log(inventory.map(x =>
            `${x.name}: ${Math.floor((new Date() - new Date(x.added)) / (1000 * 60 * 60 * 24))}d`).join('\n'));
    }

    if (task === "Import") {
        itemDetails[0].forEach(x => chooseTask("add",
            [x.name, x.category, x.quantity, x.price, x.unit])
        );
    }

    if (task === "addField" && !customFields[itemDetails[0]]) {
        customFields[itemDetails[0]] = null;
    }

    if (task === "addCustomerField") {
        inventory.find(x => x.name === itemDetails[0])?.customFields[itemDetails[1]] = itemDetails[2];
    }
}
