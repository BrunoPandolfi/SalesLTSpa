using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SalesLTSpa.Models;
using SalesLTSpa.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace SalesLTSpa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductService _productService;
        private readonly IWebHostEnvironment webHostEnvironment;

        public ProductsController(ProductService productService, IWebHostEnvironment hostEnvironment)
        {
            _productService = productService;
            webHostEnvironment = hostEnvironment;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProduct()
        {
            return await _productService.FindAllAsync();
        }

        // GET: api/Products/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            return await _productService.FindByIdAsync(id);
        }

        // POST: api/Products
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct([FromBody] Product product)
        {
            string imagePath = "";
           //Console.WriteLine(webHostEnvironment);
            if (product.ThumbnailPhoto == null || product.ThumbnailPhoto == "")
            {
                imagePath = Path.Combine("Images/", "notfound.jpg");
            }
            else
            {
                imagePath = SaveImage(product.ThumbnailPhoto, product.ThumbnailPhotoName);
            }
            var standardCost = product.StandardCost.ToString().Replace(',', '.');
            var listPrice = product.ListPrice.ToString().Replace(',', '.');
            Product newProduct = new Product
            {
                Name = product.Name,
                ProductNumber = product.ProductNumber,
                Color = product.Color,
                StandardCost = Double.Parse(standardCost),
                ListPrice = Double.Parse(listPrice),
                DiscontinuedDate = product.DiscontinuedDate,
                ThumbnailPhoto = imagePath,
                ThumbnailPhotoName = product.ThumbnailPhotoName
            };
            await _productService.InsertAsync(newProduct);
            return CreatedAtAction("GetProduct", new { id = product.ProductID }, newProduct);
            //return webHostEnvironment.ToString();
        }

        // PUT: api/Products
        [HttpPut("{id}")]
        public async Task<ActionResult<Product>> PutProduct([FromBody] Product product)
        {
            string imagePath = "";
            if (product.ThumbnailPhoto == null || product.ThumbnailPhoto == "")
            {
                imagePath = Path.Combine("Images/", product.ThumbnailPhotoName);
            }
            else
            {
                imagePath = SaveImage(product.ThumbnailPhoto, product.ThumbnailPhotoName);
            }
            var standardCost = product.StandardCost.ToString().Replace(',', '.');
            var listPrice = product.ListPrice.ToString().Replace(',', '.');
            Product upProduct = new Product
            {
                ProductID = product.ProductID,
                Name = product.Name,
                ProductNumber = product.ProductNumber,
                Color = product.Color,
                StandardCost = Double.Parse(standardCost),
                ListPrice = Double.Parse(listPrice),
                DiscontinuedDate = product.DiscontinuedDate,
                ThumbnailPhoto = imagePath,
                ThumbnailPhotoName = product.ThumbnailPhotoName
            };
            
            await _productService.UpdateAsync(upProduct);
            return CreatedAtAction("GetProduct", new { id = product.ProductID }, upProduct);
        }

        private string SaveImage (string ImgStr, string ImgName)
        {
            var converted = ImgStr.Split(',').ToList<string>();
            if (!Directory.Exists("Images"))
            {
                Directory.CreateDirectory("Images");
            }

            string imageName = ImgName;

            string imagePath = Path.Combine("Images/", imageName);

            byte[] imageBytes = Convert.FromBase64String(converted[1]);
            System.IO.File.WriteAllBytes(imagePath, imageBytes);

            return imagePath;
        }

    }
}
