using Home.Dtos;
using Shared.Enums;

namespace Home.Services
{
  public interface IHomeService
  {
    public Task<ResponseStatus<HomeOutput>> Get();
  }
}
