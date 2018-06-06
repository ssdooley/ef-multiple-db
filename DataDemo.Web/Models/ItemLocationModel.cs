using DataDemo.Secondary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataDemo.Web.Models
{
    public class ItemLocationModel
    {
        public Item Item { get; set; }
        public List<Location> Locations { get; set; }
    }
}
