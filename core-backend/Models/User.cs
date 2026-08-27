using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KhoaHocTamLinh.Api.Models
{
    [Table("users")]
    public class User
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }

        [Column("uuid")]
        [MaxLength(36)]
        public string Uuid { get; set; } = Guid.NewGuid().ToString();

        [Column("name")]
        [Required]
        [MaxLength(255)]
        public string Name { get; set; } = string.Empty;

        [Column("email")]
        [Required]
        [MaxLength(255)]
        public string Email { get; set; } = string.Empty;

        [Column("password")]
        [Required]
        [MaxLength(255)]
        public string PasswordHash { get; set; } = string.Empty;

        [Column("phone")]
        [MaxLength(20)]
        public string? Phone { get; set; }

        [Column("address")]
        [MaxLength(500)]
        public string? Address { get; set; }

        [Column("gender")]
        [MaxLength(10)]
        public string Gender { get; set; } = "other"; // male, female, other

        [Column("date_of_birth")]
        public DateOnly? DateOfBirth { get; set; }

        [Column("birth_time")]
        [MaxLength(10)]
        public string? BirthTime { get; set; }

        [Column("birth_place")]
        [MaxLength(255)]
        public string? BirthPlace { get; set; }

        [Column("is_lunar_birth")]
        public bool IsLunarBirth { get; set; } = false;

        [Column("spiritual_level")]
        public int SpiritualLevel { get; set; } = 1;

        [Column("avatar")]
        [MaxLength(500)]
        public string? Avatar { get; set; }

        [Column("balance")]
        public decimal Balance { get; set; } = 0;

        [Column("frozen_balance")]
        public decimal FrozenBalance { get; set; } = 0;

        [Column("role")]
        [MaxLength(20)]
        public string Role { get; set; } = "user"; // user, admin, expert

        [Column("two_factor_secret")]
        [MaxLength(255)]
        public string? TwoFactorSecret { get; set; }

        [Column("is_two_factor_enabled")]
        public bool IsTwoFactorEnabled { get; set; } = false;

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
