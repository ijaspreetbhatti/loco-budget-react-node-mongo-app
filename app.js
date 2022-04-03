const express = require('express');

const app = express();

const server = app.listen(
    process.env.PORT || 8080,
    () => console.log("Site is active on 8080. Visit http://localhost:8080/.")
);

app.use(express.static("public"));
app.use(express.json());

const BudgetRoutes = require('./routes/BudgetRoutes.js');

app.use('/api/v1', BudgetRoutes);