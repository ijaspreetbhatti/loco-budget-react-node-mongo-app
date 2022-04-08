# Loco Budget App by Jaspreet Bhatti

This app is live at https://loco-budget.herokuapp.com/
Heroku is used to host is the React App.

## Build
Run ```npm run build``` to build the js and styling.
This will build all files and place executable html and js in public folder.

## Run
Run ``npm run start`` to start node/express server.
Go to https://localhost:8080 to view the site.
You need to build first before running.

## Running for development
1. Run ``npm run watch`` to run webpack in watch mode.
2. Run ``npm run dev`` to run dev server using nodemon.
3. Go to https://localhost:8080 to view the site.

## Description
This is personal budget maker. In this you can add transactions and create different budgets you would want to apply to a particular period (Month of a year).

## Key features
1. All the transactions are paginated and all pages are dynamically created with MongoDB queries.
2. If your spending in a certain budget category is 80 to 89, it shows warning color yellow. For 90-100, it shows green background which means the spend is in budget. The background color is red in case its over the budget.
3. Using Reducer I turn the background color of a transaction that is being created yellow for the time the user has submitted the form but it has to be saved to Mongo yet. After saving it turn white which signifies the persistence of the data.

## App usage
### Transaction
- You can create a new transaction by clicking the `Add New Transaction` button and filling the form then pressing the `Save Transaction` button.
- You can edit and delete transaction by clicking the `Edit` button on each transaction.

### Budget
- You can select different budget and period to apply the budget using `Budget` and `Period` drop downs.
- You can create a new budget by clicking the `Create New Budget` button and filling the form then pressing the `Save Budget` button.
- You can edit and delete budget by clicking the `Edit` button next to the Budget drop down.

## API Documentation

### Transaction API endpoints

URL: `/api/v1/transaction`
Method: GET
Description: Gets a list of all the transactions.
Example Request: `/api/v1/transaction`
Optional Request: `/api/v1/transaction?count=10&page=1`

Response:
```
{
    "list": [
        {
            "_id": "624a4a2e3d32a18480c0b61d",
            "name": "iPhone 12",
            "category": "misc",
            "amount": 1600,
            "type": "expenses",
            "date": "2022-04-12T00:00:00.000Z",
            "__v": 0
        },
        {
            "_id": "624a49950dc1e128ee6c8284",
            "name": "Speaker",
            "category": "entertainment",
            "amount": 250.78,
            "type": "expenses",
            "date": "2022-04-06T00:00:00.000Z",
            "__v": 0
        }
    ],
    "totalTransactions": 11
}
```
---
URL: `/api/v1/transaction`
Method: GET
Description: Gets a transaction.
Example Request: `/api/v1/transaction/624a4a2e3d32a18480c0b61d`

Response:
```
{
    "_id": "624a4a2e3d32a18480c0b61d",
    "name": "iPhone 12",
    "category": "misc",
    "amount": 1600,
    "type": "expenses",
    "date": "2022-04-12T00:00:00.000Z",
    "__v": 0
}
```
---
URL: `/api/v1/transaction`
Method: POST
Description: Creates a new transaction.
Example Request: `/api/v1/transaction`
Body:
```
{
    "name": "Salary",
    "category": "salary",
    "amount": 300,
    "type": "income",
    "date": "2022-04-03T23:28:26.155Z"
}
```

Response:
```
{
    "url": "/api/v1/transaction/6250af22b1c85c2ea48aa458",
    "data": {
        "name": "Salary",
        "category": "salary",
        "amount": 200,
        "type": "income",
        "date": "2022-04-03T23:28:26.155Z",
        "_id": "6250af22b1c85c2ea48aa458",
        "__v": 0
    }
}
```
---
URL: `/api/v1/transaction`
Method: PUT
Description: Updates a new transaction.
Example Request: `/api/v1/transaction/6250af22b1c85c2ea48aa458`
Body:
```
{
    "name": "Salary",
    "category": "salary",
    "amount": 300,
    "type": "income",
    "date": "2022-04-03T23:28:26.155Z"
}
```

Response:
```
{
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
}
```
---
URL: `/api/v1/transaction`
Method: DELETE
Description: Deletes a transaction.
Example Request: `/api/v1/transaction/6250af22b1c85c2ea48aa458`

Response:
```
{
    "acknowledged": true,
    "deletedCount": 1
}
```

### Budget API endpoints

URL: `/api/v1/budget`
Method: GET
Description: Gets a list of all the budgets.
Example Request: `/api/v1/budget`

Response:
```
{
    "list": [
        {
            "_id": "624a4a2e3d32a18480c0b61d",
            "name": "iPhone 12",
            "category": "misc",
            "amount": 1600,
            "type": "expenses",
            "date": "2022-04-12T00:00:00.000Z",
            "__v": 0
        },
        {
            "_id": "624a49950dc1e128ee6c8284",
            "name": "Speaker",
            "category": "entertainment",
            "amount": 250.78,
            "type": "expenses",
            "date": "2022-04-06T00:00:00.000Z",
            "__v": 0
        }
    ],
    "totalTransactions": 11
}
```
---
URL: `/api/v1/budget`
Method: GET
Description: Gets a budget.
Example Request: `/api/v1/budget/624a173dfef2fcca016b5d26`

Response:
```
{
    "_id": "624a173dfef2fcca016b5d26",
    "name": "Main Budget",
    "entertainment": 100,
    "rent": 700,
    "utilities": 150,
    "groceries": 200,
    "misc": 100,
    "income": 1200,
    "__v": 0
}
```
---
URL: `/api/v1/budget`
Method: POST
Description: Creates a new budget.
Example Request: `/api/v1/budget`
Body:
```
{
    "name": "My Bug",
    "entertainment": "100",
    "rent": 0,
    "utilities": 0,
    "groceries": 10,
    "misc": 0,
    "income": 50
}
```

Response:
```
{
    "name": "My Bug",
    "entertainment": 100,
    "rent": 0,
    "utilities": 0,
    "groceries": 10,
    "misc": 0,
    "income": 50,
    "_id": "6250b1d4b1c85c2ea48aa45d",
    "__v": 0
}
```
---
URL: `/api/v1/budget`
Method: PUT
Description: Updates a new budget.
Example Request: `/api/v1/budget/624a173dfef2fcca016b5d26`
Body:
```
{
    "name": "My Bg",
    "entertainment": "5",
    "rent": 0,
    "utilities": 0,
    "groceries": 10,
    "misc": 0,
    "income": 50
}
```

Response:
```
{
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
}
```
---
URL: `/api/v1/budget`
Method: DELETE
Description: Deletes a budget.
Example Request: `/api/v1/budget/624a173dfef2fcca016b5d26`

Response:
```
{
    "acknowledged": true,
    "deletedCount": 1
}
```
