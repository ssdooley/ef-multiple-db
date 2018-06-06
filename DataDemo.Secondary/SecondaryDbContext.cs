using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataDemo.Secondary
{
    public class SecondaryDbContext : DbContext
    {
        public SecondaryDbContext(DbContextOptions<SecondaryDbContext> options) : base(options) { }

        public DbSet<Item> Items { get; set; }
        public DbSet<Location> Locations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var ent in modelBuilder.Model.GetEntityTypes().Select(x => x.Name))
            {
                modelBuilder.Entity(ent).ToTable(ent.Split('.').Last());
            }
        }
    }
}
