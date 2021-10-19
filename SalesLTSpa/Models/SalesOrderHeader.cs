using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SalesLTSpa.Models
{
    public class SalesOrderHeader
    {
        public int SalesOrderHeaderID { get; set; }
        [Display(Name = "Order Date")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime OrderDate { get; set; }
        public SaleStatus Status { get; set; }
        public bool OnlineOrderFlag { get; set; }
        [Display(Name = "Order Nº")]
        public string PurchaseOrderNumber { get; set; }
        [DisplayFormat(DataFormatString = "{0:C2}")]
        public double SubTotal { get; set; }
        [DisplayFormat(DataFormatString = "{0:C2}")]
        public double TaxAmt { get; set; }
        public string Comment { get; set; }
        public Customer Customer { get; set; }
        [Display(Name = "Customer")]
        public int CustomerID { get; set; }
        public ICollection<SalesOrderDetail> SalesOrderDetails = new List<SalesOrderDetail>();

        public SalesOrderHeader()
        {

        }

        public SalesOrderHeader(int salesOrderHeaderID, DateTime orderDate, SaleStatus status, bool onlineOrderFlag, string purchaseOrderNumber, double subTotal, double taxAmt, string comment, Customer customer)
        {
            SalesOrderHeaderID = salesOrderHeaderID;
            OrderDate = orderDate;
            Status = status;
            OnlineOrderFlag = onlineOrderFlag;
            PurchaseOrderNumber = purchaseOrderNumber;
            SubTotal = subTotal;
            TaxAmt = taxAmt;
            Comment = comment;
            Customer = customer;
        }
    }

}
