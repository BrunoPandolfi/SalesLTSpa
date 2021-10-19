using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SalesLTSpa.Models;
using SalesLTSpa.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesLTSpa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductService _productService;

        public ProductsController (ProductService productService)
        {
            _productService = productService;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetCustomer()
        {
            return await _productService.FindAllAsync();
        }
    }
}
