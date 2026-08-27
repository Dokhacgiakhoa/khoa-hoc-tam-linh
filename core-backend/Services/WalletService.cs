using System;
using System.Data;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using KhoaHocTamLinh.Api.Data;
using KhoaHocTamLinh.Api.Models;

namespace KhoaHocTamLinh.Api.Services
{
    public interface IWalletService
    {
        Task<decimal> GetBalanceAsync(long userId);
        Task<Transaction> DepositAsync(long userId, decimal amount, string description, string? referenceId = null);
        Task<Transaction> DeductAsync(long userId, decimal amount, string description, string type = "purchase", string? referenceId = null);
    }

    public class WalletService : IWalletService
    {
        private readonly AppDbContext _context;

        public WalletService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<decimal> GetBalanceAsync(long userId)
        {
            var user = await _context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == userId);
            return user?.Balance ?? 0;
        }

        public async Task<Transaction> DepositAsync(long userId, decimal amount, string description, string? referenceId = null)
        {
            if (amount <= 0)
                throw new ArgumentException("Số tiền nạp phải lớn hơn 0.");

            // ACID Transaction với Serializable Level
            using var tx = await _context.Database.BeginTransactionAsync(IsolationLevel.Serializable);
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
                if (user == null)
                    throw new KeyNotFoundException("Người dùng không tồn tại.");

                decimal balanceBefore = user.Balance;
                user.Balance += amount;
                user.UpdatedAt = DateTime.UtcNow;

                var transaction = new Transaction
                {
                    TransactionCode = $"DEP_{DateTime.UtcNow:yyyyMMddHHmmss}_{Guid.NewGuid().ToString()[..8].ToUpper()}",
                    UserId = userId,
                    Type = "deposit",
                    Amount = amount,
                    BalanceBefore = balanceBefore,
                    BalanceAfter = user.Balance,
                    Description = description,
                    Status = "completed",
                    ReferenceId = referenceId,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Transactions.Add(transaction);
                await _context.SaveChangesAsync();
                await tx.CommitAsync();

                return transaction;
            }
            catch
            {
                await tx.RollbackAsync();
                throw;
            }
        }

        public async Task<Transaction> DeductAsync(long userId, decimal amount, string description, string type = "purchase", string? referenceId = null)
        {
            if (amount <= 0)
                throw new ArgumentException("Số tiền trừ phải lớn hơn 0.");

            using var tx = await _context.Database.BeginTransactionAsync(IsolationLevel.Serializable);
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
                if (user == null)
                    throw new KeyNotFoundException("Người dùng không tồn tại.");

                if (user.Balance < amount)
                    throw new InvalidOperationException($"Số dư không đủ. Bạn có {user.Balance:N0} 🔮, cần {amount:N0} 🔮.");

                decimal balanceBefore = user.Balance;
                user.Balance -= amount;
                user.UpdatedAt = DateTime.UtcNow;

                var transaction = new Transaction
                {
                    TransactionCode = $"PAY_{DateTime.UtcNow:yyyyMMddHHmmss}_{Guid.NewGuid().ToString()[..8].ToUpper()}",
                    UserId = userId,
                    Type = type,
                    Amount = amount,
                    BalanceBefore = balanceBefore,
                    BalanceAfter = user.Balance,
                    Description = description,
                    Status = "completed",
                    ReferenceId = referenceId,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Transactions.Add(transaction);
                await _context.SaveChangesAsync();
                await tx.CommitAsync();

                return transaction;
            }
            catch
            {
                await tx.RollbackAsync();
                throw;
            }
        }
    }
}
