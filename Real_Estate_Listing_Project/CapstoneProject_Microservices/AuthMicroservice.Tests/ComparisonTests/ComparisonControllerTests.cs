using Moq;
using NUnit.Framework;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ComparisonMicroservice.Controllers;
using ComparisonMicroservice.Repositories;
using ComparisonMicroservice.Models; 

namespace AllMicroservice_Tests.ComparisonTests
{
    [TestFixture]
    public class ComparisonControllerTests
    {
        private Mock<IComparisonRepository> _mockRepository;
        private ComparisonController _controller;

        [SetUp]
        public void Setup()
        {
            _mockRepository = new Mock<IComparisonRepository>();
            _controller = new ComparisonController(_mockRepository.Object);
        }

        [Test]
        public async Task ComparePropertiesByTitle_ShouldReturnBadRequest_WhenLessThanTwoTitlesAreProvided()
        {
            // Act
            var result = await _controller.CompareProperties(property1: "Property1");

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result.Result);
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(400, badRequestResult.StatusCode);
            Assert.AreEqual("At least two property titles are required for comparison.", badRequestResult.Value);
        }

        [Test]
        public async Task ComparePropertiesByTitle_ShouldReturnNotFound_WhenNoPropertiesAreFound()
        {
            // Arrange
            _mockRepository.Setup(repo => repo.GetPropertiesByTitlesAsync(It.IsAny<IEnumerable<string>>()))
                .ReturnsAsync(new List<Comparison>());

            // Act
            var result = await _controller.CompareProperties(property1: "Property1", property2: "Property2");

            // Assert
            Assert.IsInstanceOf<NotFoundObjectResult>(result.Result);
            var notFoundResult = result.Result as NotFoundObjectResult;
            Assert.AreEqual(404, notFoundResult.StatusCode);
            Assert.AreEqual("No properties found for the given titles.", notFoundResult.Value);
        }

        [Test]
        public async Task ComparePropertiesByTitle_ShouldReturnOk_WhenPropertiesAreFound()
        {
            // Arrange
            var properties = new List<Comparison>
            {
                new Comparison { Title = "Property1", Price = 100000 },
                new Comparison { Title = "Property2", Price = 150000 }
            };

            _mockRepository.Setup(repo => repo.GetPropertiesByTitlesAsync(It.IsAny<IEnumerable<string>>()))
                .ReturnsAsync(properties);

            // Act
            var result = await _controller.CompareProperties(property1: "Property1", property2: "Property2");

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            var okResult = result.Result as OkObjectResult;
            Assert.AreEqual(200, okResult.StatusCode);
            Assert.AreEqual(properties, okResult.Value);
        }

        [Test]
        public async Task ComparePropertiesByTitle_ShouldFilterNullTitles()
        {
            // Arrange
            var properties = new List<Comparison>
            {
                new Comparison { Title = "Property1", Price = 100000 },
                new Comparison { Title = "Property3", Price = 150000 }
            };

            _mockRepository.Setup(repo => repo.GetPropertiesByTitlesAsync(It.IsAny<IEnumerable<string>>()))
                .ReturnsAsync(properties);

            // Act
            var result = await _controller.CompareProperties(property1: "Property1", property2: null, property3: "Property3");

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            var okResult = result.Result as OkObjectResult;
            Assert.AreEqual(200, okResult.StatusCode);
            Assert.AreEqual(properties, okResult.Value);
        }
    }
}

