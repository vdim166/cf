

namespace CompanyFormBackend.Models
{


    public class FileModel
    {
        public string lastModified { get; set; }
        public string name { get; set; }
        public int size { get; set; }
        public string type { get; set; }
        public string webkitRelativePath { get; set; }
    }

    public class IPModel
    {
        [System.ComponentModel.DataAnnotations.Key] // Explicitly mark this property as the primary key
        public int Id { get; set; }
        public string INN { get; set; }
        public string OGRNIP { get; set; }
        public string SkanEGRIP { get; set; }

        public string SkanINN { get; set; }

        public string SkanOGRNIP { get; set; }

        public string SkanOffice { get; set; }

        public string registrationDate { get; set; }


        public string bik { get; set; }
        public string branchName { get; set; }
        public string checkingAccount { get; set; }
        public string corrAccount { get; set; }
    }
}
