using Microsoft.EntityFrameworkCore;
using SalesLTSpa.Data;
using SalesLTSpa.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesLTSpa.Services
{
    public class CustomerService
    {
        private readonly SalesLTSpaContext _context;

        public CustomerService(SalesLTSpaContext context)
        {
            _context = context;
        }

        public async Task<List<Customer>> FindAllAsync()
        {
            return await _context.Customer.ToListAsync();
        }

        public async Task<Customer> FindByIdAsync(int id)
        {
            return await _context.Customer.FirstOrDefaultAsync(obj => obj.CustomerID == id);
        }

        public async Task InsertAsync (Customer customer)
        {
            _context.Add(customer);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync (Customer customer)
        {
            bool hasAny = await _context.Customer.AnyAsync(x => x.CustomerID == customer.CustomerID);
            if (!hasAny)
            {
                throw new ApplicationException("Id not found");
            }
            try
            {
                _context.Update(customer);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException e)
            {
                throw new Exception("Not updated product");
            }
        }

        public async Task DeleteAsync (int id)
        {
            bool hasAny = await _context.Customer.AnyAsync(x => x.CustomerID == id);
            if (!hasAny)
            {
                throw new ApplicationException("Id not found");
            }
            try
            {
                var customer = await _context.Customer.FindAsync(id);
                _context.Customer.Remove(customer);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException e)
            {
                throw new Exception("Not remove customer");
            }
            
        }
    }
}
