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

        public DbSet<Customer> Customer { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<SalesOrderHeader> SalesOrderHeader { get; set; }

        public DbSet<SalesOrderDetail> SalesOrderDetail { get; set; }
    }
}
