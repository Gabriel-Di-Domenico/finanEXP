
using Authenticate.Dtos;
using Authenticate.Services;
using finan_exp_backend_tests.Supports;
using FluentAssertions;
using Shared.Enums;
using Shared.Services;

namespace finan_exp_backend_tests.Authenticate.Services
{
  public class AuthUserServiceTests
  {
    [Fact(DisplayName = "Auth user with equal passwords")]
    public void AuthenticateUserWithEqualPasswords()
    {
      //Arrange
      var user = new UserAuthDto
      {
        Email = TestUtils.MockUsers[0].Email,
        Name = TestUtils.MockUsers[0].Name,
        Password = TestUtils.MockUsers[0].Password
      };

      var userFromDatabase = TestUtils.MockUsers[1];
      userFromDatabase.Password = Bcrypt.Encrypt(user.Password);

      var authUserService = new AuthUserService();

      //Act
      var result = authUserService.AuthUser(user, userFromDatabase);

      //Assert]
      result.Status.Should().Be(ResponseStatus.Ok);
      result.Content.Should().NotBeNull();
    }

    [Fact(DisplayName = "Auth user with different passwords")]
    public void AuthenticateUserWithDifferentPasswords()
    {
      //Arrange
      var user = new UserAuthDto
      {
        Email = TestUtils.MockUsers[0].Email,
        Name = TestUtils.MockUsers[0].Name,
        Password = TestUtils.MockUsers[0].Password
      };

      var userFromDatabase = TestUtils.MockUsers[1];
      userFromDatabase.Password = Bcrypt.Encrypt(TestUtils.MockValidPassword[1]);

      var authUserService = new AuthUserService();

      //Act
      var result = authUserService.AuthUser(user, userFromDatabase);

      //Assert
      result.Status.Should().Be(ResponseStatus.Unauthorized);
      result.Content.Should().BeNull();
    }
  }
}
