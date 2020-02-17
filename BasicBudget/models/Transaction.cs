using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace BasicBudget.ClientApp.src.models
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
    }
}