using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SalesLTSpa.Models
{
    public class Product
    {

        public int ProductID { get; set; }
        public string Name { get; set; }
        [Display(Name = "Product Number")]
        public string ProductNumber { get; set; }
        public string Color { get; set; }
        [Display(Name = "Standard Cost")]
        [DisplayFormat(DataFormatString = "{0:F2}")]
        public double StandardCost { get; set; }
        [Display(Name = "List Price")]
        [DisplayFormat(DataFormatString = "{0:F2}")]
        public double ListPrice { get; set; }
        [Display(Name = "Discontinued Date")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime DiscontinuedDate { get; set; }
        public string ThumbnailPhoto { get; set; }
        public string ThumbnailPhotoName { get; set; }

        public Product()
        {

        }

        public Product(int productID, string name, string productNumber, string color, double standardCost, double listPrice, DateTime discontinuedDate, string thumbnailPhoto, string thumbnailPhotoName)
        {
            ProductID = productID;
            Name = name;
            ProductNumber = productNumber;
            Color = color;
            StandardCost = standardCost;
            ListPrice = listPrice;
            DiscontinuedDate = discontinuedDate;
            ThumbnailPhoto = thumbnailPhoto;
            ThumbnailPhotoName = thumbnailPhotoName;
        }
    }
}
