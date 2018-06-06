using DataDemo.Primary;
using DataDemo.Secondary;
using DataDemo.Web.Extensions;
using DataDemo.Web.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataDemo.Web.Controllers
{
    [Route("api/[controller]")]
    public class AppController : Controller
    {
        private PrimaryDbContext pdb;
        private SecondaryDbContext sdb;

        public AppController(PrimaryDbContext pdb, SecondaryDbContext sdb)
        {
            this.pdb = pdb;
            this.sdb = sdb;
        }

        [HttpGet("[action]")]
        public async Task<List<Item>> GetItems()
        {
            return await sdb.GetItems();
        }

        [HttpGet("[action]")]
        public async Task<List<Location>> GetLocations()
        {
            return await sdb.GetLocations();
        }

        [HttpGet("[action]")]
        public async Task<List<ItemLocationModel>> GetItemLocations()
        {
            return await pdb.GetItemLocations(sdb);
        }

        [HttpGet("[action]")]
        public async Task<List<LocationItemModel>> GetLocationItems()
        {
            return await pdb.GetLocationItems(sdb);
        }

        [HttpPost("[action]")]
        public async Task AddItemLocation([FromBody]ItemLocationPair il)
        {
            await pdb.AddItemLocation(il.Item, il.Location);
        }

        [HttpPost("[action]/{id}")]
        public async Task UpdateItemLocation([FromBody]ItemLocationPair il, [FromRoute]int id)
        {
            await pdb.UpdateItemLocation(il.Item, il.Location, id);
        }

        [HttpPost("[action]/{id}")]
        public async Task UpdateLocationItem([FromBody]ItemLocationPair il, [FromRoute]int id)
        {
            await pdb.UpdateLocationItem(il.Item, il.Location, id);
        }

        [HttpPost("[action]")]
        public async Task RemoveItemLocation([FromBody]ItemLocation il)
        {
            await pdb.RemoveItemLocation(il);
        }
    }
}
