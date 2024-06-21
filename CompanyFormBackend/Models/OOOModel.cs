
namespace CompanyFormBackend.Models
{
    public class OOOModel
    {
        [System.ComponentModel.DataAnnotations.Key] // Explicitly mark this property as the primary key
        public int Id { get; set; }
        public string INN { get; set; }
        public string SkanEGRIP { get; set; }
        public string SkanINN { get; set; }
        public string SkanOGRN { get; set; }
        public string fullName { get; set; }
        public string SkanOffice { get; set; }
        public string shortName { get; set; }
        public string ogrn { get; set; }
        public string registrationDate { get; set; }

        public string bik { get; set; }
        public string branchName { get; set; }
        public string checkingAccount { get; set; }
        public string corrAccount { get; set; }
    }
}

