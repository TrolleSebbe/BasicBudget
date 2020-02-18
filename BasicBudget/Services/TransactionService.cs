using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using BasicBudget.Models;

namespace BasicBudget.Services
{
    public class TransactionService
    {
        private readonly IMongoCollection<Transaction> transactions;

        public TransactionService(IConfiguration config)
        {
            MongoClient client = new MongoClient(config.GetConnectionString("BasicBudgetDb"));
            IMongoDatabase database = client.GetDatabase("BasicBudgetDb");
            transactions = database.GetCollection<Transaction>("Transactions");
        }

        public List<Transaction> Get()
        {
            //this adds a transaction to the db so we have something to show
            Transaction trans = new Transaction
            {
                ShortName = "hej",
                Amount = 10,
                Description = "tjenare",
                TransactionDate = DateTime.Now
            };
            transactions.InsertOne(trans);
            //below is the only real line needed in this function
            return transactions.Find(Transaction => true).ToList();
        }

        public Transaction Create(Transaction transaction)
        {
            transactions.InsertOne(transaction);
            return transaction;
        }
    }
}