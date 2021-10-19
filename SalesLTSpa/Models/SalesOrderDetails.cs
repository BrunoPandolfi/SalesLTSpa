using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;


namespace SalesLTSpa.Models
{
    public class SalesOrderDetail
    {

        public int SalesOrderDetailID { get; set; }
        public int OrderQty { get; set; }
        [DisplayFormat(DataFormatString = "{0:C2}")]
        public double UnitPrice { get; set; }
        [DisplayFormat(DataFormatString = "{0:C2}")]
        public double UnitPriceDiscount { get; set; }
        public SalesOrderHeader SalesOrderHeader { get; set; }
        public int SalesOrderHeaderID { get; set; }
        public Product Product { get; set; }
        public int ProductID { get; set; }

        public SalesOrderDetail()
        {

        }

        public SalesOrderDetail(int salesOrderDetailID, int orderQty, double unitPrice, double unitPriceDiscount, SalesOrderHeader salesOrderHeader, Product product)
        {
            SalesOrderDetailID = salesOrderDetailID;
            OrderQty = orderQty;
            UnitPrice = unitPrice;
            UnitPriceDiscount = unitPriceDiscount;
            SalesOrderHeader = salesOrderHeader;
            Product = product;
        }

        public double TotalPriceProduct()
        {
            return UnitPrice * OrderQty;
        }

        public double TotalDiscountProduct()
        {
            return UnitPriceDiscount * OrderQty;
        }
    }
}
