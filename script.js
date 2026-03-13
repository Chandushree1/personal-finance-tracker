// Get elements from HTML
const desc = document.getElementById("desc");
const amount = document.getElementById("amount");
const type = document.getElementById("type");
const addBtn = document.getElementById("addBtn");

const list = document.getElementById("list");
const balance = document.getElementById("balance");

// Store transactions
let transactions = [];

// Add button event
addBtn.addEventListener("click", addTransaction);


// Function to add transaction (send to backend)
async function addTransaction() {

let description = desc.value;
let amt = Number(amount.value);
let transactionType = type.value;

let transaction = {
description: description,
amount: amt,
type: transactionType
};

await fetch("http://localhost:3000/transactions", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify(transaction)

});

// reload transactions from backend
loadTransactions();

// clear inputs
desc.value = "";
amount.value = "";

}


// Function to load transactions from backend
async function loadTransactions() {

let response = await fetch("http://localhost:3000/transactions");

let data = await response.json();

transactions = data;

updateUI();

}


// Update UI
function updateUI() {

list.innerHTML = "";

transactions.forEach(function (t) {

let li = document.createElement("li");

li.textContent =
t.description + " - ₹" + t.amount + " (" + t.type + ")";

list.appendChild(li);

});

updateBalance();

}


// Calculate balance
function updateBalance() {

let total = 0;

transactions.forEach(function (t) {

if (t.type === "income") {
total += t.amount;
} else {
total -= t.amount;
}

});

balance.textContent = total;

}


// Load data when page opens
loadTransactions();