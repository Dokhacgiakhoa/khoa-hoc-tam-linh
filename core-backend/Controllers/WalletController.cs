using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KhoaHocTamLinh.Api.Data;
using KhoaHocTamLinh.Api.Services;

namespace KhoaHocTamLinh.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WalletController : ControllerBase
    {
        private readonly IWalletService _walletService;
        private readonly AppDbContext _context;

        public WalletController(IWalletService walletService, AppDbContext context)
        {
            _walletService = walletService;
            _context = context;
        }

        public record DepositRequest(decimal Amount, string Description);

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetWallet()
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!long.TryParse(userIdStr, out long userId))
                return Unauthorized();

            var balance = await _walletService.GetBalanceAsync(userId);
            return Ok(new { success = true, data = new { balance } });
        }

        [Authorize]
        [HttpPost("deposit")]
        public async Task<IActionResult> Deposit([FromBody] DepositRequest req)
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!long.TryParse(userIdStr, out long userId))
                return Unauthorized();

            try
            {
                var tx = await _walletService.DepositAsync(userId, req.Amount, req.Description);
                return Ok(new
                {
                    success = true,
                    message = "Nạp Linh Tệ thành công!",
                    data = tx
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        [Authorize]
        [HttpGet("transactions")]
        public async Task<IActionResult> GetTransactions([FromQuery] int page = 1, [FromQuery] int pageSize = 15)
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!long.TryParse(userIdStr, out long userId))
                return Unauthorized();

            var query = _context.Transactions
                .AsNoTracking()
                .Where(t => t.UserId == userId)
                .OrderByDescending(t => t.CreatedAt);

            var total = await query.CountAsync();
            var items = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

            return Ok(new
            {
                success = true,
                data = items,
                meta = new { page, pageSize, total }
            });
        }
    }
}
