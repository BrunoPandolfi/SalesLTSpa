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

        //GET: api/SalesOrder/Edit/5
        [HttpGet("Edit/{id}")]
        public async Task<ActionResult<SalesOrderViewModel>> GetSalesOrderViewModel(int id)
        {
            var customers = await _customerService.FindAllAsync();
            var products = await _productService.FindAllAsync();
            var salesOrder = await _salesOrderService.FindByIdAsync(id);
            var salesOrderHeader = new SalesOrderHeader
            {
                SalesOrderHeaderID = salesOrder.SalesOrderHeaderID,
                OrderDate = salesOrder.OrderDate,
                Status = salesOrder.Status,
                OnlineOrderFlag = salesOrder.OnlineOrderFlag,
                PurchaseOrderNumber = salesOrder.PurchaseOrderNumber,
                SubTotal = salesOrder.SubTotal,
                TaxAmt = salesOrder.TaxAmt,
                Comment = salesOrder.Comment,
                CustomerID = salesOrder.CustomerID
            };
            var salesOrderDetails = salesOrder.SalesOrderDetails;
            var viewModel = new SalesOrderViewModel
            {
                Customers = customers,
                Products = products,
                SalesOrderHeader = salesOrderHeader,
                SalesOrderDetails = salesOrderDetails
            };
            return viewModel;
        }

        //PUT: api/SalesOrder/Edit/5
        [HttpPut("Edit/{id}")]
        public async Task<ActionResult> PutSalesOrderHeader(int id, [FromBody] SalesOrderHeader salesOrderHeader)
        {
            var customer = await _customerService.FindByIdAsync(salesOrderHeader.CustomerID);
            var upSalesOrderHeader = new SalesOrderHeader
            {
                SalesOrderHeaderID = salesOrderHeader.SalesOrderHeaderID,
                OrderDate = salesOrderHeader.OrderDate,
                Status = salesOrderHeader.Status,
                OnlineOrderFlag = salesOrderHeader.OnlineOrderFlag,
                PurchaseOrderNumber = salesOrderHeader.PurchaseOrderNumber,
                SubTotal = salesOrderHeader.SubTotal,
                TaxAmt = salesOrderHeader.TaxAmt,
                Comment = salesOrderHeader.Comment,
                Customer = customer
            };
            await _salesOrderService.UpdateSalesOrderHeader(salesOrderHeader);
            return NoContent();
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
                    UnitPriceDiscount = item.UnitPriceDiscount,
                    SalesOrderHeader = salesOrderHeader,
                    Product = product
                };
                await _salesOrderService.InsertSalesDetailAsync(salesOrderDetail);
            }
            return RedirectToAction("GetSalesOrder");
        }

    }
}
