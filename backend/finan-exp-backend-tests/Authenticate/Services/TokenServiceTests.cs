using Authenticate.Services;
using finan_exp_backend_tests.Supports;
using FluentAssertions;

namespace finan_exp_backend_tests.Authenticate.Services
{
  public class TokenServiceTests
  {
    [Fact(DisplayName = "Generate token with successfully")]
    public void GenerateTokenWithSuccessfully()
    {
      //Arrange
      var user = TestUtils.MockUsers[0];

      //Act
      var result = TokenService.GenerateToken(user);
      //Assert
      result.Should().NotBeNull();

    }

    [Fact(DisplayName = "Deserialize token with sucessfully")]
    public void DeserializeTokenWithSuccessfully()
    {
      //Arrange
      var user = TestUtils.MockUsers[0];

      var token = TokenService.GenerateToken(user);

      //Act
      var result = TokenService.DeserializeToken(token);
      //Assert
      result.Should().NotBeNull();
      result.Should().Be(user.Id.ToString());
    }
  }
}
