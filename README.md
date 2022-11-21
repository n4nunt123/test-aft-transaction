## ENDPOINTS
LIST OF AVAILABLE ENDPOINTS
  - `GET /`
  - `POST /`
  - `GET /histories`

## GET /
### Description
  - Get all data users from database
#### Response
_200 - OK_
- Body
    ```json
    [
      {
      "_id": ObjectId(STRING),
      "name": STRING,
      "balance": INTEGER,
      "account_number": STRING
      },...
    ]
    ```

## POST /
### Description
  - Endpoint for transaction
#### Request
- Header
    ```json
    {
      "account_number": STRING
    }
    ```
- Body
    ```json
    {
      "transactionAmount": INTEGER,
      "receiverNumber": STRING
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "message": "Transaction Successful",
      "status": "Success"
    }
    ```
_404 - Data Not Found_
- Body
    ```json
    {
      "message": STRING,
      "status": "Failed"
    }
    ```
_400 - Invalid Request_
- Body
    ```json
    {
      "message": STRING,
      "status": "Failed"
    }
    ```

## GET /histories
### Description
  - Get all data history from database
#### Response
_200 - OK_
- Body
    ```json
    [
      {
        "_id": ObjectId(STRING),
        "name_sender": STRING,
        "name_receiver": STRING,
        "account_number_sender": STRING,
        "account_number_receiver": STRING,
        "transaction_amount": INTEGER,
        "date_transaction": DATE,
        "status": STRING
      },...
    ]
    ```

### Global Error
#### Response
_500 - Bad Request_
- Body
    ```json
    {
      "message": "internal server error" 
    }
    ```