using System.ComponentModel.DataAnnotations;

namespace AuthMicroservice.DTO
{
    public class UpdateUserDto
    {
        public string UserName { get; set; }

        [Phone]
        public string PhoneNumber { get; set; }
    }
}