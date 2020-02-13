using System;
namespace BasicBudget
{
    public class BudgetPost
    {
        public DateTime Date { get; set; }

        public string ShortName { get; set; }

        public string Description { get; set; }

        public float Amount { get; set; }
    }
}