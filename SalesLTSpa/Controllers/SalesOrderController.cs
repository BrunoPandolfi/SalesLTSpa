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
    public class SalesOrderController : ControllerBase
    {
        private readonly SalesOrderService _salesOrderService;

        public SalesOrderController (SalesOrderService salesOrderService)
        {
            _salesOrderService = salesOrderService;
        }

        //GET: api/SalesOrder
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SalesOrderHeader>>> GetSalesOrder()
        {
            return await _salesOrderService.FindAllAsync();
        }
    }
}
