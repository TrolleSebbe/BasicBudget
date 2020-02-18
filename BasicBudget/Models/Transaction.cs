using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
using System;

namespace BasicBudget.Models
{
    public class Transaction
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("ShortName")]
        [Required]
        public string ShortName { get; set; }

        [BsonElement("Amount")]
        [Required]
        public int Amount { get; set; }

        [BsonElement("Description")]
        public string Description { get; set; }

        [BsonElement("TransactionDate")]
        [Required]
        public DateTime TransactionDate { get; set; }
    }
}