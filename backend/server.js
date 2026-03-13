const express = require("express");
const cors = require("cors");   // ADD THIS

const app = express();

app.use(cors());                // ADD THIS
app.use(express.json());

const PORT = 3000;

let transactions = [];

app.get("/", (req, res) => {
    res.send("Personal Finance Tracker Backend Running");
});

app.get("/transactions", (req, res) => {
    res.json(transactions);
});

app.post("/transactions", (req, res) => {

    const transaction = req.body;

    transactions.push(transaction);

    res.json({
        message: "Transaction added",
        data: transaction
    });

});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});