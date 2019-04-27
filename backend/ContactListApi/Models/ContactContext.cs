using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ContactListApi.Models
{
    public class ContactContext:DbContext
    {

        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Number> Numbers { get; set; }
        public DbSet<Email> Emails { get; set; }

        public ContactContext(DbContextOptions<ContactContext> options):base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Number>()
                .HasOne(c => c.Contact)
                .WithMany(n => n.Numbers)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Email>()
                .HasOne(e => e.Contact)
                .WithMany(n => n.Emails)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
