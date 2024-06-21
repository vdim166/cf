using Microsoft.EntityFrameworkCore;
using CompanyFormBackend.Models;

namespace CompanyFormBackend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<OOOModel> OOOModels { get; set; }
        public DbSet<IPModel> IPModels { get; set; }
    }
}
