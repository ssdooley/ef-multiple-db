using DataDemo.Secondary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataDemo.Web.Models
{
    public class LocationItemModel
    {
        public Location Location { get; set; }
        public List<Item> Items { get; set; }
    }
}
