using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using KhoaHocTamLinh.Api.Services;

namespace KhoaHocTamLinh.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EsotericController : ControllerBase
    {
        private readonly IEsotericService _esotericService;

        public EsotericController(IEsotericService esotericService)
        {
            _esotericService = esotericService;
        }

        [HttpPost("iching/cast")]
        public async Task<IActionResult> CastIChing()
        {
            var result = await _esotericService.CastIChingCoinsAsync();
            return Ok(new
            {
                success = true,
                message = "Gieo quẻ Kinh Dịch thành công!",
                data = result
            });
        }

        public record NumerologyRequest(string BirthDate, string FullName);

        [HttpPost("numerology/calculate")]
        public IActionResult CalculateNumerology([FromBody] NumerologyRequest req)
        {
            if (!DateOnly.TryParse(req.BirthDate, out var birthDate))
                return BadRequest(new { success = false, message = "Định dạng ngày sinh không hợp lệ (YYYY-MM-DD)." });

            var result = _esotericService.CalculatePythagoras(birthDate, req.FullName);
            return Ok(new
            {
                success = true,
                message = "Tính toán Thần số học thành công!",
                data = result
            });
        }
    }
}
