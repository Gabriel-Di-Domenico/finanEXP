using Authenticate.Services;
using backend;
using Categories.Services;
using Classes;
using Contexts;
using Customers.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Shared.Classes;
using Shared.Interceptors;
using Shared.Interfaces;
using System.Text;
using Transactions.Services;
using Users.PerfilPhotos.Services;
using Users.Services;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers();

var key = Encoding.ASCII.GetBytes(Settings.Secret);

builder.Services.AddAuthentication(x =>
{
  x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
  x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
  x.RequireHttpsMetadata = false;
  x.SaveToken = true;
  x.TokenValidationParameters = new TokenValidationParameters
  {
    ValidateIssuerSigningKey = true,
    IssuerSigningKey = new SymmetricSecurityKey(key),
    ValidateIssuer = false,
    ValidateAudience = false,
    ClockSkew = TimeSpan.Zero,
  };
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddScoped<IUserDatabaseService, UserDatabaseService>();
builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<IAuthUserService, AuthUserService>();
builder.Services.AddScoped<IPerfilPhotoService, PerfilPhotoService>();
builder.Services.AddScoped<ICategoriesService, CategoriesService>();
builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.Services.AddScoped<ICustomerBalanceService, CustomerBalanceService>();
builder.Services.AddScoped<IValidateCustomerService, ValidateCustomerService>();
builder.Services.AddScoped<IValidationCategoryService, ValidationCategoryService>();
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddScoped<CurrentUserProvider>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddSingleton<QueryInterceptor>();
builder.Services.AddSingleton<AddEntityInterceptor>();

builder.Services.AddCors(options =>
{
  options.AddPolicy("corsPolicy", build =>
  {
    build.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
  });

});
builder.Services.AddDbContext<FinEXPDatabaseContext>((provider,options) =>

options.UseNpgsql($"Server={Settings.DatabaseHost};Port={Settings.DatabasePort};Pooling=true;Database={Settings.DatabaseName};User Id={Settings.DatabaseUser};Password={Settings.DatabasePassword};")
  .AddInterceptors(provider.GetRequiredService<QueryInterceptor>())
  .AddInterceptors(provider.GetRequiredService<AddEntityInterceptor>())
);
var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseCors("corsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
