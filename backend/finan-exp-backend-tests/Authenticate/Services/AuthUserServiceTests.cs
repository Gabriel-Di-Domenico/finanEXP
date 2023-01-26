
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
        email = TestUtils.MockUsers[0].email,
        name = TestUtils.MockUsers[0].name,
        password = TestUtils.MockUsers[0].password
      };

      var userFromDatabase = TestUtils.MockUsers[1];
      userFromDatabase.password = Bcrypt.Encrypt(user.password);

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
        email = TestUtils.MockUsers[0].email,
        name = TestUtils.MockUsers[0].name,
        password = TestUtils.MockUsers[0].password
      };

      var userFromDatabase = TestUtils.MockUsers[1];
      userFromDatabase.password = Bcrypt.Encrypt(TestUtils.MockValidPassword[1]);

      var authUserService = new AuthUserService();

      //Act
      var result = authUserService.AuthUser(user, userFromDatabase);

      //Assert
      result.Status.Should().Be(ResponseStatus.Unauthorized);
      result.Content.Should().BeNull();
    }
  }
}
