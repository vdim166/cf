using Microsoft.AspNetCore.Mvc;
using CompanyFormBackend.Data;
using CompanyFormBackend.Models;

namespace CompanyFormBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionnaireController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private readonly string _uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

        public QuestionnaireController(ApplicationDbContext context)
        {
            _context = context;

            if (!Directory.Exists(_uploadDirectory))
            {
                Directory.CreateDirectory(_uploadDirectory);
            }
        }

        [HttpPost("ip")]
        public IActionResult IPPost(IPModel ipModel)
        {
            _context.IPModels.Add(ipModel);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost("ooo")]
        public IActionResult Post(OOOModel oooModel)
        {
            _context.OOOModels.Add(oooModel);
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet("autofill/{inn}")]
        public IActionResult GetAutoFillData(string inn)
        {
            var data = new
            {
                FullName = "Полное наименование ООО",
                ShortName = "Сокращенное наименование ООО",
                RegistrationDate = "2020-01-01",
                OGRN = "1234567890123"
            };
            return Ok(data);
        }

        [HttpGet("bankdetails/{bik}")]
        public IActionResult GetBankDetails(string bik)
        {
            var data = new
            {
                BranchName = "Название филиала банка",
                CorrAccount = "12345678901234567890"
            };
            return Ok(data);
        }

        [HttpGet("all-data")]
        public IActionResult GetAllData()
        {
            var ipData = _context.IPModels.ToList();
            var oooData = _context.OOOModels.ToList();

            var allData = new
            {
                IPData = ipData,
                OOOData = oooData
            };

            return Ok(allData);
        }

        [HttpPost("upload/{name}")]
        public async Task<IActionResult> UploadFile(string name)
        {
            try
            {


                var file = Request.Form.Files[0];

                if (file.Length > 0)
                {

                    var filePath = Path.Combine(_uploadDirectory, name);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    return Ok(new { filePath });
                }

                return BadRequest("No file uploaded");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
