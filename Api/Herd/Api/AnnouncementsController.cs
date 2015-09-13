using Herd.DataAccess;
using Herd.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace Herd.Api
{
    public class AnnouncementsController : ApiController
    {
        [Route("announcements")]
        [HttpGet]
        public List<Announcement> GetSessionFeedbackQuestions()
        {
            return new AnnouncementsDataAccess().GetAnnouncements();
        }
    }
}
