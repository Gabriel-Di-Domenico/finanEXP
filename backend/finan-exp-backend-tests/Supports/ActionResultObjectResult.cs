using Microsoft.AspNetCore.Mvc;

namespace finan_exp_backend_tests.Supports
{
  public class ActionResultObjectResult<ValueType> : ActionResult
  {
    public int StatusCode { get; set; }
    public ValueType Value { get; set; }
  }
}
