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
        public DbSet<Tag> Tags { get; set; }

        public ContactContext(DbContextOptions<ContactContext> options):base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Number>()
                .HasOne(n => n.Contact)
                .WithMany(c => c.Numbers)
                .HasForeignKey(n => n.ContactId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Email>()
                .HasOne(e => e.Contact)
                .WithMany(c => c.Emails)
                .HasForeignKey(e => e.ContactId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Tag>()
                .HasOne(t => t.Contact)
                .WithMany(c => c.Tags)
                .HasForeignKey(t => t.ContactId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
