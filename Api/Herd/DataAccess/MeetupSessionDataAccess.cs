using Herd.Models;
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

                var feedbackQuestionReferences = _dbContext.FeedbackQuestionAndMeetupSessions.Where(p => p.MeetupSessionId == sessionId);               
                

                if(feedbackQuestionReferences != null)
                {

                    feedbackQuestionReferences.ToList().ForEach(x =>
                    {
                        results.Add(x.FeedbackQuestion.QuestionText);
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

        public bool AddNewFeedbackResponse(FeedbackResponse feedbackResponse)
        {
            try
            {
                _dbContext.FeedbackQuestionResponses.Add(new FeedbackQuestionResponse
                {
                    MeetupSessionId = feedbackResponse.MeetupSessionId,
                    FeedbackQuestionId = feedbackResponse.QuestionId,
                    Rating = feedbackResponse.Rating

                });
                return true;
            }
            catch(Exception exception)
            {
                Logger.LogError("Error while updating feedback response ", exception);
                return false;
            }
        }
    }
}
