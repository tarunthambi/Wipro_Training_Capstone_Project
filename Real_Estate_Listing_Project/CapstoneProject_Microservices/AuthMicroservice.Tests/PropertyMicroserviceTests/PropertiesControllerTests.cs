using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using PropertyMicroservice.Controllers;
using PropertyMicroservice.Data;
using PropertyMicroservice.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace PropertyMicroservice.Tests
{
    [TestFixture]
    public class PropertiesControllerTests
    {
        private Mock<IPropertyRepository> _mockRepository;
        private PropertiesController _controller;

        [SetUp]
        public void Setup()
        {
            _mockRepository = new Mock<IPropertyRepository>();
            var mockConfiguration = new Mock<IConfiguration>();
            mockConfiguration.Setup(config => config["FileStorageSettings:ImageFolderPath"]).Returns("Images");
            _controller = new PropertiesController(_mockRepository.Object, mockConfiguration.Object);
        }

        [Test]
        public async Task GetAllProperties_ReturnsOkResult_WithListOfProperties()
        {
            // Arrange
            var properties = new List<Property> { new Property { Title = "Property1" }, new Property { Title = "Property2" } };
            _mockRepository.Setup(repo => repo.GetAllPropertiesAsync()).ReturnsAsync(properties);

            // Act
            var result = await _controller.GetAllProperties();

            // Assert
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var returnProperties = okResult.Value as List<Property>;
            Assert.IsNotNull(returnProperties);
            Assert.AreEqual(2, returnProperties.Count);
        }

        [Test]
        public async Task GetPropertyByTitle_ReturnsOkResult_WithProperty()
        {
            // Arrange
            var property = new Property { Title = "Property1" };
            _mockRepository.Setup(repo => repo.GetPropertyByTitleAsync("Property1")).ReturnsAsync(property);

            // Act
            var result = await _controller.GetPropertyByTitle("Property1");

            // Assert
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var returnProperty = okResult.Value as Property;
            Assert.IsNotNull(returnProperty);
            Assert.AreEqual("Property1", returnProperty.Title);
        }

        [Test]
        public async Task GetPropertyByTitle_ReturnsNotFound_WhenPropertyDoesNotExist()
        {
            // Arrange
            _mockRepository.Setup(repo => repo.GetPropertyByTitleAsync("NonExistent")).ReturnsAsync((Property)null);

            // Act
            var result = await _controller.GetPropertyByTitle("NonExistent");

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result.Result);
        }

        [Test]
        public async Task CreateProperty_ReturnsCreatedAtAction_WithProperty()
        {
            // Arrange
            var newProperty = new Property { Title = "NewProperty", Price = 1000m };
            _mockRepository.Setup(repo => repo.CreatePropertyAsync(newProperty)).Returns(Task.CompletedTask);

            // Act
            var result = await _controller.CreateProperty(newProperty);

            // Assert
            var createdAtActionResult = result.Result as CreatedAtActionResult;
            Assert.IsNotNull(createdAtActionResult);
            var returnProperty = createdAtActionResult.Value as Property;
            Assert.IsNotNull(returnProperty);
            Assert.AreEqual("NewProperty", returnProperty.Title);
        }

        [Test]
        public async Task UpdateProperty_ReturnsOk_WhenPropertyIsUpdated()
        {
            // Arrange
            var existingProperty = new Property { Title = "ExistingProperty", PropId = MongoDB.Bson.ObjectId.GenerateNewId() };
            _mockRepository.Setup(repo => repo.GetPropertyByTitleAsync("ExistingProperty")).ReturnsAsync(existingProperty);
            _mockRepository.Setup(repo => repo.UpdatePropertyByTitleAsync(existingProperty)).ReturnsAsync(true);

            // Act
            var result = await _controller.UpdateProperty("ExistingProperty", existingProperty);

            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual("Property details updated successfully.", okResult.Value);
        }

        [Test]
        public async Task DeleteProperty_ReturnsNoContent_WhenPropertyIsDeleted()
        {
            // Arrange
            _mockRepository.Setup(repo => repo.DeletePropertyByTitleAsync("DeleteProperty")).ReturnsAsync(true);

            // Act
            var result = await _controller.DeleteProperty("DeleteProperty");

            // Assert
            Assert.IsInstanceOf<NoContentResult>(result);
        }
    }
}
