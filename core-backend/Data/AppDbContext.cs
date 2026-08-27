using Microsoft.EntityFrameworkCore;
using KhoaHocTamLinh.Api.Models;

namespace KhoaHocTamLinh.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users => Set<User>();
        public DbSet<Transaction> Transactions => Set<Transaction>();
        public DbSet<IChingHexagram> IChingHexagrams => Set<IChingHexagram>();
        public DbSet<TarotCard> TarotCards => Set<TarotCard>();
        public DbSet<AiReadingSession> AiReadingSessions => Set<AiReadingSession>();
        public DbSet<Category> Categories => Set<Category>();
        public DbSet<Product> Products => Set<Product>();
        public DbSet<Order> Orders => Set<Order>();
        public DbSet<OrderItem> OrderItems => Set<OrderItem>();
        public DbSet<Course> Courses => Set<Course>();
        public DbSet<Certificate> Certificates => Set<Certificate>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Bật extension pgvector cho Vector AI Search nếu chạy trên PostgreSQL
            modelBuilder.HasPostgresExtension("vector");

            // User Indexing
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Uuid)
                .IsUnique();

            // Transaction Sổ cái Indexing & Constraints
            modelBuilder.Entity<Transaction>()
                .HasIndex(t => t.TransactionCode)
                .IsUnique();

            modelBuilder.Entity<Transaction>()
                .HasIndex(t => new { t.UserId, t.CreatedAt });

            // Decimal Precision cho Ví & Tài Chính
            modelBuilder.Entity<User>()
                .Property(u => u.Balance)
                .HasPrecision(18, 2);

            modelBuilder.Entity<User>()
                .Property(u => u.FrozenBalance)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Transaction>()
                .Property(t => t.Amount)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Transaction>()
                .Property(t => t.BalanceBefore)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Transaction>()
                .Property(t => t.BalanceAfter)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Order>()
                .Property(o => o.TotalAmount)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Order>()
                .Property(o => o.FinalAmount)
                .HasPrecision(18, 2);

            // IChing Indexing
            modelBuilder.Entity<IChingHexagram>()
                .HasIndex(h => h.BinaryCode)
                .IsUnique();

            modelBuilder.Entity<IChingHexagram>()
                .HasIndex(h => h.HexagramNumber);
        }
    }
}
