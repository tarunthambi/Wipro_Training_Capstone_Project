using NotificationMicroservice.Models;

namespace NotificationMicroservice.Services
{
    public interface IApiMailService
    {
        Task<string> sendMailAsync(MailData mailData);
    }
}