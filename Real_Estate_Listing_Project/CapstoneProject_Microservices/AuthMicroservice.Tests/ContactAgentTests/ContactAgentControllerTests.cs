using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;
using ContactAgentMicroservice.Controllers;
using ContactAgentMicroservice.Data;
using ContactAgentMicroservice.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace AllMicroservice_Tests.ContactAgentTests
{
    [TestFixture]
    public class ContactAgentControllerTests
    {
        private ContactAgentContext _context;
        private ContactAgentController _controller;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<ContactAgentContext>()
                .UseInMemoryDatabase(databaseName: "ContactAgentTestDb")
                .Options;

            _context = new ContactAgentContext(options);
            _controller = new ContactAgentController(_context);

            _context.ContactAgents.Add(new ContactAgent
            {
                Id = 1,
                FullName = "Jane Doe",
                Email = "janedoe@example.com",
                PhoneNumber = "0987654321",
                AgentEmail = "agent2@example.com",
                Message = "Request for a meeting",
                CreatedAt = DateTime.UtcNow
            });
            _context.SaveChanges();
        }

        [TearDown]
        public void TearDown()
        {
            _context.Database.EnsureDeleted();
        }

        // Test 1: Create ContactAgent with valid data
        [Test]
        public async Task CreateContactAgent_ValidData_ReturnsCreatedAtAction()
        {
            // Arrange
            var contactAgent = new ContactAgent
            {
                FullName = "John Doe",
                Email = "johndoe@example.com",
                PhoneNumber = "1234567890",
                AgentEmail = "agent@example.com",
                Message = "Looking for a property",
                ScheduleTiming = DateTime.UtcNow
            };

            // Act
            var result = await _controller.PostContactAgent(contactAgent);

            // Assert
            var actionResult = result.Result as CreatedAtActionResult;
            Assert.IsNotNull(actionResult);
            var returnValue = actionResult.Value as ContactAgent;
            Assert.IsNotNull(returnValue);
            Assert.AreEqual("John Doe", returnValue.FullName);
        }

        // Test Case 2: Get ContactAgent by existing ID
        [Test]
        public async Task GetContactAgent_ExistingId_ReturnsContactAgent()
        {
            // Act
            var result = await _controller.GetContactAgent(1);

            // Assert
            var actionResult = result.Value as ContactAgent;
            Assert.IsNotNull(actionResult);
            Assert.AreEqual(1, actionResult.Id);
            Assert.AreEqual("Jane Doe", actionResult.FullName);
        }

        // Test Case 3: Create ContactAgent with missing required fields
        [Test]
        public async Task CreateContactAgent_MissingRequiredFields_ReturnsBadRequest()
        {
            // Arrange
            var contactAgent = new ContactAgent
            {
                Message = "Looking for a property",
                Email = "test@example.com",
                PhoneNumber = "1234567890",
                AgentEmail = "agent@example.com"
            };

            _controller.ModelState.AddModelError("FullName", "The FullName field is required.");

            // Act
            var result = await _controller.PostContactAgent(contactAgent);

            // Assert
            var actionResult = result.Result as BadRequestObjectResult;
            Assert.IsNotNull(actionResult);
            Assert.AreEqual(400, actionResult.StatusCode);
        }

        // Test Case 4: Get ContactAgent with non-existing ID
        [Test]
        public async Task GetContactAgent_NonExistingId_ReturnsNotFound()
        {
            // Act
            var result = await _controller.GetContactAgent(999);

            // Assert
            var actionResult = result.Result as NotFoundResult;
            Assert.IsNotNull(actionResult);
            Assert.AreEqual(404, actionResult.StatusCode);
        }
    }
}
