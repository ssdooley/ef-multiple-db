using DataDemo.Secondary;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataDemo.Web.Extensions
{
    public static class SecondaryExtensions
    {
        public static async Task<List<Item>> GetItems(this SecondaryDbContext db) => await db.Items.ToListAsync();
        public static async Task<List<Location>> GetLocations(this SecondaryDbContext db) => await db.Locations.ToListAsync();
    }
}
