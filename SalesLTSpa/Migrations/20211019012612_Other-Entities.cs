using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SalesLTSpa.Migrations
{
    public partial class OtherEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new
                {
                    ProductID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    ProductNumber = table.Column<string>(nullable: true),
                    Color = table.Column<string>(nullable: true),
                    StandardCost = table.Column<double>(nullable: false),
                    ListPrice = table.Column<double>(nullable: false),
                    DiscontinuedDate = table.Column<DateTime>(nullable: false),
                    ThumbnailPhoto = table.Column<string>(nullable: true),
                    ThumbnailPhotoName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product", x => x.ProductID);
                });

            migrationBuilder.CreateTable(
                name: "SalesOrderHeader",
                columns: table => new
                {
                    SalesOrderHeaderID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    OrderDate = table.Column<DateTime>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    OnlineOrderFlag = table.Column<bool>(nullable: false),
                    PurchaseOrderNumber = table.Column<string>(nullable: true),
                    SubTotal = table.Column<double>(nullable: false),
                    TaxAmt = table.Column<double>(nullable: false),
                    Comment = table.Column<string>(nullable: true),
                    CustomerID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalesOrderHeader", x => x.SalesOrderHeaderID);
                    table.ForeignKey(
                        name: "FK_SalesOrderHeader_Customer_CustomerID",
                        column: x => x.CustomerID,
                        principalTable: "Customer",
                        principalColumn: "CustomerID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SalesOrderDetail",
                columns: table => new
                {
                    SalesOrderDetailID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    OrderQty = table.Column<int>(nullable: false),
                    UnitPrice = table.Column<double>(nullable: false),
                    UnitPriceDiscount = table.Column<double>(nullable: false),
                    SalesOrderHeaderID = table.Column<int>(nullable: false),
                    ProductID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalesOrderDetail", x => x.SalesOrderDetailID);
                    table.ForeignKey(
                        name: "FK_SalesOrderDetail_Product_ProductID",
                        column: x => x.ProductID,
                        principalTable: "Product",
                        principalColumn: "ProductID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SalesOrderDetail_SalesOrderHeader_SalesOrderHeaderID",
                        column: x => x.SalesOrderHeaderID,
                        principalTable: "SalesOrderHeader",
                        principalColumn: "SalesOrderHeaderID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SalesOrderDetail_ProductID",
                table: "SalesOrderDetail",
                column: "ProductID");

            migrationBuilder.CreateIndex(
                name: "IX_SalesOrderDetail_SalesOrderHeaderID",
                table: "SalesOrderDetail",
                column: "SalesOrderHeaderID");

            migrationBuilder.CreateIndex(
                name: "IX_SalesOrderHeader_CustomerID",
                table: "SalesOrderHeader",
                column: "CustomerID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SalesOrderDetail");

            migrationBuilder.DropTable(
                name: "Product");

            migrationBuilder.DropTable(
                name: "SalesOrderHeader");
        }
    }
}
