using Microsoft.EntityFrameworkCore;
using SalesLTSpa.Data;
using SalesLTSpa.Models;
using SalesLTSpa.Services.Exceptions;
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
                .Include(x => x.SalesOrderDetails)
                .ThenInclude(y => y.Product)
                .Include(x => x.Customer)
                .OrderByDescending(x => x.OrderDate)
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

        public async Task UpdateSalesOrderHeader(SalesOrderHeader salesOrderHeader)
        {
            bool hasAny = await _context.SalesOrderHeader.AnyAsync(x => x.SalesOrderHeaderID == salesOrderHeader.SalesOrderHeaderID);
            if (!hasAny)
            {
                throw new ApplicationException("Sales order not found");
            }
            try
            {
                _context.Update(salesOrderHeader);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException e)
            {
                throw new Exception("Not updated sales order");
            }
        }

        public async Task DeleteSalesOrderAsync(int id)
        {
            bool hasAny = await _context.SalesOrderHeader.AnyAsync(x => x.SalesOrderHeaderID == id);
            if (!hasAny)
            {
                throw new ApplicationException("Id not found");
            }
            try
            {
                var salesOrder = await _context.SalesOrderHeader.FindAsync(id);
                var salesOrderDetails = await _context.SalesOrderDetail.Where(x => x.SalesOrderHeaderID == id).ToListAsync();
                _context.SalesOrderDetail.RemoveRange(salesOrderDetails);
                _context.SalesOrderHeader.Remove(salesOrder);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException e)
            {
                throw new IntegrityException("Não é possível excluir o pedido. Pedido possui items");
            }
        }

        public async Task DeleteAllSalesOrderDetails(int salesOrderID)
        {
            bool hasAny = await _context.SalesOrderDetail.AnyAsync(x => x.SalesOrderHeaderID == salesOrderID);
            if (!hasAny)
            {
                throw new ApplicationException("Sales Order not associate with details");
            }
            try
            {
                var salesOrderDetails = await _context.SalesOrderDetail.Where(x => x.SalesOrderHeaderID == salesOrderID).ToListAsync();
                _context.SalesOrderDetail.RemoveRange(salesOrderDetails);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException e)
            {
                throw new IntegrityException("Não é possível excluir o pedido. Pedido possui items");
            }
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
