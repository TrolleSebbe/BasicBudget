using System.Linq;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
namespace BasicBudget.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BudgetList
    {
        [HttpGet]
        public IEnumerable<BudgetPost> Get()
        {
            var randomizationVariable = new Random();
            return Enumerable.Range(1,10).Select(index => new BudgetPost
            {
                Date = DateTime.Now.AddDays(index),
                ShortName = "TrolleBolle",
                Description = "Trolle testar stenhårt",
                Amount = randomizationVariable.Next(0,1000)
            })
            .ToArray();
        }
        
        
    }
}