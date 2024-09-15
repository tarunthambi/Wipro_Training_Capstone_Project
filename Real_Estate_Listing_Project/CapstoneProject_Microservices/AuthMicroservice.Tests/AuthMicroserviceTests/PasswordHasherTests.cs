using NUnit.Framework;
using AuthMicroservice.Helper;

namespace AllMicroservice_Tests.AuthMicroserviceTests
{
    [TestFixture]
    public class PasswordHasherTests
    {
        // 9. Test password hashing and verification
        [Test]
        public void HashPassword_And_VerifyPassword_Matches()
        {
            string password = "Password1!";
            string hashedPassword = PasswordHasher.HashPassword(password);

            bool isMatch = PasswordHasher.VerifyPassword(password, hashedPassword);

            Assert.IsTrue(isMatch);
        }

        // 10. Test password verification with incorrect password
        [Test]
        public void VerifyPassword_WithIncorrectPassword_ReturnsFalse()
        {
            string password = "Password1!";
            string wrongPassword = "WrongPassword";
            string hashedPassword = PasswordHasher.HashPassword(password);

            bool isMatch = PasswordHasher.VerifyPassword(wrongPassword, hashedPassword);

            Assert.IsFalse(isMatch);
        }
    }
}
