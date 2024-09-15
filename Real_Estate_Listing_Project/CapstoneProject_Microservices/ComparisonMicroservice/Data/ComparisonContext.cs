using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using ComparisonMicroservice.Models;
using System;

namespace ComparisonMicroservice.Data
{
    public class ComparisonContext
    {
        private readonly IMongoDatabase _database;

        public ComparisonContext(IConfiguration configuration)
        {
            // Fetch the connection string and database name from the configuration
            var connectionString = configuration["MongoDbSettings:ConnectionString"];
            var databaseName = configuration["MongoDbSettings:DatabaseName"];

            // Validate the configuration values to avoid null references
            if (string.IsNullOrEmpty(connectionString))
                throw new ArgumentNullException(nameof(connectionString), "Connection string is not configured.");

            if (string.IsNullOrEmpty(databaseName))
                throw new ArgumentNullException(nameof(databaseName), "Database name is not configured.");

            var client = new MongoClient(connectionString);
            _database = client.GetDatabase(databaseName);
        }

        // Comparison collection
        public IMongoCollection<Comparison> Properties => _database.GetCollection<Comparison>("properties");
    }
}
