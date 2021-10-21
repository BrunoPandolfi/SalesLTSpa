using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace SalesLTSpa.Models
{
    public class Customer
    {
        public int CustomerID { get; set; }
        [Display(Name = "First Name")]
        public string FirstName { get; set; }
        [Display(Name = "Last Name")]
        public string LastName { get; set; }
        [Display(Name = "Email Address")]
        public string EmailAddress { get; set; }
        public string Phone { get; set; }
        [Display(Name = "Birth Date")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime BirthDate { get; set; }
        public ICollection<SalesOrderHeader> salesOrders { get; set; } = new List<SalesOrderHeader>();
        [NotMapped]
        public string FullName { get { return FirstName + " " + LastName; } }

        public Customer()
        {

        }

        public Customer(int customerID, string firstName, string lastName, string emailAddress, string phone, DateTime birthDate)
        {
            CustomerID = customerID;
            FirstName = firstName;
            LastName = lastName;
            EmailAddress = emailAddress;
            Phone = phone;
            BirthDate = birthDate;

        }
    }

}
