using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataDemo.Primary
{
    public class PrimaryDbContext : DbContext
    {
        public PrimaryDbContext(DbContextOptions<PrimaryDbContext> options) : base(options) { }

        public DbSet<ItemLocation> ItemLocations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var ent in modelBuilder.Model.GetEntityTypes().Select(x => x.Name))
            {
                modelBuilder.Entity(ent).ToTable(ent.Split('.').Last());
            }
        }
    }
}
