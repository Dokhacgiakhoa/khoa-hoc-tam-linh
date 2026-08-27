using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using KhoaHocTamLinh.Api.Data;
using KhoaHocTamLinh.Api.Models;

namespace KhoaHocTamLinh.Api.Services
{
    public interface IAuthService
    {
        Task<(string Token, User User)> RegisterAsync(string name, string email, string password);
        Task<(string Token, User User)> LoginAsync(string email, string password);
        string GenerateJwtToken(User user);
    }

    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public AuthService(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public async Task<(string Token, User User)> RegisterAsync(string name, string email, string password)
        {
            if (await _context.Users.AnyAsync(u => u.Email == email.ToLower()))
                throw new InvalidOperationException("Email này đã được sử dụng.");

            var user = new User
            {
                Name = name,
                Email = email.ToLower(),
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
                Balance = 100, // Tặng 100 Linh Tệ tân thủ
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var token = GenerateJwtToken(user);
            return (token, user);
        }

        public async Task<(string Token, User User)> LoginAsync(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email.ToLower());
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
                throw new UnauthorizedAccessException("Email hoặc mật khẩu không chính xác.");

            var token = GenerateJwtToken(user);
            return (token, user);
        }

        public string GenerateJwtToken(User user)
        {
            var jwtKey = _config["Jwt:SecretKey"] ?? "KhoaHocTamLinh_Super_Secret_Key_2026_Enterprise_Edition";
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("uuid", user.Uuid),
                new Claim("name", user.Name),
                new Claim("role", user.Role)
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"] ?? "KhoaHocTamLinh",
                audience: _config["Jwt:Audience"] ?? "KhoaHocTamLinhClient",
                claims: claims,
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
