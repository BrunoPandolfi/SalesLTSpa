﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SalesLTSpa.Data;

namespace SalesLTSpa.Migrations
{
    [DbContext(typeof(SalesLTSpaContext))]
    partial class SalesLTSpaContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.20")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("SalesLTSpa.Models.Customer", b =>
                {
                    b.Property<int>("CustomerID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("BirthDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("EmailAddress")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("FirstName")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("LastName")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Phone")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("CustomerID");

                    b.ToTable("Customer");
                });

            modelBuilder.Entity("SalesLTSpa.Models.Product", b =>
                {
                    b.Property<int>("ProductID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Color")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTime>("DiscontinuedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<double>("ListPrice")
                        .HasColumnType("double");

                    b.Property<string>("Name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("ProductNumber")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<double>("StandardCost")
                        .HasColumnType("double");

                    b.Property<string>("ThumbnailPhoto")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("ThumbnailPhotoName")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("ProductID");

                    b.ToTable("Product");
                });

            modelBuilder.Entity("SalesLTSpa.Models.SalesOrderDetail", b =>
                {
                    b.Property<int>("SalesOrderDetailID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("OrderQty")
                        .HasColumnType("int");

                    b.Property<int>("ProductID")
                        .HasColumnType("int");

                    b.Property<int>("SalesOrderHeaderID")
                        .HasColumnType("int");

                    b.Property<double>("UnitPrice")
                        .HasColumnType("double");

                    b.Property<double>("UnitPriceDiscount")
                        .HasColumnType("double");

                    b.HasKey("SalesOrderDetailID");

                    b.HasIndex("ProductID");

                    b.HasIndex("SalesOrderHeaderID");

                    b.ToTable("SalesOrderDetail");
                });

            modelBuilder.Entity("SalesLTSpa.Models.SalesOrderHeader", b =>
                {
                    b.Property<int>("SalesOrderHeaderID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Comment")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("CustomerID")
                        .HasColumnType("int");

                    b.Property<bool>("OnlineOrderFlag")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime>("OrderDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("PurchaseOrderNumber")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<double>("SubTotal")
                        .HasColumnType("double");

                    b.Property<double>("TaxAmt")
                        .HasColumnType("double");

                    b.HasKey("SalesOrderHeaderID");

                    b.HasIndex("CustomerID");

                    b.ToTable("SalesOrderHeader");
                });

            modelBuilder.Entity("SalesLTSpa.Models.SalesOrderDetail", b =>
                {
                    b.HasOne("SalesLTSpa.Models.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SalesLTSpa.Models.SalesOrderHeader", "SalesOrderHeader")
                        .WithMany("SalesOrderDetails")
                        .HasForeignKey("SalesOrderHeaderID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SalesLTSpa.Models.SalesOrderHeader", b =>
                {
                    b.HasOne("SalesLTSpa.Models.Customer", "Customer")
                        .WithMany("salesOrders")
                        .HasForeignKey("CustomerID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
