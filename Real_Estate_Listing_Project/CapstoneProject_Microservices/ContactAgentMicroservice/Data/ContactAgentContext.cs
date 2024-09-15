using Microsoft.EntityFrameworkCore;
using ContactAgentMicroservice.Models;
using System.Collections.Generic;

namespace ContactAgentMicroservice.Data
{
    public class ContactAgentContext : DbContext
    {
        public ContactAgentContext(DbContextOptions<ContactAgentContext> options)
            : base(options)
        {
        }

        public DbSet<ContactAgent> ContactAgents { get; set; }
    }
}
