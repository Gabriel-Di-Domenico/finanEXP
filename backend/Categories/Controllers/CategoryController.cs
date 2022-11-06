using AutoMapper;
using backend.Authenticate.Services;
using backend.Categories.Dtos;
using backend.Categories.Models;
using backend.Categories.Services;
using backend.Messages;
using backend.Shared.Classes;
using backend.Shared.Dtos;
using backend.Shared.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Categories.Controllers
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
    public ActionResult<ReturnDto> Create([FromBody] CategoryCreateDto category)
    {
      var categoryModel = _mapper.Map<Category>(category);

      var Bearertoken = Request.Headers["Authorization"];
      Guid userId = Guid.Parse(TokenService.DeserializeToken(Bearertoken));

      categoryModel.UserId = userId;

      var result = new ReturnDto();

      var createCategoryResult = _categoriesService.CreateCategory(categoryModel);
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
    public ActionResult<ReturnDto> GetAll([FromQuery] GetAllFilter filter)
    {
      var Bearertoken = Request.Headers["Authorization"];
      Guid userId = Guid.Parse(TokenService.DeserializeToken(Bearertoken));

      var getAllcategoriesResponse = _categoriesService.GetAllCategories(userId, filter);
      var result = new ReturnDto<List<CategoryReadDto>>();

      if (getAllcategoriesResponse.Status == ResponseStatus.Ok)
      {
        result.Message = new Message
        {
          error = false,
          message = "Sucesso ao adiquirir lista de categorias"
        };

        var categoriesModel = _mapper.Map<List<CategoryReadDto>>(getAllcategoriesResponse.Content);
        result.Content = categoriesModel;

        return Ok(result);
      }
      throw new Exception("Error GetAll Categories");
    }
    [HttpGet("{id}")]
    [Authorize]
    public ActionResult<ReturnDto> GetById([FromRoute] Guid Id)
    {
      var Bearertoken = Request.Headers["Authorization"];
      Guid userId = Guid.Parse(TokenService.DeserializeToken(Bearertoken));

      var getCategoryByIdResult = _categoriesService.GetCategoryById(Id, userId);

      var result = new ReturnDto<CategoryReadDto>();

      if (getCategoryByIdResult.Status == ResponseStatus.Ok)
      {
        var customerModel = _mapper.Map<CategoryReadDto>(getCategoryByIdResult.Content);

        result.Message = new Message
        {
          error = false,
          message = "Sucesso ao adiquirir categoria"
        };

        result.Content = customerModel;

        return Ok(result);
      }
      throw new Exception("Error Get Category By Id");

    }

    [HttpPut("{id}")]
    [Authorize]
    public ActionResult<ReturnDto> Update(
      [FromRoute] Guid id,
      [FromBody] CategoryCreateDto newCategory,
      [FromQuery] UpdateFilter filter)
    {
      var Bearertoken = Request.Headers["Authorization"];
      Guid userId = Guid.Parse(TokenService.DeserializeToken(Bearertoken));

      if (filter.ToArchive != null)
      {
        newCategory.IsArchived = filter.ToArchive;
      }
      var updateCategoryResult = _categoriesService.UpdateCategory(id, userId, newCategory);

      var result = new ReturnDto();
      if (updateCategoryResult == ResponseStatus.Ok)
      {
        result.Message = new Message
        {
          error = false,
          message = "Categoria alterada com sucesso"
        };

        return Ok(result);
      }
      throw new Exception("Error Update Category");
    }
    [HttpDelete("{id}")]
    [Authorize]
    public ActionResult<ReturnDto> Delete([FromRoute] Guid id)
    {
      var Bearertoken = Request.Headers["Authorization"];
      Guid userId = Guid.Parse(TokenService.DeserializeToken(Bearertoken));

      var deleteCategoryResult = _categoriesService.DeleteCategory(id, userId);

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
