﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ContactListApi.Models;

namespace ContactListApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly ContactContext _context;

        public ContactController(ContactContext context)
        {
            _context = context;
        }

        // GET: api/Contact
        [HttpGet]
        public IEnumerable<Contact> GetContacts()
        {   
            return  _context.Contacts.Include(c => c.Numbers).Include(c => c.Emails).Include(c => c.ContactTags).OrderBy(cont => cont.Name).ToList();
        }

        // GET: api/Contact/5/Tags
        [HttpGet("{id}/Tags")]
        public IEnumerable<Tag> GetTagsByContact([FromRoute] int id)
        {
            return _context.Tags.Include(t => t.ContactTags).Where(t => t.ContactTags.Any(ct => ct.ContactId == id)).OrderBy(tg => tg.TagName).ToList();
        }

        // GET: api/Contact/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetContact([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var contact = await _context.Contacts.Include(c => c.Numbers).Include(c => c.Emails).Include(c => c.ContactTags).ToListAsync();

            if (contact == null)
            {
                return NotFound();
            }

            return Ok(contact.Where(cont => cont.ContactId == id));
        }

        // GET: api/Contact/Search
        [HttpGet("Search/{keyword}")]
        public async Task<IActionResult> searchContact([FromRoute] string keyword)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if(keyword == "*")
            {
                return Ok(_context.Contacts.Include(c => c.Numbers).Include(c => c.Emails).Include(c => c.ContactTags));
            }

            var contactsIds = new List<int>();
            var contIds = await _context.Contacts.Where(contact => contact.Name.StartsWith(keyword) || contact.LastName.StartsWith(keyword)).ToListAsync();
            contactsIds.AddRange(contIds.Select(contact => contact.ContactId));
            var distEl = contactsIds.Distinct().ToList();

            var contacts = await _context.Contacts.Include(c => c.Numbers).Include(c => c.Emails).Include(c => c.ContactTags).Where(contact => distEl.Contains(contact.ContactId)).OrderBy(cont => cont.Name).ToListAsync();

            if (contacts == null)
            {
                return NotFound();
            }

            return Ok(contacts);
        }


        private void updateChildren(Contact contact)
        {
            var toDeletetIds = _context.Numbers.Where(num => num.ContactId == contact.ContactId).Select(num => num.NumberId).ToList();
            var newIds = contact.Numbers;

            foreach(Number nn in newIds)
            {
                toDeletetIds.Remove(nn.NumberId);

                if(nn.NumberId > 0)
                {
                    _context.Entry(nn).State = EntityState.Modified;
                }
                else
                {
                    nn.Contact = contact;
                    nn.ContactId = contact.ContactId;
                    _context.Numbers.Add(nn);
                }
            }
            foreach(int id in toDeletetIds)
            {
                var num = _context.Numbers.Find(id);
                _context.Numbers.Remove(num);
            }

            toDeletetIds = _context.Emails.Where(email => email.ContactId == contact.ContactId).Select(email => email.EmailId).ToList();
            var newMails = contact.Emails;

            foreach (Email nn in newMails)
            {
                toDeletetIds.Remove(nn.EmailId);

                if (nn.EmailId > 0)
                {
                    _context.Entry(nn).State = EntityState.Modified;
                }
                else
                {
                    nn.Contact = contact;
                    nn.ContactId = contact.ContactId;
                    _context.Emails.Add(nn);
                }
            }
            foreach (int id in toDeletetIds)
            {
                var email = _context.Emails.Find(id);
                _context.Emails.Remove(email);
            }
        }

        // PUT: api/Contact/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContact([FromRoute] int id, [FromBody] Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != contact.ContactId)
            {
                return BadRequest();
            }

            var nums = new List<Number>();
            var ems = new List<Email>();
            foreach (var num in contact.Numbers)
            {
                if (!nums.Any(n => n.PhoneNumber == num.PhoneNumber))
                {
                    nums.Add(num);
                }
            }
            foreach (var em in contact.Emails)
            {
                if (!ems.Any(e => e.EmailAdress == em.EmailAdress))
                {
                    ems.Add(em);
                }
            }

            contact.Numbers = nums;
            contact.Emails = ems;
            _context.Entry(contact).State = EntityState.Modified;
            updateChildren(contact);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(contact);
        }

        // POST: api/Contact
        [HttpPost]
        public async Task<IActionResult> PostContact([FromBody] Contact contact)
        {
            var nums = new List<Number>();
            var ems = new List<Email>();
            foreach(var num in contact.Numbers)
            {
                if(!nums.Any(n => n.PhoneNumber == num.PhoneNumber))
                {
                    nums.Add(num);
                }
            }
            foreach (var em in contact.Emails)
            {
                if (!ems.Any(e => e.EmailAdress == em.EmailAdress))
                {
                    ems.Add(em);
                }
            }

            contact.Numbers = nums;
            contact.Emails = ems;
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContact", new { id = contact.ContactId }, contact);
        }

        // DELETE: api/Contact/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null)
            {
                return NotFound();
            }

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();

            return Ok(contact);
        }

        private bool ContactExists(int id)
        {
            return _context.Contacts.Any(e => e.ContactId == id);
        }
    }
}