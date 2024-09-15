using MongoDB.Driver;
using ComparisonMicroservice.Data;
using ComparisonMicroservice.Models;

namespace ComparisonMicroservice.Repositories
{
    public class ComparisonRepository : IComparisonRepository
    {
        private readonly ComparisonContext _context;

        public ComparisonRepository(ComparisonContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Comparison>> GetPropertiesByTitlesAsync(IEnumerable<string> titles)
        {
            var filter = Builders<Comparison>.Filter.In(p => p.Title, titles);
            return await _context.Properties.Find(filter).ToListAsync();
        }
    }
}
