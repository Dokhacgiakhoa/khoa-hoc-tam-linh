using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KhoaHocTamLinh.Api.Models
{
    [Table("iching_hexagrams")]
    public class IChingHexagram
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("hexagram_number")]
        public int HexagramNumber { get; set; }

        [Column("binary_code")]
        [Required]
        [MaxLength(6)]
        public string BinaryCode { get; set; } = string.Empty; // e.g. "111111"

        [Column("name_vn")]
        [Required]
        [MaxLength(100)]
        public string NameVn { get; set; } = string.Empty;

        [Column("name_han")]
        [MaxLength(50)]
        public string? NameHan { get; set; }

        [Column("name_en")]
        [MaxLength(100)]
        public string? NameEn { get; set; }

        [Column("upper_trigram")]
        [MaxLength(20)]
        public string UpperTrigram { get; set; } = string.Empty;

        [Column("lower_trigram")]
        [MaxLength(20)]
        public string LowerTrigram { get; set; } = string.Empty;

        [Column("judgment_thoan")]
        public string JudgmentThoan { get; set; } = string.Empty;

        [Column("image_tuong")]
        public string? ImageTuong { get; set; }

        [Column("general_meaning")]
        public string GeneralMeaning { get; set; } = string.Empty;

        [Column("line_meanings", TypeName = "jsonb")]
        public string? LineMeanings { get; set; } // JSON of 6 lines

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    [Table("tarot_cards")]
    public class TarotCard
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("card_key")]
        [Required]
        [MaxLength(50)]
        public string CardKey { get; set; } = string.Empty;

        [Column("name_vn")]
        [Required]
        [MaxLength(100)]
        public string NameVn { get; set; } = string.Empty;

        [Column("name_en")]
        [MaxLength(100)]
        public string? NameEn { get; set; }

        [Column("group")]
        [MaxLength(50)]
        public string Group { get; set; } = "Major"; // Major, Wands, Cups, Swords, Pentacles

        [Column("card_number")]
        public int CardNumber { get; set; }

        [Column("image_url")]
        [MaxLength(500)]
        public string ImageUrl { get; set; } = string.Empty;

        [Column("general_meaning")]
        public string GeneralMeaning { get; set; } = string.Empty;

        [Column("upright_meaning", TypeName = "jsonb")]
        public string? UprightMeaning { get; set; }

        [Column("reversed_meaning", TypeName = "jsonb")]
        public string? ReversedMeaning { get; set; }

        [Column("topics", TypeName = "jsonb")]
        public string? Topics { get; set; }
    }

    [Table("ai_reading_sessions")]
    public class AiReadingSession
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }

        [Column("user_id")]
        public long? UserId { get; set; }

        [Column("session_type")]
        [Required]
        [MaxLength(50)]
        public string SessionType { get; set; } = "iching"; // iching, tarot, tu_vi, numerology

        [Column("question")]
        [MaxLength(1000)]
        public string? Question { get; set; }

        [Column("input_data", TypeName = "jsonb")]
        public string? InputData { get; set; }

        [Column("ai_response")]
        public string? AiResponse { get; set; }

        [Column("ai_model")]
        [MaxLength(50)]
        public string AiModel { get; set; } = "gemini-2.0-flash";

        [Column("cost_tokens")]
        public int CostTokens { get; set; } = 0;

        [Column("rating")]
        public int? Rating { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("UserId")]
        public virtual User? User { get; set; }
    }
}
