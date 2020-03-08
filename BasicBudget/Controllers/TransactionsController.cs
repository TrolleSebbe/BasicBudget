using BasicBudget.Services;
using BasicBudget.Models;
using System.Linq;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace BasicBudget.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase // : ControllerBase is inheritance
    {
        private readonly TransactionService transactionService;

        public TransactionsController(TransactionService transactionService)
        {
            this.transactionService = transactionService;
        }

        [HttpGet("[action]")]
        public IEnumerable<Transaction> Get()
        {
            return transactionService.Get().ToArray();
        }

        [HttpPost("[action]")]
        public Transaction AddTransaction(Transaction transaction)
        {
            return transactionService.Create(transaction);
        }

        [HttpDelete("[action]")]
        public void DeleteTransaction(Transaction transaction)
        {
            transactionService.Remove(transaction);
        }
    }
}