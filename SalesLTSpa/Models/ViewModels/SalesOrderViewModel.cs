using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesLTSpa.Models.ViewModels
{
    public class SalesOrderViewModel
    {
        public SalesOrderHeader SalesOrderHeader { get; set; }
        public ICollection<Customer> Customers { get; set; }
        public ICollection<SalesOrderDetail> SalesOrderDetails { get; set; }
        public ICollection<Product> Products { get; set; }
    }
}
