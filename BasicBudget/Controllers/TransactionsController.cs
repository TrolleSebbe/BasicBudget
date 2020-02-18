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
        private readonly TransactionService transactionService;

        public TransactionsController(TransactionService transactionService)
        {
            this.transactionService = transactionService;
        }
        
        [HttpGet]
        public IEnumerable<Transaction> Get()
        {
            return transactionService.Get().ToArray();
        }
    }
}