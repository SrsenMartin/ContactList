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
            return  _context.Contacts;
        }

        // GET: api/Contact/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetContact([FromRoute] int id)
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

            return Ok(contact);
        }

        // GET: api/Contact/5/Numbers
        [HttpGet("{id}/Numbers")]
        public async Task<IActionResult> GetNumbers([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var numbers = await _context.Numbers.Where(number => number.ContactId == id).ToListAsync();

            if (numbers == null)
            {
                return NotFound();
            }

            return Ok(numbers);
        }

        // GET: api/Contact/5/Emails
        [HttpGet("{id}/Emails")]
        public async Task<IActionResult> GetEmails([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var emails = await _context.Emails.Where(email => email.ContactId == id).ToListAsync();

            if (emails == null)
            {
                return NotFound();
            }

            return Ok(emails);
        }

        // GET: api/Contact/5/Tags
        [HttpGet("{id}/Tags")]
        public async Task<IActionResult> GetTags([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tags = await _context.Tags.Where(tag => tag.ContactId == id).ToListAsync();

            if (tags == null)
            {
                return NotFound();
            }

            return Ok(tags);
        }

        // GET: api/Contact/Search
        [HttpGet("Search/{keyword}")]
        public async Task<IActionResult> searchContact([FromRoute] string keyword)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var contactsIds = new List<int>();
            var tags = await _context.Tags.Where(tag => tag.tagName.StartsWith(keyword)).ToListAsync();
            contactsIds.AddRange(tags.Select(tag => tag.ContactId));
            var contIds = await _context.Contacts.Where(contact => contact.Name.StartsWith(keyword) || contact.LastName.StartsWith(keyword)).ToListAsync();
            contactsIds.AddRange(contIds.Select(contact => contact.ContactId));
            var distEl = contactsIds.Distinct().ToList();

            var contacts = await _context.Contacts.Where(contact => distEl.Contains(contact.ContactId)).ToListAsync();
            foreach(Contact element in contacts)
            {
                element.Tags = new List<Tag>();
            }

            if (contacts == null)
            {
                return NotFound();
            }

            return Ok(contacts);
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

            _context.Entry(contact).State = EntityState.Modified;

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

            return NoContent();
        }

        // POST: api/Contact
        [HttpPost]
        public async Task<IActionResult> PostContact([FromBody] Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

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