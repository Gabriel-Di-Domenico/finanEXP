
using Authenticate.Controllers;
using Authenticate.Dtos;
using Authenticate.Services;
using finan_exp_backend_tests.Supports;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Users.Services;

namespace finan_exp_backend_tests.Authenticate.Controllers
{
  public class AuthControllerTests
  {
    [Fact(DisplayName = "Auth user with successfully")]
    public void AuthenticateUserWithSuccessfully()
    {
      //Arrange
      var mockUserDataBaseService = Substitute.For<IUserDatabaseService>();
    
      var mockAuthUserService = Substitute.For<AuthUserService>();

      var authController = new AuthController(mockUserDataBaseService, mockAuthUserService);

      var mockUser = new UserAuthDto
      {
        email = TestUtils.MockValidEmails[0],
        name = TestUtils.MockStrings[0],
        password = TestUtils.MockStrings[0]
      };
      //Act
      var result = authController.AuthenticateAsync(mockUser);

      //Assert
      var output = result.Result as OkResult;

      output.StatusCode.Should().Be(200);
     
    }
  }
}
