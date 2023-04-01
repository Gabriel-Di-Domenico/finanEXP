using Authenticate.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Dtos;
using Shared.Enums;
using Shared.Messages;
using Users.PerfilPhotos.Dtos;
using Users.PerfilPhotos.Services;

namespace Users.PerfilPhotos.Controllers
{
  [Route("/perfilPhotos")]
  [ApiController]
  public class PerfilPhotoController : ControllerBase
  {
    private readonly IPerfilPhotoService _perfilPhotoService;
    private readonly IMapper _mapper;
    public PerfilPhotoController(IPerfilPhotoService perfilPhotoService, IMapper mapper)
    {
      _perfilPhotoService = perfilPhotoService;
      _mapper = mapper;
    }

    public IMapper Mapper { get; }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<ReturnDto>> CreatePerfilPhoto(PerfilPhotoInput newPerfilPhoto)
    {
      var createPerfilPhotoResult = await _perfilPhotoService.CreatePerfilPhoto(newPerfilPhoto);
      var result = new ReturnDto();
      if (createPerfilPhotoResult == ResponseStatus.Ok)
      {
        result.Message = new Message
        {
          error = false,
          message = "Foto de perfil salva com sucesso"
        };
        return Ok(result);
      }
      throw new Exception("Error Create Perfil Photo");
    }

    [HttpPut]
    [Authorize]
    public async Task<ActionResult<ReturnDto>> UpdatePerfilPhoto(
      [FromBody] PerfilPhotoInput newPerfilPhoto)
    {
      var updatePerfilPhotoResponse = await _perfilPhotoService.UpdatePerfilPhoto(newPerfilPhoto);
      var result = new ReturnDto();
      if (updatePerfilPhotoResponse == ResponseStatus.Ok)
      {
        result.Message = new Message
        {
          error = false,
          message = "Foto de perfil atualizada com sucesso"
        };
        return Ok(result);
      }
      throw new Exception("Update Perfil Photo Error");
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<ReturnDto<PerfilPhotoOutput>>> GetPerfilPhoto()
    {
      var perfilPhotoResponse = await _perfilPhotoService.GetPerfilPhoto();

      var result = new ReturnDto<PerfilPhotoOutput>();

      if (perfilPhotoResponse.Status == ResponseStatus.Ok)
      {
        var perfilPhotoReturn = _mapper.Map<PerfilPhotoOutput>(perfilPhotoResponse.Content);

        result.Message = new Message
        {
          error = false,
          message = "Sucesso ao adquirir a foto de perfil"
        };
        result.Content = perfilPhotoReturn;

        return Ok(result);
      }
      throw new Exception("Error Get PerfilPhoto");
    }


    [HttpDelete]
    [Authorize]
    public async Task<ActionResult<ReturnDto>> DeletePerfilPhoto()
    {
      var deletePerfilPhotoResponse = await _perfilPhotoService.DeletePerfilPhoto();
      var result = new ReturnDto();
      if (deletePerfilPhotoResponse == ResponseStatus.Ok)
      {
        result.Message = new Message
        {
          error = false,
          message = "Foto removida com sucesso"
        };
        return Ok(result);
      }
      throw new Exception("Error Delete Perfil Photo");
    }
  }
}
