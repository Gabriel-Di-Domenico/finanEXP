using Users.Models;

namespace finan_exp_backend_tests.Supports
{
  public static class TestUtils
  {
    public static string[] MockValidEmails = { "email@teste.com", "fin@teste.com", "exp@teste.com", "teste@teste.com" };
    public static string[] MockStrings = { "Fulano", "Siclano", "Beltrano", "Simiriano", "Sacolano", "Sifano" };
    public static string[] MockValidPassword = { "aB@%3nbx", "nb2x@%aBa", "nBaX%@#b23", "Na1@%1klwQ" };
    public static Guid[] MockIds =
      {
        new Guid("0d64ab63-03e1-437b-bfb6-be7fce2f826d"),
        new Guid("dad3b96c-0443-43fb-8fb0-b7c6bf92f323"),
        new Guid("55f67939-cf55-417c-8148-cb38fd31ecab"),
        new Guid("c56dcdd2-b77f-4f05-a032-88dfc88f909c"),
        new Guid("e010ea40-79bf-4acb-8fc2-1713389569b3"),
        new Guid("d2610b91-3b04-4082-abbd-3b6971ba2a86")
      };
    public static string[] MockJwts = {
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIzNzQzYzlmYi0zOGQ4LTQ5ZmEtYjAzMC0zMzU2ZDM3NmQwZGEiLCJuYmYiOjE2NzI1MzA1OTYsImV4cCI6MTY3MzEzNTM5NiwiaWF0IjoxNjcyNTMwNTk2fQ.Px3O4Ns0N7wYYvy4bsWvyUJnvc4_SaDibg0QFRDxQWU",
      "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY3MjUxNDg5NywiaWF0IjoxNjcyNTE0ODk3fQ.w_hrznvMsAXW8Mx282LtI4Y5TJOxH1GcEA1GkQoSLQg",
    };
    public static User[] MockUsers =
    {
      new User
      {
        email = MockValidEmails[0],
        ID = MockIds[0],
        name = MockStrings[0],
        password = MockValidPassword[0]
      },
      new User
      {
        email = MockValidEmails[1],
        ID = MockIds[1],
        name = MockStrings[1],
        password = MockValidPassword[1]
      },
      new User
      {
        email = MockValidEmails[2],
        ID = MockIds[2],
        name = MockStrings[2],
        password = MockValidPassword[2]
      },
      new User
      {
        email = MockValidEmails[3],
        ID = MockIds[3],
        name = MockStrings[3],
        password = MockValidPassword[3]
      },
    };
  }
}
