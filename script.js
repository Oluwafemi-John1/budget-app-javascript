let budget = 0;
let balance = 0;
let budgetArray = []
let operation = 0
let newIndex;
let operationEdit = 0

const submitBudget = () => {
    const ourBudget = document.getElementById('budget').value
    if (ourBudget != '') {
        budget = Number(ourBudget)
        balance = Number(ourBudget)
        error1.style.display = 'none'
        document.getElementById('budget').value = ""
    } else {
        error1.style.display = 'block'
    }
    console.log(budget);
    showBudget.innerHTML = `Total Budget: ${budget}`
    showBalance.innerHTML = `Total Balance: ${balance}`
}

const addItems = () => {
    if (itemName.value == '' || itemAmount.value == '' || itemQuantity.value == '') {
        error2.style.display = 'block'
    } else {
        error2.style.display = 'none'
        let bud = {
            name: itemName.value,
            amount: itemAmount.value,
            quantity: itemQuantity.value
        }
        if (budget > 0 && balance > 0) {
            if ((bud.amount * bud.quantity) <= balance) {
                budgetArray.push(bud)
                console.log(budgetArray);
                balance = balance - (bud.amount * bud.quantity)
                showBalance.innerHTML = `Total Balance: ${balance}`
                displayValues()
                operation = bud.amount * bud.quantity
            } else {
                alert("Insufficient funds")
            }

        } else {
            alert("put a budget first")
        }
    }
}

const deleteItem = (i) => {
    let confirmation = confirm("Are you sure you want to proceed, unimaginable bad things will happen o.")
    if (confirmation == true) {
        budgetArray.splice(i, 1)
        displayValues()
        balance = balance + operation
        showBalance.innerHTML = `Total Balance: ${balance}`
    }
}

const editItem = (i) => {
    newIndex = i
}

const editValues = () => {
    let bud = {
        name: newName.value,
        amount: newAmount.value,
        quantity: newQuantity.value
    }
    budgetArray.splice(newIndex, 1, bud)
    displayValues()
    operationEdit = bud.amount * bud.quantity
    balance = 0
    balance = budget - operationEdit
    showBalance.innerHTML = `Total Balance: ${balance}`
}


const displayValues = () => {
    showEverything.innerHTML = ''
    budgetArray.map((item, index)=>{
        showEverything.innerHTML += `
            <div className="row">
                <div class='col mx-2'>
                    <div class="card p-3 mx-auto my-2">
                    <div class='card-title fs-2 fw-bold'>${index+1}. ${item.name}</div>
                    <div class='card-body fs-1 fw-bolder'>
                        <span class="me-5">&#8358;${item.amount}</span>
                        <button data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-warning" onclick="editItem(${index})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteItem(${index})">Delete</button>
                    </div>
                    <div class='card-footer'>Quantity: ${item.quantity}</div>
                    <div class='card-footer'>Total: &#8358;${Number(item.quantity) * Number(item.amount)}</div>
                    </div>
                </div>
            </div>
        `
    })
}