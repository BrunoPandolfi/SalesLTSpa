using Microsoft.EntityFrameworkCore;
using SalesLTSpa.Data;
using SalesLTSpa.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesLTSpa.Services
{
    public class SalesOrderService
    {
        private readonly SalesLTSpaContext _context;
        
        public SalesOrderService(SalesLTSpaContext context)
        {
            _context = context;
        }

        public async Task<List<SalesOrderHeader>> FindAllAsync()
        {
            return await _context.SalesOrderHeader
                .Include(x => x.Customer)
                .ToListAsync();
        }

        public async Task<SalesOrderHeader> FindByIdAsync(int id)
        {
            return await _context.SalesOrderHeader
                .Where(x => x.SalesOrderHeaderID == id)
                .Include(x => x.Customer)
                .Include(x => x.SalesOrderDetails)
                .ThenInclude(y=> y.Product)
                .FirstOrDefaultAsync();
        }

        public async Task InsertAsync(SalesOrderHeader salesOrder)
        {
            _context.Add(salesOrder);
            await _context.SaveChangesAsync();
        }

        public async Task InsertSalesDetailAsync(SalesOrderDetail salesDetail)
        {
            _context.Add(salesDetail);
            await _context.SaveChangesAsync();
        }


        public string getLastOrderNumber()
        {
            string lastPurchaseOrderNumber = _context.SalesOrderHeader.OrderBy(salesOrder => salesOrder.OrderDate).Last().PurchaseOrderNumber;
            string newOrderNumber = getNewOrderNumber(lastPurchaseOrderNumber);
            return newOrderNumber;
        }

        private string getNewOrderNumber(string lastOrderNumber)
        {
            string firstPart = lastOrderNumber.Substring(0, 3);
            int secondPart = Int32.Parse(lastOrderNumber.Substring(3, 3));
            secondPart += 1;
            string newOrderNumber = String.Concat(firstPart, secondPart.ToString());
            return newOrderNumber;
        }
    }
}
