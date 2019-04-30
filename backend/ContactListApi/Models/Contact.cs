using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ContactListApi.Models
{
    public class Contact
    {
        public Contact()
        {
            Numbers = new List<Number>();
            Emails = new List<Email>();
            ContactTags = new List<ContactTag>();
        }

        [Key]
        public int ContactId { get; set; }

        [Required]
        [MinLength(2)]
        [MaxLength(30)]
        public string Name { get; set; }

        [MaxLength(30)]
        public string LastName { get; set; }

        [MaxLength(100)]
        public string Adress { get; set; }

        public virtual ICollection<Number> Numbers { get; set; }
        public virtual ICollection<Email> Emails { get; set; }
        public virtual ICollection<ContactTag> ContactTags { get; set; }
    }

    public class Number
    {
        [Key]
        public int NumberId { get; set; } 

        [MaxLength(15)]
        [Required]
        public string PhoneNumber { get; set; }

        public int ContactId { get; set; }
        public Contact Contact { get; set; }
    }

    public class Email
    {
        [Key]
        public int EmailId { get; set; }

        [MaxLength(320)]
        [Required]
        [EmailAddress]
        public string EmailAdress { get; set; }

        public int ContactId { get; set; }
        public Contact Contact { get; set; }
    }

    public class Tag
    {
        [Key]
        public int TagId { get; set; }

        [Required]
        [MaxLength(100)]
        public string TagName { get; set; }

        public virtual ICollection<ContactTag> ContactTags { get; set; }
    }

    public class ContactTag
    {
        public ContactTag(int contactId, int tagId)
        {
            this.ContactId = contactId;
            this.TagId = tagId;
        }

        public int ContactId { get; set; }
        public Contact Contact { get; set;}

        public int TagId { get; set; }
        public Tag Tag { get; set; }
    }
}
