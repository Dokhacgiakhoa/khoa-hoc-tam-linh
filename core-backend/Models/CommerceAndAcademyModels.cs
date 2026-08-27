using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KhoaHocTamLinh.Api.Models
{
    [Table("categories")]
    public class Category
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("name")]
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Column("slug")]
        [Required]
        [MaxLength(120)]
        public string Slug { get; set; } = string.Empty;

        [Column("type")]
        [MaxLength(50)]
        public string Type { get; set; } = "product"; // product, course, service

        [Column("description")]
        public string? Description { get; set; }
    }

    [Table("products")]
    public class Product
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }

        [Column("category_id")]
        public int? CategoryId { get; set; }

        [Column("name")]
        [Required]
        [MaxLength(255)]
        public string Name { get; set; } = string.Empty;

        [Column("slug")]
        [Required]
        [MaxLength(255)]
        public string Slug { get; set; } = string.Empty;

        [Column("price")]
        public decimal Price { get; set; }

        [Column("image_url")]
        [MaxLength(500)]
        public string? ImageUrl { get; set; }

        [Column("description")]
        public string? Description { get; set; }

        [Column("stock_quantity")]
        public int StockQuantity { get; set; } = 100;

        [Column("is_featured")]
        public bool IsFeatured { get; set; } = false;

        [Column("views")]
        public long Views { get; set; } = 0;

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("CategoryId")]
        public virtual Category? Category { get; set; }
    }

    [Table("orders")]
    public class Order
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }

        [Column("order_code")]
        [Required]
        [MaxLength(64)]
        public string OrderCode { get; set; } = string.Empty;

        [Column("user_id")]
        public long UserId { get; set; }

        [Column("total_amount")]
        public decimal TotalAmount { get; set; }

        [Column("discount_amount")]
        public decimal DiscountAmount { get; set; } = 0;

        [Column("final_amount")]
        public decimal FinalAmount { get; set; }

        [Column("status")]
        [MaxLength(30)]
        public string Status { get; set; } = "completed"; // pending, completed, cancelled

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("UserId")]
        public virtual User? User { get; set; }

        public virtual ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
    }

    [Table("order_items")]
    public class OrderItem
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }

        [Column("order_id")]
        public long OrderId { get; set; }

        [Column("item_type")]
        [MaxLength(50)]
        public string ItemType { get; set; } = "product"; // product, course, service

        [Column("item_id")]
        public long ItemId { get; set; }

        [Column("item_name")]
        [MaxLength(255)]
        public string ItemName { get; set; } = string.Empty;

        [Column("price")]
        public decimal Price { get; set; }

        [Column("quantity")]
        public int Quantity { get; set; } = 1;

        [ForeignKey("OrderId")]
        public virtual Order? Order { get; set; }
    }

    [Table("courses")]
    public class Course
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }

        [Column("name")]
        [Required]
        [MaxLength(255)]
        public string Name { get; set; } = string.Empty;

        [Column("slug")]
        [Required]
        [MaxLength(255)]
        public string Slug { get; set; } = string.Empty;

        [Column("price")]
        public decimal Price { get; set; }

        [Column("image_url")]
        [MaxLength(500)]
        public string? ImageUrl { get; set; }

        [Column("description")]
        public string? Description { get; set; }

        [Column("total_lessons")]
        public int TotalLessons { get; set; } = 0;
    }

    [Table("certificates")]
    public class Certificate
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }

        [Column("certificate_code")]
        [Required]
        [MaxLength(64)]
        public string CertificateCode { get; set; } = string.Empty;

        [Column("user_id")]
        public long UserId { get; set; }

        [Column("course_id")]
        public long CourseId { get; set; }

        [Column("score")]
        public decimal Score { get; set; }

        [Column("issued_at")]
        public DateTime IssuedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("UserId")]
        public virtual User? User { get; set; }

        [ForeignKey("CourseId")]
        public virtual Course? Course { get; set; }
    }
}
