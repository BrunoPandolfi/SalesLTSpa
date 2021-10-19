using Microsoft.EntityFrameworkCore;
using SalesLTSpa.Data;
using SalesLTSpa.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesLTSpa.Services
{
    public class ProductService
    {
        private readonly SalesLTSpaContext _context;

        public ProductService(SalesLTSpaContext context)
        {
            _context = context;
        }

        public async Task<List<Product>> FindAllAsync()
        {
            return await _context.Product.ToListAsync();
        }

        public async Task<Product> FindByIdAsync(int id)
        {
            return await _context.Product.FirstOrDefaultAsync(obj => obj.ProductID == id);
        }

        public async Task InsertAsync(Product product)
        {
            _context.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Product product)
        {
            bool hasAny = await _context.Product.AnyAsync(x => x.ProductID == product.ProductID);
            if (!hasAny)
            {
                throw new ApplicationException("Id not found");
            }
            try
            {
                _context.Update(product);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException e)
            {
                throw new Exception("Not updated product");
            }
        }
    }
}
