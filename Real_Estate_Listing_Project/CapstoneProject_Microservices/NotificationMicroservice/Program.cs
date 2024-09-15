using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using NotificationMicroservice.Models;
using NotificationMicroservice.Services;

namespace NotificationMicroservice
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container
            builder.Services.AddControllers();

            // Added CORS with a default policy allowing any origin, method, and header
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });

            // Configure Swagger/OpenAPI
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Configure MailSettings
            builder.Services.Configure<MailSetting>(builder.Configuration.GetSection("MailSetting"));

            // Register ApiMailService as a transient service
            builder.Services.AddTransient<ApiMailService>();

            // Configure HttpClient with Authorization header
            builder.Services.AddHttpClient("MailTrapApiClient", (services, client) =>
            {
                var mailSetting = services.GetRequiredService<IOptions<MailSetting>>().Value;
                client.BaseAddress = new Uri(mailSetting.ApiBaseUrl);
                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", mailSetting.ApiToken);
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            // Apply CORS middleware
            app.UseCors();

            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}
