
using Authenticate.Controllers;
using Authenticate.Dtos;
using Authenticate.Services;
using finan_exp_backend_tests.Supports;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Shared.Dtos;
using Shared.Enums;
using Shared.Messages;
using Users.Services;

namespace finan_exp_backend_tests.Authenticate.Controllers
{
  public class AuthControllerTests
  {
    [Fact(DisplayName = "Auth user with successfully")]
    public async Task AuthenticateUserWithSuccessfully()
    {
      //Arrange
      var mockUserDataBaseService = Substitute.For<IUserDatabaseService>();
    
      var mockAuthUserService = Substitute.For<IAuthUserService>();
      var mockAuthUser = new UserAuthDto
      {
        Email = TestUtils.MockValidEmails[0],
        Name = TestUtils.MockStrings[0],
        Password = TestUtils.MockStrings[0]
      };
      mockUserDataBaseService.GetUserByEmail(TestUtils.MockValidEmails[0]).Returns(TestUtils.MockUsers[0]);
      var responseStatus = new ResponseStatus<string>
      {
        Content = TestUtils.MockJwts[0],
        Status = ResponseStatus.Ok
      };

      mockAuthUserService.AuthUser(mockAuthUser, TestUtils.MockUsers[0]).Returns(responseStatus);

      var authController = new AuthController(mockUserDataBaseService, mockAuthUserService);

      
      //Act
      var result = await authController.AuthenticateAsync(mockAuthUser);

      //Assert
      var output = result.Result as OkObjectResult;
      var value = output.Value as ReturnDto<string>;

      output.StatusCode.Should().Be(200);
      value.Message.Should().BeEquivalentTo(new Message {
        error = false,
        message = "Usuário autenticado"
      });
      value.Content.Should().Be(TestUtils.MockJwts[0]);

    }

    [Fact(DisplayName = "Auth user unauthorized")]
    public async Task AuthenticateUserUnauthorized()
    {
      //Arrange
      var mockUserDataBaseService = Substitute.For<IUserDatabaseService>();

      var mockAuthUserService = Substitute.For<IAuthUserService>();
      var mockAuthUser = new UserAuthDto
      {
        Email = TestUtils.MockValidEmails[0],
        Name = TestUtils.MockStrings[0],
        Password = TestUtils.MockStrings[0]
      };
      mockUserDataBaseService.GetUserByEmail(TestUtils.MockValidEmails[0]).Returns(TestUtils.MockUsers[0]);
      var responseStatus = new ResponseStatus<string>
      {
        Content = null,
        Status = ResponseStatus.Unauthorized
      };

      mockAuthUserService.AuthUser(mockAuthUser, TestUtils.MockUsers[0]).Returns(responseStatus);

      var authController = new AuthController(mockUserDataBaseService, mockAuthUserService);


      //Act
      var result = await authController.AuthenticateAsync(mockAuthUser);

      //Assert
      var output = result.Result as UnauthorizedObjectResult;

      var value = output.Value as ReturnDto<string>;

      output.StatusCode.Should().Be(401);
      value.Message.Should().BeEquivalentTo(new Message
      {
        error = true,
        message = "Usuário não autorizado"
      });
      value.Content.Should().BeNull();

    }
    [Fact(DisplayName = "Auth user not registered")]
    public async Task AuthenticateUserNotRegistered()
    {
      //Arrange
      var mockUserDataBaseService = Substitute.For<IUserDatabaseService>();

      var mockAuthUserService = Substitute.For<IAuthUserService>();
      var mockAuthUser = new UserAuthDto
      {
        Email = TestUtils.MockValidEmails[0],
        Name = TestUtils.MockStrings[0],
        Password = TestUtils.MockStrings[0]
      };

      var authController = new AuthController(mockUserDataBaseService, mockAuthUserService);


      //Act
      var result = await authController.AuthenticateAsync(mockAuthUser);

      //Assert
      var output = result.Result as UnauthorizedObjectResult;

      var value = output.Value as ReturnDto<string>;

      output.StatusCode.Should().Be(401);
      value.Message.Should().BeEquivalentTo(new Message
      {
        error = true,
        message = "Usuário não Registrado"
      });
      value.Content.Should().BeNull();

    }
  }
}
