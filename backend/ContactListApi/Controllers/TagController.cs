using System;
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
    public class TagController : ControllerBase
    {
        private readonly ContactContext _context;

        public TagController(ContactContext context)
        {
            _context = context;
        }

        // GET: api/Tag
        [HttpGet]
        public IEnumerable<Tag> GetTags()
        {
            return _context.Tags.Include(t => t.ContactTags).OrderBy(tg => tg.TagName).ToList();
        }

        // GET: api/Tag/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTag([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tags = await _context.Tags.Include(t => t.ContactTags).ToListAsync();

            if (tags == null)
            {
                return NotFound();
            }

            return Ok(tags.Where(t => t.TagId == id));
        }

        // GET: api/Tag/5/Contacts
        [HttpGet("{id}/Contacts")]
        public IEnumerable<Contact> GetContactsByTag([FromRoute] int id)
        {
            return _context.Contacts.Include(c => c.Numbers).Include(c => c.Emails).Include(c => c.ContactTags).Where(c => c.ContactTags.Any(ct => ct.TagId == id)).OrderBy(cont => cont.Name).ToList();
        }

        [HttpPost("AddContacts/{id}")]
        public async Task<IActionResult> PostTagContacts([FromRoute] int id, [FromBody] int[] ids)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var idsForTag = _context.ContactTags.Where(ct => ct.TagId == id && ids.Contains(ct.ContactId));
            foreach(var ct in idsForTag)
            {
                ids = ids.Where(ci => ci != ct.ContactId).ToArray();
            }

            ContactTag[] toAdd = new ContactTag[ids.Length];
            for(int i = 0; i < ids.Length; i++)
            {
                toAdd[i] = new ContactTag(ids[i], id);
            }

            _context.ContactTags.AddRange(toAdd);
            await _context.SaveChangesAsync();

            return Ok(toAdd);
        }


        // PUT: api/Tag/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTag([FromRoute] int id, [FromBody] Tag tag)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tag.TagId)
            {
                return BadRequest();
            }

            _context.Entry(tag).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TagExists(id))
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

        // POST: api/Tag
        [HttpPost]
        public async Task<IActionResult> PostTag([FromBody] Tag tag)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if(_context.Tags.Any(e => e.TagName == tag.TagName))
            {
                return BadRequest(ModelState);
            }

            _context.Tags.Add(tag);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTag", new { id = tag.TagId }, tag);
        }

        // DELETE: api/Tag/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTag([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tag = await _context.Tags.FindAsync(id);
            if (tag == null)
            {
                return NotFound();
            }

            _context.Tags.Remove(tag);
            await _context.SaveChangesAsync();

            return Ok(tag);
        }

        private bool TagExists(int id)
        {
            return _context.Tags.Any(e => e.TagId == id);
        }
    }
}