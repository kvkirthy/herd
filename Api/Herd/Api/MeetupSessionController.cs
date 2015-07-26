using Herd.DataAccess;

using System.Collections.Generic;
using System.Web.Http;

namespace Herd.Api
{
    public class MeetupSessionController : ApiController
    {
        [Route("meetupSession/{meetupSessionId}/feedbackQuestions")]
        [HttpGet]
        public List<string> GetSessionFeedbackQuestions(string meetupSessionId)
        {
            return new MeetupSessionDataAccess().GetMeetupSessionFeedbackQuestions(meetupSessionId);
        }
    }
}
