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

        //GET: api/SalesOrder/Create
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

        //POST: api/SalesOrder/Create
        [HttpPost("Create")]
        public async Task<ActionResult<SalesOrderViewModel>> PostSalesOrderViewModel([FromBody] SalesOrderViewModel salesOrder)
        {
            var customer = await _customerService.FindByIdAsync(salesOrder.SalesOrderHeader.CustomerID);
            var salesOrderHeader = new SalesOrderHeader
            {
                OrderDate = salesOrder.SalesOrderHeader.OrderDate,
                Status = SaleStatus.Processing,
                OnlineOrderFlag = salesOrder.SalesOrderHeader.OnlineOrderFlag,
                PurchaseOrderNumber = salesOrder.SalesOrderHeader.PurchaseOrderNumber,
                SubTotal = salesOrder.SalesOrderHeader.SubTotal,
                TaxAmt = salesOrder.SalesOrderHeader.TaxAmt,
                Comment = salesOrder.SalesOrderHeader.Comment,
                Customer = customer
            };
            var products = new List<Product>();
            var itemDetails = new List<SalesOrderDetail>();

            await _salesOrderService.InsertAsync(salesOrderHeader);

            foreach(var item in salesOrder.SalesOrderDetails){
                var product = await _productService.FindByIdAsync(item.ProductID);
                var salesOrderDetail = new SalesOrderDetail
                {
                    OrderQty = item.OrderQty,
                    UnitPrice = item.UnitPrice,
                    UnitPriceDiscount = 0,
                    SalesOrderHeader = salesOrderHeader,
                    Product = product
                };
                await _salesOrderService.InsertSalesDetailAsync(salesOrderDetail);
            }
            return RedirectToAction("GetSalesOrder");
        }

    }
}
