using backend.dtos;
using backend.models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.services
{
  public class TokenService
  {
    public static string GenerateToken(UserModel user)
    {
      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes(Settings.Secret);
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new Claim[]
        {
          new Claim(ClaimTypes.Name,user.name.ToString()),
          new Claim(ClaimTypes.Email,user.email.ToString()),
        }),
        Expires = DateTime.UtcNow.AddMinutes(10),
        SigningCredentials = new SigningCredentials(
          new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      };

      var token = tokenHandler.CreateToken(tokenDescriptor);

      return tokenHandler.WriteToken(token);
    }
    public static UserOutput DeserializeToken(string token)
    {
      if (token != null)
      {
        token = token.Replace("Bearer", "");
        token = token.Trim();

        var handler = new JwtSecurityTokenHandler();
        JwtSecurityToken decodedToken = handler.ReadJwtToken(token);

        var claims = decodedToken.Claims;

        UserOutput user = new UserOutput();

        foreach (var claim in claims)
        {
          if (claim.Type == "email")
          {
            user.email = claim.Value;
          }
          else if (claim.Type == "unique_name")
          {
            user.name = claim.Value;
          }
        }
        return user;
      }
      else
      {
        return null;
      }

    }
  }
}
