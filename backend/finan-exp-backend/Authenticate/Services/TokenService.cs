using backend;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Users.Models;

namespace Authenticate.Services
{
  public class TokenService
  {
    public static string GenerateToken(User user)
    {
      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes(Settings.Secret);
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new Claim[]
        {
          new Claim(ClaimTypes.NameIdentifier,user.ID.ToString()),

        }),
        Expires = DateTime.UtcNow.AddDays(7),
        SigningCredentials = new SigningCredentials(
          new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      };

      var token = tokenHandler.CreateToken(tokenDescriptor);

      return tokenHandler.WriteToken(token);
    }
    public static string DeserializeToken(string token)
    {
      if (token != null)
      {
        token = token.Replace("Bearer", "");
        token = token.Trim();

        var handler = new JwtSecurityTokenHandler();
        JwtSecurityToken decodedToken = handler.ReadJwtToken(token);

        var claims = decodedToken.Claims;
        ;
        string userID = "";

        foreach (var claim in claims)
        {

          if (claim.Type == "nameid")
          {
            userID = claim.Value;
          }
        }
        return userID;
      }
      else
      {
        return null;
      }

    }
  }
}
