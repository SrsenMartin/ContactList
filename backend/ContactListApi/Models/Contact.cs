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
        [Key]
        public int ContactId { get; set; }

        [Required]
        [MinLength(2)]
        [MaxLength(30)]
        public string Name { get; set; }

        [MaxLength(30)]
        public string LastName { get; set; }

        [MaxLength(100)]
        [EmailAddress]
        public string Adress { get; set; }

        public List<Number> Numbers { get; set; }
        public List<Email> Emails { get; set; }
    }

    public class Number
    {
        [Key]
        public int NumberId { get; set; } 

        [MaxLength(15)]
        public string PhoneNumber { get; set; }

        public int ContactId { get; set; }
        public Contact Contact { get; set; }
    }

    public class Email
    {
        [Key]
        public int EmailId { get; set; }

        [MaxLength(320)]
        [EmailAddress]
        public string EmailAdress { get; set; }

        public int ContactId { get; set; }
        public Contact Contact { get; set; }
    }
}
