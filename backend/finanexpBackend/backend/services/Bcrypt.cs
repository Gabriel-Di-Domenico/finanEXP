using System.Security.Cryptography;
using System.Text;

namespace backend.services
{
  public class Bcrypt
  {
    public static string Encrypt(string password)
    {
      var md5 = MD5.Create();
      byte[] bytes = Encoding.ASCII.GetBytes(password);
      byte[] hash = md5.ComputeHash(bytes);

      StringBuilder stringBuilder = new StringBuilder();
      for (int i = 0; i < hash.Length; i++)
      {
        stringBuilder.Append(hash[i].ToString("x2"));
      }
      return stringBuilder.ToString();
    }
    public static bool Decrypt(string password, string dataBasePassword)
    {
      string encryptedPassword = Encrypt(password);
      if (encryptedPassword == dataBasePassword)
      {
        return true;
      }
      else
      {
        return false;
      }
    }
  }
}
