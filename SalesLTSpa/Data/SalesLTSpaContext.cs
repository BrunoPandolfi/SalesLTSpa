using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SalesLTSpa.Models;

namespace SalesLTSpa.Data
{
    public class SalesLTSpaContext : DbContext
    {
        public SalesLTSpaContext (DbContextOptions<SalesLTSpaContext> options)
            : base(options)
        {
        }

        public DbSet<SalesLTSpa.Models.Customer> Customer { get; set; }
    }
}
