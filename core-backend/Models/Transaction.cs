using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KhoaHocTamLinh.Api.Models
{
    [Table("transactions")]
    public class Transaction
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }

        [Column("transaction_code")]
        [Required]
        [MaxLength(64)]
        public string TransactionCode { get; set; } = string.Empty;

        [Column("user_id")]
        public long UserId { get; set; }

        [Column("type")]
        [Required]
        [MaxLength(50)]
        public string Type { get; set; } = "deposit"; // deposit, withdraw, purchase, reward, refund

        [Column("amount")]
        public decimal Amount { get; set; }

        [Column("balance_before")]
        public decimal BalanceBefore { get; set; }

        [Column("balance_after")]
        public decimal BalanceAfter { get; set; }

        [Column("description")]
        [MaxLength(500)]
        public string? Description { get; set; }

        [Column("status")]
        [MaxLength(20)]
        public string Status { get; set; } = "completed"; // pending, completed, failed, cancelled

        [Column("reference_id")]
        [MaxLength(100)]
        public string? ReferenceId { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("UserId")]
        public virtual User? User { get; set; }
    }
}
