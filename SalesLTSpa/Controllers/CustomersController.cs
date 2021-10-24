using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SalesLTSpa.Data;
using SalesLTSpa.Models;
using SalesLTSpa.Services;

namespace SalesLTSpa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly CustomerService _customerService;

        public CustomersController(CustomerService customerService)
        {
            _customerService = customerService;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomer()
        {
            return await _customerService.FindAllAsync();
        }

        // GET: api/Customers/Customer/5
        [HttpGet("Customer/{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int? id)
        {
            if(id == null)
            {
                return BadRequest();
            }

            var customer = await _customerService.FindByIdAsync(id.Value);

            if (customer == null)
            {
                return NotFound("Testando Mensagem Error");
            }

            return customer;
        }

        // PUT: api/Customers/Customer/Edit/1
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("Customer/Edit/{id}")]
        public async Task<IActionResult> PutCustomer(int id, Customer customer)
        {
            if (id != customer.CustomerID)
            {
                return BadRequest();
            }

            try
            {
                await _customerService.UpdateAsync(customer);
            }
            catch (DbUpdateConcurrencyException)
            {
                throw new Exception("Não foi possível atualizar");
            }

            return NoContent();
        }

        // POST: api/Customers/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost("Create")]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {
            await _customerService.InsertAsync(customer);
            
            return CreatedAtAction("GetCustomer", new { id = customer.CustomerID }, customer);
        }

        // DELETE: api/Customers/Customer/Delete/5
        [HttpDelete("Customer/Delete/{id}")]
        public async Task<ActionResult> DeleteCustomer(int id)
        {
            await _customerService.DeleteAsync(id);
            return RedirectToAction("GetCustomer");
        }
    }
}
