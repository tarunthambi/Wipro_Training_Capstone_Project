using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc;
using PropertyMicroservice.Models;
using PropertyMicroservice.Data;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace PropertyMicroservice.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertiesController : ControllerBase
    {
        private readonly IPropertyRepository _repository;
        private readonly string _imageFolderPath;

        public PropertiesController(IPropertyRepository repository, IConfiguration configuration)
        {
            _repository = repository;
            _imageFolderPath = Path.Combine(Directory.GetCurrentDirectory(), configuration["FileStorageSettings:ImageFolderPath"]);
            if (!Directory.Exists(_imageFolderPath))
            {
                Directory.CreateDirectory(_imageFolderPath);
            }
        }


        // Get all properties
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Property>>> GetAllProperties()
        {
            var properties = await _repository.GetAllPropertiesAsync();
            return Ok(properties);
        }

        // Get a property by its title
        [HttpGet("{title}")]
        public async Task<ActionResult<Property>> GetPropertyByTitle(string title)
        {
            var property = await _repository.GetPropertyByTitleAsync(title);
            if (property == null)
            {
                return NotFound();
            }
            return Ok(property);
        }

        // Get properties by status
        [HttpGet("by-status/{status}")]
        public async Task<ActionResult<IEnumerable<Property>>> GetPropertiesByStatus(string status)
        {
            var properties = await _repository.GetPropertiesByStatusAsync(status);
            return Ok(properties);
        }

        // Get properties within a price range
        [HttpGet("by-price")]
        public async Task<ActionResult<IEnumerable<Property>>> GetPropertiesByPrice([FromQuery] decimal minPrice, [FromQuery] decimal maxPrice)
        {
            var properties = await _repository.GetPropertiesByPriceRangeAsync(minPrice, maxPrice);
            return Ok(properties);
        }

        // Get properties within a size range
        [HttpGet("by-size")]
        public async Task<ActionResult<IEnumerable<Property>>> GetPropertiesBySize([FromQuery] int minSize, [FromQuery] int maxSize)
        {
            var properties = await _repository.GetPropertiesBySizeRangeAsync(minSize, maxSize);
            return Ok(properties);
        }

        // Get properties by location
        [HttpGet("by-location/{location}")]
        public async Task<ActionResult<IEnumerable<Property>>> GetPropertiesByLocation(string location)
        {
            var properties = await _repository.GetPropertiesByLocationAsync(location);
            return Ok(properties);
        }

        // Create a new property  , IFormFile imageFile
        [HttpPost]
        public async Task<ActionResult<Property>> CreateProperty(Property property)
        {
            //if (imageFile != null)
            //{
            //    property.Image = await SaveImageLocallyAsync(imageFile);
            //}
            await _repository.CreatePropertyAsync(property);
            return CreatedAtAction(nameof(GetPropertyByTitle), new { title = property.Title }, property);
        }

        // Update an existing property by title
        [HttpPut("{title}")]
        public async Task<IActionResult> UpdateProperty(string title, Property property)
        {
            if (title != property.Title)
            {
                return BadRequest("Title in URL and body must match.");
            }

            var existingProperty = await _repository.GetPropertyByTitleAsync(title);
            if (existingProperty == null)
            {
                return NotFound(new { message = $"Property with title '{title}' not found." });
            }

            //if (imageFile != null)
            //{
            //    property.Image = await SaveImageLocallyAsync(imageFile);
            //}
            property.PropId = existingProperty.PropId;

            // Perform the update
            var result = await _repository.UpdatePropertyByTitleAsync(property);
            if (!result)
            {
                return NotFound(new { message = $"Failed to update property with title '{title}'." });
            }

            return Ok("Property details updated successfully.");
        }

        // Delete a property by title
        [HttpDelete("{title}")]
        public async Task<IActionResult> DeleteProperty(string title)
        {
            var result = await _repository.DeletePropertyByTitleAsync(title);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        private async Task<string> SaveImageLocallyAsync(IFormFile imageFile)
        {
            var fileName = Guid.NewGuid() + Path.GetExtension(imageFile.FileName);
            var filePath = Path.Combine(_imageFolderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            return fileName; // Return the file name
        }
    }
}