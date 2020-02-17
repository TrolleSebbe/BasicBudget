using BasicBudget.Services;
using BasicBudget.Models;
using System.Linq;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace BasicBudget.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionsController
    {
/*         private readonly TransactionService transactionService;

        public TransactionsController(TransactionService transactionService)
        {
            this.transactionService = transactionService;
        } */
        public IEnumerable<Transaction> Get()
        {
            var randomizationVariable = new Random();
            return Enumerable.Range(1,100).Select(index => new Transaction
            {
                ShortName = "TrolleBolle",
                Amount = randomizationVariable.Next(-1000,1000)
            })
            .ToArray();
        }
        /* [HttpGet] */
        /*         public IEnumerable<Transaction> Get()
        {
            return transactionService.Get().ToArray();
        } */
    }
}