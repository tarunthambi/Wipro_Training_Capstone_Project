using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ContactAgentMicroservice.Data;
using ContactAgentMicroservice.Models;

namespace ContactAgentMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactAgentController : ControllerBase
    {
        private readonly ContactAgentContext _context;

        public ContactAgentController(ContactAgentContext context)
        {
            _context = context;
        }

        // POST: api/ContactAgent
        [HttpPost]
        public async Task<ActionResult<ContactAgent>> PostContactAgent(ContactAgent contactAgent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);  
            }

            _context.ContactAgents.Add(contactAgent);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetContactAgent), new { id = contactAgent.Id }, contactAgent);
        }

        // GET: api/ContactAgent/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ContactAgent>> GetContactAgent(int id)
        {
            var contactAgent = await _context.ContactAgents.FindAsync(id);

            if (contactAgent == null)
            {
                return NotFound();
            }

            return contactAgent;
        }

        // GET: api/ContactAgent
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactAgent>>> GetContactAgents()
        {
            return await _context.ContactAgents.ToListAsync();
        }

    }
}
