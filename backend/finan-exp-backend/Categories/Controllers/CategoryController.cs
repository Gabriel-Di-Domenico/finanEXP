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
    private readonly IMapper _mapper;

    public CategoryController(ICategoriesService categoriesService, IMapper mapper)
    {
      _categoriesService = categoriesService;
      _mapper = mapper;
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
    public async Task<ActionResult<ReturnDto>> GetAll([FromQuery] GetAllFilter? filter)
    {
      var getAllcategoriesResponse = await _categoriesService.GetAllCategories(filter);

      var result = new ReturnDto<List<CategoryOutput>>();

      if (getAllcategoriesResponse.Status == ResponseStatus.Ok)
      {
        result.Message = new Message
        {
          error = false,
          message = "Sucesso ao adiquirir lista de categorias"
        };

        var categoriesModel = _mapper.Map<List<CategoryOutput>>(getAllcategoriesResponse.Content);
        result.Content = categoriesModel;

        return Ok(result);
      }
      else if (getAllcategoriesResponse.Status == ResponseStatus.NotFound)
      {
        result.Message = new Message
        {
          error = true,
          message = "Nenhuma categoria foi encontrada"
        };

        result.Content = null;

        return NotFound(result);
      }
      throw new Exception("Error GetAll Categories");
    } 
    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<ReturnDto>> GetById([FromRoute] Guid Id)
    {
      var getCategoryByIdResult = await _categoriesService.GetCategoryById(Id);

      var result = new ReturnDto<CategoryOutput>();

      if (getCategoryByIdResult.Status == ResponseStatus.Ok)
      {
        var categoryModel = _mapper.Map<CategoryOutput>(getCategoryByIdResult.Content);

        result.Message = new Message
        {
          error = false,
          message = "Sucesso ao adquirir categoria"
        };

        result.Content = categoryModel;

        return Ok(result);
      }
      throw new Exception("Error Get Category By Id");

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
