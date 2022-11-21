const { ObjectId } = require('mongodb')
const { connectdb } = require("../config/config")

class Controller {
  static async transaction(req, res) {
    try {
      const { account_number } = req.headers
      const { transactionAmount, receiverNumber } = req.body
      
      if(!account_number) throw { message: 'Please Login First',  status: 'Failed', code: 404 }
      if(!transactionAmount || !receiverNumber) throw { message: 'Input data can not be empty',  status: 'Failed', code: 400 }
      if(!+transactionAmount) throw { message: 'Input amount of transaction must be a number', status: 'Failed', code: 400 }
      if(!+receiverNumber) throw { message: 'Input destination account number must be a number', status: 'Failed', code: 400 }
      if(receiverNumber == account_number) throw { message: 'You can not send to your own account', status: 'Failed', code: 400 }

      const user = await connectdb().collection('users').findOne({ account_number })
      if(!user) throw { message: 'User can not be found, please login again',  status: 'Failed', code: 404 }
      if(transactionAmount > user.balance) throw { message: 'Your balance is not enough, please try again',  status: 'Failed', code: 400 }

      const reciever = await connectdb().collection('users').findOne({ account_number: receiverNumber })
      if(!reciever) throw { message: 'Destination account number can not be found, please try again',  status: 'Failed', code: 404 }

      await connectdb().collection('users').updateOne(
        { account_number }, 
        { $set: { balance: (user.balance - +transactionAmount) } }
      )
      await connectdb().collection('users').updateOne(
        { account_number: receiverNumber }, 
        { $set: { balance: (reciever.balance + +transactionAmount) } }
      )
      
      await connectdb().collection('history').insertOne({
        name_sender: user.name,
        name_receiver: reciever.name,
        account_number_sender: user.account_number,
        account_number_receiver: reciever.account_number,
        transaction_amount: +transactionAmount,
        date_transaction: new Date(),
        status: 'Success'
      })

      res.status(201).json({ message: 'Transaction successful', status: 'Success' })
    } catch (err) {
      if(err.code) {
        res.status(err.code).json({ message: err.message, status: err.status })
      } else {
        res.status(500).json({ message: 'Internal server error', status: 'Failed' })
      }
    }
  }

  static async getUsers(req, res) {
    try {
      const data = await connectdb().collection('users').find().toArray()
      if(!data) res.status(400).json({ message: 'Error data not found' })
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json({ message: 'internal server error' })
    }
  }

  static async getHistories(req, res) {
    try {
      const data = await connectdb().collection('history').find().toArray()
      if(!data) res.status(400).json({ message: 'Error data not found' })
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json({ message: 'internal server error' })
    }
  }
}

module.exports = Controller