using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;


namespace ContactListApi.Models
{
    public static class DbDataLoader
    {

        //private static string clearDb = "DELETE FROM Contacts WHERE 1=1";

        public static void Initialize(IServiceProvider serviceProvider)
        {
            using(var context = new ContactContext(serviceProvider.GetRequiredService<DbContextOptions<ContactContext>>()))
            {
                if (context.Contacts.Any())
                {
                    return;
                }

                //context.Database.ExecuteSqlCommand(deleteDatabase);
                context.Contacts.AddRange(
                    new Contact
                    {
                        Name="Ante",
                        LastName="Antic",
                        Adress="Ulica 123",
                        Emails=new List<Email>(new Email[] { new Email { EmailAdress="ante.antic@gmail.com"}, new Email { EmailAdress="ante.antic222@hotmail.com"} }),
                        Numbers=new List<Number>(new Number[] { new Number { PhoneNumber = "09999999999" }, new Number { PhoneNumber = "09111111111" } }),
                        Tags=new List<Tag>(new Tag[] { new Tag { TagName="susjed"}, new Tag { TagName="moze proc"} })
                    },
                    new Contact
                    {
                        Name = "Mate",
                        LastName = "Matic",
                        Emails = new List<Email>(new Email[] { new Email { EmailAdress = "mate.matic@gmail.com" }}),
                        Tags = new List<Tag>(new Tag[] { new Tag { TagName = "Novi Zeland" }, new Tag { TagName = "reda radi" } })
                    },
                    new Contact
                    {
                        Name = "Ivo",
                        Adress = "Ivina ulica 1",
                        Numbers = new List<Number>(new Number[] { new Number { PhoneNumber = "09421321" }, new Number { PhoneNumber = "0942131242" }, new Number { PhoneNumber = "09777777" } }),
                        Tags = new List<Tag>(new Tag[] { new Tag { TagName = "jedan jedini" }})
                    },
                    new Contact
                    {
                        Name = "Pero",
                        LastName = "Peric",
                        Adress = "No num,no mail"
                    },
                    new Contact
                    {
                        Name = "Petar",
                        LastName = "Stijena",
                        Adress = "Vukovarska 999",
                        Emails = new List<Email>(new Email[] { new Email { EmailAdress = "petar@gmail.com" }, new Email { EmailAdress = "petar1@hotmail.com" }, new Email { EmailAdress = "pppp1@hotmail.com" } }),
                        Numbers = new List<Number>(new Number[] { new Number { PhoneNumber = "1" }, new Number { PhoneNumber = "2" }, new Number { PhoneNumber = "000000003" } }),
                        Tags = new List<Tag>(new Tag[] { new Tag { TagName = "stijena" }, new Tag { TagName = "covik" }, new Tag { TagName = "zvijer"} })
                    }
                    );

                context.SaveChanges();
            }
        }

    }
}
