using Microsoft.AspNetCore.Mvc;
using ComparisonMicroservice.Models;
using ComparisonMicroservice.Repositories;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ComparisonMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComparisonController : ControllerBase
    {
        private readonly IComparisonRepository _comparisonRepository;

        public ComparisonController(IComparisonRepository comparisonRepository)
        {
            _comparisonRepository = comparisonRepository;
        }

        // Endpoint to compare properties with at least two titles (fetch all details)
        [HttpGet("compare")]
        public async Task<ActionResult<IEnumerable<Comparison>>> CompareProperties(
            [FromQuery] string? property1 = null,
            [FromQuery] string? property2 = null,
            [FromQuery] string? property3 = null)
        {
            // Collect non-null titles into a list
            var titles = new List<string>();
            if (!string.IsNullOrWhiteSpace(property1)) titles.Add(property1);
            if (!string.IsNullOrWhiteSpace(property2)) titles.Add(property2);
            if (!string.IsNullOrWhiteSpace(property3)) titles.Add(property3);

            // Ensure at least two properties are provided
            if (titles.Count < 2)
            {
                return BadRequest("At least two property titles are required for comparison.");
            }

            var properties = await _comparisonRepository.GetPropertiesByTitlesAsync(titles);

            if (properties == null || !properties.Any())
            {
                return NotFound("No properties found for the given titles.");
            }

            return Ok(properties);
        }

        // Endpoint to get specific details (e.g., price, size, status, location) for multiple properties
        [HttpGet("specific-details")]
        public async Task<ActionResult<IEnumerable<dynamic>>> GetPropertiesSpecificDetails(
            [FromQuery] string? property1 = null,
            [FromQuery] string? property2 = null,
            [FromQuery] string? property3 = null)
        {
            // Collect non-null titles into a list
            var titles = new List<string>();
            if (!string.IsNullOrWhiteSpace(property1)) titles.Add(property1);
            if (!string.IsNullOrWhiteSpace(property2)) titles.Add(property2);
            if (!string.IsNullOrWhiteSpace(property3)) titles.Add(property3);

            // Ensure at least two properties are provided
            if (titles.Count < 2)
            {
                return BadRequest("At least two property titles are required for comparison.");
            }

            var properties = await _comparisonRepository.GetPropertiesByTitlesAsync(titles);

            if (properties == null || !properties.Any())
            {
                return NotFound("No properties found for the given titles.");
            }

            // Select only specific details for each property
            var specificDetails = properties.Select(property => new
            {
                property.Title,
                property.Price,
                property.Size,
                property.Status,
                property.Location
            });

            return Ok(specificDetails);
        }
    }
}

