using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SalesLTSpa.Models;
using SalesLTSpa.Models.ViewModels;
using SalesLTSpa.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesLTSpa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesOrderController : ControllerBase
    {
        private readonly SalesOrderService _salesOrderService;
        private readonly CustomerService _customerService;
        private readonly ProductService _productService;
        public SalesOrderController(SalesOrderService salesOrderService, CustomerService customerService, ProductService productService)
        {
            _salesOrderService = salesOrderService;
            _customerService = customerService;
            _productService = productService;
        }

        //GET: api/SalesOrder
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SalesOrderHeader>>> GetSalesOrder()
        {
            return await _salesOrderService.FindAllAsync();
        }

        //GET: api/SalesOrder/4
        [HttpGet("{id}")]
        public async Task<ActionResult<SalesOrderHeader>> GetSalesOrder(int id)
        {
           if (id == null)
           {
                return BadRequest();
           }

            return await _salesOrderService.FindByIdAsync(id);
        }

        //GET: api/SalesOrder/4
        [HttpGet("Create")]
        public async Task<ActionResult<SalesOrderViewModel>> GetSalesOrderViewModel()
        {
            var customers = await _customerService.FindAllAsync();
            var products = await _productService.FindAllAsync();
            var viewModel = new SalesOrderViewModel { 
                Customers = customers,
                Products = products
            };
            return viewModel;
        }
    }
}
