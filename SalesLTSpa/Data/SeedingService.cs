using SalesLTSpa.Data;
using SalesLTSpa.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesLTSpa.Data
{
    public class SeedingService
    {
        private SalesLTSpaContext _context;

        public SeedingService(SalesLTSpaContext context)
        {
            _context = context;
        }

        public void Seed()
        {
            if (_context.Customer.Any() ||
                _context.SalesOrderHeader.Any() ||
                _context.SalesOrderDetail.Any() ||
                _context.Product.Any())
            {
                return; //DB has been seeded
            }

            Customer c1 = new Customer(1, "Bob", "Brown", "bob@gmail.com", "(27)99933-3232", new DateTime(1990, 2, 21));
            Customer c2 = new Customer(2, "Alex", "Blue", "alex@hotmail.com", "(27)98754-6548", new DateTime(1970, 4, 4));
            Customer c3 = new Customer(3, "Maria", "Green", "maria@outlook.com", "(27)978546-5484", new DateTime(1993, 12, 15));
            Customer c4 = new Customer(4, "John", "Grey", "john@yahoo.com", "(27)99784-1254", new DateTime(1987, 5, 15));
            Customer c5 = new Customer(5, "Joe", "Blue", "joe@gmail.com", "(27)99478-9875", new DateTime(1978, 6, 30));
            Customer c6 = new Customer(6, "Beth", "Ross", "beth@hotmail.com", "(27)99654-3546", new DateTime(1998, 7, 21));

            SalesOrderHeader o1 = new SalesOrderHeader(1, new DateTime(2021, 05, 13), SaleStatus.Approved, false, "125468", 42300.00, 846.00, "Sem observações", c1);
            SalesOrderHeader o2 = new SalesOrderHeader(2, new DateTime(2021, 06, 5), SaleStatus.Pending, true, "125478", 3270.50, 65.41, "Sem observações", c2);
            SalesOrderHeader o3 = new SalesOrderHeader(3, new DateTime(2021, 10, 13), SaleStatus.Processing, false, "128483", 7110.00, 140.00, "Sem observações", c4);
            SalesOrderHeader o4 = new SalesOrderHeader(4, new DateTime(2021, 09, 12), SaleStatus.Approved, true, "127267", 6750.00, 140.00, "Sem observações", c6);
            SalesOrderHeader o5 = new SalesOrderHeader(5, new DateTime(2021, 08, 24), SaleStatus.Approved, false, "126021", 3686.50, 73.73, "Sem observações", c5);
            SalesOrderHeader o6 = new SalesOrderHeader(6, new DateTime(2021, 05, 17), SaleStatus.Pending, false, "125473", 427.50, 8.55, "Sem observações", c1);
            SalesOrderHeader o7 = new SalesOrderHeader(7, new DateTime(2021, 09, 5), SaleStatus.Approved, true, "126987", 5130.00, 102.50, "Sem observações", c2);
            SalesOrderHeader o8 = new SalesOrderHeader(8, new DateTime(2021, 08, 14), SaleStatus.Processing, true, "126920", 8604.00, 172.08, "Sem observações", c4);
            SalesOrderHeader o9 = new SalesOrderHeader(9, new DateTime(2021, 07, 25), SaleStatus.Approved, false, "125725", 4247.00, 84.94, "Sem observações", c3);
            SalesOrderHeader o10 = new SalesOrderHeader(10, new DateTime(2021, 09, 20), SaleStatus.Pending, true, "127420", 4410.00, 88.20, "Sem observações", c2); ;
            SalesOrderHeader o11 = new SalesOrderHeader(11, new DateTime(2021, 06, 06), SaleStatus.Approved, false, "125481", 342.00, 6.84, "Sem observações", c3);
            SalesOrderHeader o12 = new SalesOrderHeader(12, new DateTime(2021, 05, 29), SaleStatus.Approved, true, "125479", 7200.00, 144.00, "Sem observações", c4);

            Product p1 = new Product(1, "Dell G15 15,6 Notebook", "G5510U6000W", "grey", 800.00, 5700.00, new DateTime(2022, 5, 20), "produto1.jpeg", "produto1.jpeg");
            Product p2 = new Product(2, "Lavadora de Alta Pressão Electrolux", "EWS31", "yellow", 200.00, 450.00, new DateTime(2022, 2, 10), "produto2.png", "produto2.png");
            Product p3 = new Product(3, "Xiaomi Mi Smart Band 5", "XMSH10HM", "black", 100.00, 530.00, new DateTime(2023, 7, 1), "produto3.jpg", "produto3.jpg");
            Product p4 = new Product(4, "Lâmpada Inteligente Xiaomi Yeelight", "white", "MJDPL01YL", 50.00, 140.00, new DateTime(2022, 12, 23), "produto4.jpg", "produto4.jpg");
            Product p5 = new Product(5, "Playstation 5", "CFI1014A", "white", 500.00, 4200.00, new DateTime(2026, 1, 1), "produto5.jpeg", "produto5.jpeg");
            Product p6 = new Product(6, "Xbox Series X", "B088GHBH92", "black piano", 400.00, 3800.00, new DateTime(2026, 3, 1), "produto6.jpg", "produto6.jpg");
            Product p7 = new Product(7, "SmartTV Samsung 50 pol.", "QN50Q60AAGXZD", "black piano", 700.00, 3700.00, new DateTime(2022, 4, 13), "produto7.jpg", "produto7.jpg");
            Product p8 = new Product(8, "Xiaomi Mi 11 5G 256GB", "PRDC00318", "blue aqua", 500.00, 9000.00, new DateTime(2023, 7, 31), "produto8.jpg", "produto8.jpg");
            Product p9 = new Product(9, "Air Fryer Mondial Grand Family 5L", "AFN50BI", "black", 80.00, 470.00, new DateTime(2022, 12, 20), "produto9.jpeg", "produto9.jpeg");
            Product p10 = new Product(10, "Ar Condicionado Split LG Dual Inverter", "S4W12JARPA", "white", 650.00, 3600.00, new DateTime(2023, 4, 23), "produto10.jpeg", "produto10.jpeg");
            Product p11 = new Product(11, "Amazon Echo Dot 3ª Ger", "B07PDHSMHP", "black", 100.00, 360.00, new DateTime(2022, 5, 20), "produto11.jpg", "produto11.jpg");
            Product p12 = new Product(12, "Multifuncional Lexmark MX622adhe", "36S0910", "gray", 650.00, 4900.00, new DateTime(2023, 3, 5), "produto12.png", "produto12.png");

            SalesOrderDetail i1 = new SalesOrderDetail(1, 2, 5700.00, 570.00, o1, p1);
            SalesOrderDetail i2 = new SalesOrderDetail(2, 3, 9000.00, 900.00, o1, p8);
            SalesOrderDetail i3 = new SalesOrderDetail(3, 1, 4900.00, 490.00, o1, p12);
            SalesOrderDetail i4 = new SalesOrderDetail(4, 1, 3700.00, 370.00, o1, p7);
            SalesOrderDetail i5 = new SalesOrderDetail(5, 10, 140.00, 0.00, o2, p4);
            SalesOrderDetail i6 = new SalesOrderDetail(6, 3, 530.00, 26.50, o2, p3);
            SalesOrderDetail i7 = new SalesOrderDetail(7, 1, 360.00, 0.00, o2, p11);
            SalesOrderDetail i8 = new SalesOrderDetail(8, 1, 4200.00, 420.00, o3, p5);
            SalesOrderDetail i9 = new SalesOrderDetail(9, 1, 3700.00, 370.00, o3, p7);
            SalesOrderDetail i10 = new SalesOrderDetail(10, 1, 3800.00, 380.00, o4, p6);
            SalesOrderDetail i11 = new SalesOrderDetail(11, 1, 3700.00, 200.00, o4, p7);
            SalesOrderDetail i12 = new SalesOrderDetail(12, 1, 470.00, 23.50, o5, p9);
            SalesOrderDetail i13 = new SalesOrderDetail(13, 1, 3600.00, 360.00, o5, p10);
            SalesOrderDetail i14 = new SalesOrderDetail(14, 10, 450.00, 22.50, o6, p2);
            SalesOrderDetail i15 = new SalesOrderDetail(15, 2, 5700.00, 570.00, o7, p1);
            SalesOrderDetail i16 = new SalesOrderDetail(16, 1, 530.00, 26.00, o8, p3);
            SalesOrderDetail i17 = new SalesOrderDetail(17, 1, 9000.00, 900.00, o8, p8);
            SalesOrderDetail i18 = new SalesOrderDetail(18, 2, 450.00, 22.50, o9, p2);
            SalesOrderDetail i19 = new SalesOrderDetail(19, 5, 140.00, 7.00, o9, p4);
            SalesOrderDetail i20 = new SalesOrderDetail(20, 1, 470.00, 23.50, o9, p9);
            SalesOrderDetail i21 = new SalesOrderDetail(21, 2, 3600.00, 360.00, o9, p10);
            SalesOrderDetail i22 = new SalesOrderDetail(22, 2, 4900.00, 490.00, o10, p12);
            SalesOrderDetail i23 = new SalesOrderDetail(23, 3, 360.00, 18.00, o11, p11);
            SalesOrderDetail i24 = new SalesOrderDetail(24, 1, 4200.00, 420.00, o12, p5);
            SalesOrderDetail i25 = new SalesOrderDetail(25, 1, 3800.00, 380.00, o12, p6);

            _context.Customer.AddRange(c1, c2, c3, c4, c5, c6);
            _context.Product.AddRange(p1, p2, p3, p4, p5, p6,
                p7, p8, p9, p10, p11, p12);
            _context.SalesOrderHeader.AddRange(o1, o2, o3, o4, o5, o6,
                o7, o8, o9, o10, o11, o12);
            _context.SalesOrderDetail.AddRange(i1, i2, i3, i4, i5, i6, i7, i8, i9, i10,
                i11, i12, i13, i14, i15, i16, i17, i18, i19, i20,
                i21, i22, i23, i24, i25);
            _context.SaveChanges();

        }
    }
}
