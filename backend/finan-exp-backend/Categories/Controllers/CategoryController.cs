using Authenticate.Services;
using AutoMapper;
using Categories.Dtos;
using Categories.Models;
using Categories.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Classes;
using Shared.Dtos;
using Shared.Enums;
using Shared.Messages;

namespace Categories.Controllers
{
  [Route("/Categories")]
  [ApiController]
  public class CategoryController : ControllerBase
  {
    private readonly ICategoriesService _categoriesService;
    public CategoryController(ICategoriesService categoriesService)
    {
      _categoriesService = categoriesService;
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<ReturnDto>> Create([FromBody] CategoryInput input)
    {
      var result = new ReturnDto();

      var createCategoryResult = await _categoriesService.CreateCategory(input);

      if (createCategoryResult == ResponseStatus.Ok)
      {
        result.Message = new Message
        {
          error = false,
          message = "Categoria criada com sucesso"
        };

        return Created("", result);
      }
      else if (createCategoryResult == ResponseStatus.AlreadyExists)
      {
        result.Message = new Message
        {
          error = true,
          message = "Nome da categoria já utilizado"
        };
        return BadRequest(result);
      }
      throw new Exception("Error create category");
    }
    [HttpGet]
    [Authorize]
    public async Task<ActionResult<ReturnDto<List<CategoryOutput>>>> GetAll([FromQuery] GetAllFilter? filter)
    {
      var getAllcategoriesResponse = await _categoriesService.GetAll(filter);

      var result = new ReturnDto<List<CategoryOutput>>();

      result.Message = new Message
      {
        error = false,
        message = "Sucesso ao adquirir lista de categorias"
      };

      result.Content = getAllcategoriesResponse.Content;

      return Ok(result);
      
    } 
    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<ReturnDto>> GetById([FromRoute] Guid Id)
    {
      var getCategoryByIdResult = await _categoriesService.GetById(Id);

      var result = new ReturnDto<CategoryOutput>();

      if (getCategoryByIdResult.Status == ResponseStatus.Ok)
      {
        result.Message = new Message
        {
          error = false,
          message = "Sucesso ao adquirir categoria"
        };

        result.Content = getCategoryByIdResult.Content;

        return Ok(result);
      }
      
      result.Message = new Message
      {
        error = true,
        message = "Categoria não encontrada"
      };

      result.Content = getCategoryByIdResult.Content;

      return NotFound(result);

    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<ActionResult<ReturnDto>> Update(
      [FromRoute] Guid id,
      [FromBody] CategoryInput input,
      [FromQuery] UpdateFilter filter)
    {
      if (filter.ToArchive != null)
      {
        input.IsArchived = filter.ToArchive;
      }
      var updateCategoryResult = await _categoriesService.UpdateCategory(id, input);

      var result = new ReturnDto();
      if (updateCategoryResult == ResponseStatus.Ok)
      {
        result.Message = new Message
        {
          error = false,
          message = "Categoria alterada com sucesso"
        };

        return Ok(result);
      } else if(updateCategoryResult == ResponseStatus.AlreadyExists)
      {
        result.Message = new Message
        {
          error = true,
          message = "Nome da categoria já utilizado"
        };
        return BadRequest(result);
      }
      throw new Exception("Error Update Category");
    }
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<ActionResult<ReturnDto>> Delete([FromRoute] Guid id)
    {
      var deleteCategoryResult = await _categoriesService.DeleteCategory(id);

      var result = new ReturnDto();

      if (deleteCategoryResult == ResponseStatus.Ok)
      {
        result.Message = new Message
        {
          error = false,
          message = "Categoria deletada com sucesso"
        };

        return Ok(result);
      }
      throw new Exception("Error Delete Category");
    }
  }
}
