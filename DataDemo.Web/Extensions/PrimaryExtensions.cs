using DataDemo.Primary;
using DataDemo.Secondary;
using DataDemo.Web.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataDemo.Web.Extensions
{
    public static class PrimaryExtensions
    {
        public static async Task<List<ItemLocationModel>> GetItemLocations(this PrimaryDbContext db, SecondaryDbContext sdb)
        {
            var items = await sdb.GetItems();
            var model = new List<ItemLocationModel>();

            foreach (var i in items)
            {
                var il = new ItemLocationModel
                {
                    Item = i,
                    Locations = await db.GetLocations(sdb, i.Id)
                };

                model.Add(il);
            }

            return model;
        }

        public static async Task<List<Location>> GetLocations(this PrimaryDbContext db, SecondaryDbContext sdb, int itemId)
        {
            var locationIds = await db.ItemLocations
                .Where(x => x.ItemId == itemId)
                .Select(x => x.LocationId).ToListAsync();

            var locations = await sdb.Locations.Where(x => locationIds.Contains(x.Id)).ToListAsync();

            return locations;
        }

        public static async Task<List<LocationItemModel>> GetLocationItems(this PrimaryDbContext db, SecondaryDbContext sdb)
        {
            var locations = await sdb.GetLocations();
            var model = new List<LocationItemModel>();

            foreach (var l in locations)
            {
                var li = new LocationItemModel
                {
                    Location = l,
                    Items = await db.GetItems(sdb, l.Id)
                };

                model.Add(li);
            }

            return model;
        }

        public static async Task<List<Item>> GetItems(this PrimaryDbContext db, SecondaryDbContext sdb, int locationId)
        {
            var itemIds = await db.ItemLocations
                .Where(x => x.LocationId == locationId)
                .Select(x => x.ItemId)
                .ToListAsync();

            var items = await sdb.Items.Where(x => itemIds.Contains(x.Id)).ToListAsync();

            return items;
        }

        public static async Task AddItemLocation(this PrimaryDbContext db, Item i, Location l)
        {
            if (await i.Validate(l, db))
            {
                var il = new ItemLocation
                {
                    ItemId = i.Id,
                    LocationId = l.Id
                };

                await db.ItemLocations.AddAsync(il);
                await db.SaveChangesAsync();
            }
        }

        public static async Task UpdateItemLocation(this PrimaryDbContext db, Item i, Location l, int oldLocationId)
        {
            if (await i.Validate(l, db))
            {
                var il = await db.ItemLocations.FirstOrDefaultAsync(x => x.ItemId == i.Id && x.LocationId == oldLocationId);

                if (il != null)
                {
                    il.LocationId = l.Id;
                    await db.SaveChangesAsync();
                }
            }
        }

        public static async Task UpdateLocationItem(this PrimaryDbContext db, Item i, Location l, int oldItemId)
        {
            if (await i.Validate(l, db))
            {
                var il = await db.ItemLocations.FirstOrDefaultAsync(x => x.ItemId == oldItemId && x.LocationId == l.Id);

                if (il != null)
                {
                    il.ItemId = i.Id;
                    await db.SaveChangesAsync();
                }
            }
        }

        public static async Task RemoveItemLocation(this PrimaryDbContext db, ItemLocation model)
        {
            var il = await db.ItemLocations.FindAsync(model.Id);
            db.ItemLocations.Remove(il);
            await db.SaveChangesAsync();
        }

        private static async Task<bool> Validate(this Item i, Location l, PrimaryDbContext db)
        {
            var itemLocation = await db.ItemLocations.FirstOrDefaultAsync(il => il.ItemId == i.Id && il.LocationId == l.Id);

            if (itemLocation != null)
            {
                throw new Exception("The provided item location has already been specified");
            }

            return true;
        }
    }
}
