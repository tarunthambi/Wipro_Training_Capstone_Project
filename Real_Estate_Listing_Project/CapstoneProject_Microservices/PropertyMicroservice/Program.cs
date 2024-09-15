using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PropertyMicroservice.Data;
using PropertyMicroservice.Models;

namespace PropertyMicroservice
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();

            // Swagger/OpenAPI
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Add MongoDB context and repository
            builder.Services.AddSingleton<PropertyContext>(); // MongoDB context
            builder.Services.AddScoped<IPropertyRepository, PropertyRepository>(); // Repository

            // Add CORS policy
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(corsBuilder =>
                {
                    corsBuilder.AllowAnyOrigin()
                               .AllowAnyMethod()
                               .AllowAnyHeader();
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage(); // Detailed error page in development
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            else
            {
                // Production exception handling
                app.UseExceptionHandler("/Error");
                app.UseHsts(); // Use HTTP Strict Transport Security
            }

            // Serve static files (e.g., images, CSS, etc.)
            app.UseStaticFiles();

            app.UseCors(); // Use CORS policy

            app.UseAuthorization(); // Ensure authorization is in place if required

            app.MapControllers(); // Map API controllers

            app.Run();
        }
    }
}
