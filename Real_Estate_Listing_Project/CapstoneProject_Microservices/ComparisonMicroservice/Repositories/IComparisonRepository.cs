using ComparisonMicroservice.Models;

namespace ComparisonMicroservice.Repositories
{
    public interface IComparisonRepository
    {
        Task<IEnumerable<Comparison>> GetPropertiesByTitlesAsync(IEnumerable<string> titles);
    }
}
