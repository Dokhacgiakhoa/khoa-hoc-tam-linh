using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using KhoaHocTamLinh.Api.Data;
using KhoaHocTamLinh.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// 1. Cấu hình Database (PostgreSQL Cloud hoặc Local Fallback)
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? "Host=localhost;Port=5432;Database=khoa_hoc_tam_linh;Username=postgres;Password=postgres";

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(connectionString);
});

// 2. Dependency Injection Services
builder.Services.AddScoped<IWalletService, WalletService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IEsotericService, EsotericService>();

// 3. Cấu hình JWT Authentication
var jwtKey = builder.Configuration["Jwt:SecretKey"] ?? "KhoaHocTamLinh_Super_Secret_Key_2026_Enterprise_Edition";
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"] ?? "KhoaHocTamLinh",
            ValidAudience = builder.Configuration["Jwt:Audience"] ?? "KhoaHocTamLinhClient",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

// 4. Cấu hình CORS (Cho phép Next.js Frontend)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();

// 5. Swagger OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || true)
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Khoa Học Tâm Linh Core API v1");
        c.RoutePrefix = "swagger";
    });
}

app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapGet("/", () => Results.Json(new
{
    name = "Khoa Học Tâm Linh Core API",
    version = "10.0.0",
    status = "running",
    engine = ".NET 10 Web API",
    swagger = "/swagger"
}));

app.Run();
