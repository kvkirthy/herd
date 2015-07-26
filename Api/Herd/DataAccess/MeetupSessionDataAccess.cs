using Herd.Utilities;

using System;
using System.Collections.Generic;
using System.Linq;


namespace Herd.DataAccess
{
    public class MeetupSessionDataAccess
    {
        private HerdMsSqlEntities _dbContext = new HerdMsSqlEntities();

        public List<string> GetMeetupSessionFeedbackQuestions(string sessionId)
        {
            try
            {
                var results = new List<string>();

                var a = _dbContext.MeetupSessions.First();
                
                var meetupSession = _dbContext.MeetupSessions.FirstOrDefault(p => p.MeetupIdentifier.Equals(sessionId));

                if(meetupSession != null)
                {
                    meetupSession.FeedbackQuestions.ToList().ForEach(x =>
                    {
                        results.Add(x.QuestionText);
                    });

                    return results;
                }
                else
                {
                    Logger.LogInformation("No records found for " + sessionId);
                    return null;
                }
                
            }
            catch (Exception exception)
            {
                Logger.LogError("Error while getting Feedback questions from database.", exception);
                return null;
            }
        }
    }
}
