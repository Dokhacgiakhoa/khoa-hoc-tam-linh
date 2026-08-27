using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using KhoaHocTamLinh.Api.Data;
using KhoaHocTamLinh.Api.Models;

namespace KhoaHocTamLinh.Api.Services
{
    public interface IEsotericService
    {
        Task<IChingCastResult> CastIChingCoinsAsync();
        NumerologyResult CalculatePythagoras(DateOnly birthDate, string fullName);
    }

    public class IChingCastResult
    {
        public List<int> TossValues { get; set; } = new();
        public List<int> LinesPrimary { get; set; } = new(); // 1=Dương, 0=Âm
        public List<int> MovingLines { get; set; } = new();
        public string BinaryPrimary { get; set; } = string.Empty;
        public string BinaryTransformed { get; set; } = string.Empty;
        public IChingHexagram? PrimaryHexagram { get; set; }
        public IChingHexagram? TransformedHexagram { get; set; }
    }

    public class NumerologyResult
    {
        public int LifePathNumber { get; set; }
        public Dictionary<int, int> BirthMatrix3x3 { get; set; } = new();
        public List<int> FourPinnacles { get; set; } = new();
        public string LifePathMeaning { get; set; } = string.Empty;
    }

    public class EsotericService : IEsotericService
    {
        private readonly AppDbContext _context;
        private readonly Random _random = new();

        public EsotericService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IChingCastResult> CastIChingCoinsAsync()
        {
            var tosses = new List<int>();
            var primaryLines = new List<int>();
            var transformedLines = new List<int>();
            var movingLines = new List<int>();

            // Gieo 6 lần (từ hào 1 dưới cùng lên hào 6)
            for (int i = 1; i <= 6; i++)
            {
                int coin1 = _random.Next(2, 4); // 2=Ngửa, 3=Sấp
                int coin2 = _random.Next(2, 4);
                int coin3 = _random.Next(2, 4);
                int sum = coin1 + coin2 + coin3;
                tosses.Add(sum);

                switch (sum)
                {
                    case 6: // Lão Âm (Âm Động -> Dương Biến)
                        primaryLines.Add(0);
                        transformedLines.Add(1);
                        movingLines.Add(i);
                        break;
                    case 7: // Thiếu Dương (Dương Tĩnh)
                        primaryLines.Add(1);
                        transformedLines.Add(1);
                        break;
                    case 8: // Thiếu Âm (Âm Tĩnh)
                        primaryLines.Add(0);
                        transformedLines.Add(0);
                        break;
                    case 9: // Lão Dương (Dương Động -> Âm Biến)
                        primaryLines.Add(1);
                        transformedLines.Add(0);
                        movingLines.Add(i);
                        break;
                }
            }

            string binPrimary = string.Join("", primaryLines);
            string binTransformed = string.Join("", transformedLines);

            var hexPrimary = await _context.IChingHexagrams.FirstOrDefaultAsync(h => h.BinaryCode == binPrimary);
            var hexTrans = await _context.IChingHexagrams.FirstOrDefaultAsync(h => h.BinaryCode == binTransformed);

            return new IChingCastResult
            {
                TossValues = tosses,
                LinesPrimary = primaryLines,
                MovingLines = movingLines,
                BinaryPrimary = binPrimary,
                BinaryTransformed = binTransformed,
                PrimaryHexagram = hexPrimary,
                TransformedHexagram = hexTrans
            };
        }

        public NumerologyResult CalculatePythagoras(DateOnly birthDate, string fullName)
        {
            int day = birthDate.Day;
            int month = birthDate.Month;
            int year = birthDate.Year;

            // Số chủ đạo (Life Path)
            int sumDigits(int n)
            {
                while (n > 9 && n != 11 && n != 22 && n != 33)
                {
                    n = n.ToString().Sum(c => c - '0');
                }
                return n;
            }

            int rDay = sumDigits(day);
            int rMonth = sumDigits(month);
            int rYear = sumDigits(year);
            int lifePath = sumDigits(rDay + rMonth + rYear);

            // Ma trận ngày sinh 3x3
            var matrix = new Dictionary<int, int>();
            for (int i = 1; i <= 9; i++) matrix[i] = 0;

            string dateStr = $"{day:D2}{month:D2}{year}";
            foreach (char c in dateStr)
            {
                int digit = c - '0';
                if (digit >= 1 && digit <= 9) matrix[digit]++;
            }

            // 4 Đỉnh cao cuộc đời
            int p1 = sumDigits(rMonth + rDay);
            int p2 = sumDigits(rDay + rYear);
            int p3 = sumDigits(p1 + p2);
            int p4 = sumDigits(rMonth + rYear);

            return new NumerologyResult
            {
                LifePathNumber = lifePath,
                BirthMatrix3x3 = matrix,
                FourPinnacles = new List<int> { p1, p2, p3, p4 },
                LifePathMeaning = $"Con số chủ đạo {lifePath}: Khai phá sứ mệnh và tiềm năng linh hồn."
            };
        }
    }
}
