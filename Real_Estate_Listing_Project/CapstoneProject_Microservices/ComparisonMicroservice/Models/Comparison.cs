using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ComparisonMicroservice.Models
{
    public class Comparison
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId PropId { get; set; }  // MongoDB ObjectId

        [BsonElement("title")]
        public string Title { get; set; }

        [BsonElement("price")]
        public decimal Price { get; set; }

        [BsonElement("location")]
        public string Location { get; set; }

        [BsonElement("size")]
        public int Size { get; set; }

        [BsonElement("number_of_bedrooms")]
        public int NumberOfBedrooms { get; set; }

        [BsonElement("status")]
        public string Status { get; set; }

        [BsonElement("description")]
        public string Description { get; set; }

        [BsonElement("image")]
        public string Image { get; set; }

        [BsonElement("agent")]
        public AgentDetails Agent { get; set; }  // Embedded document for agent details
    }

    public class AgentDetails
    {
        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("contact")]
        public string Contact { get; set; }

        [BsonElement("email")]
        public string Email { get; set; }
    }
}
