using Microsoft.AspNetCore.Mvc;
using System;

namespace Customer.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly ILogger<CustomerController> _logger;

        public CustomerController(ILogger<CustomerController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetAllCustomer")]
        public OkResult Get()
        {
            return Ok();
        }
    }
}
