
reset.addEventListener('click', () =>{
    fetch("http://localhost:3000/transactions")
    .then(response => response.json())
    .then(data => {
        data.transactions = data.transactions.slice(0, 1);
    });
});


const updateTotals = (transactions) => {
    let totalEarnings = 0;
    let totalSpendings = 0;
    let totalBalance = 0;

    transactions.forEach(transaction => {
        if (transaction.type === 'earning') {
            totalEarnings += parseFloat(transaction.amount);
        } else if (transaction.type === 'spending') {
            totalSpendings += parseFloat(transaction.amount);
        }
    });

    document.getElementById('totalEarnings').innerText = `Total Earnings: $${totalEarnings}`;
    document.getElementById('totalSpendings').innerText = `Total Spendings: $${totalSpendings}`;
    document.getElementById('balance').innerText = `Balance: $${totalEarnings - totalSpendings}`;
};

fetch("http://localhost:3000/transactions")
.then(response => response.json())
.then(data => {
    datasourceLength = data.length;
    updateTotals(data); // Calculate and update totals

    let logs = document.getElementById("tHistory");
    logs.innerHTML = ''; // Clear existing logs
    for (let i = 0; i < data.length; i++) {
        let htmldata = `
            <p>Type: <b>${data[i].type}</b> </p>
            <ul>
                <li>Amount: ${data[i].amount} </li>
                <li>Type: ${data[i].type}</li>
                <li>Description: ${data[i].description}</li>
            </ul>
        `;
        logs.innerHTML += htmldata;
    }
})
.catch(err => {
    console.error(err);
});

// Rest of your existing code...

// Add this inside your form's submit event listener, after successfully adding a transaction
fetch("http://localhost:3000/transactions")
.then(response => response.json())
.then(data => {
    updateTotals(data); // Update totals after adding new transaction
});



let form = document.getElementById("addTransaction")

form.addEventListener("submit", (event)=>{
    event.preventDefault();



    let amount = document.getElementById("amount").value;
    let type = document.getElementById("type").value
    let description = document.getElementById("description").value


    fetch("http://localhost:3000/transactions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "id": datasourceLength + 1,
            "amount": amount,
            "type": type,
            "description": description,
        })
    })
})