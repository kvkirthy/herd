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

        public List<dynamic> GetMeetupSessionFeedbackQuestions(string sessionId)
        {
            try
            {
                var results = new List<dynamic>();

                var feedbackQuestionReferences = _dbContext.FeedbackQuestionAndMeetupSessions.Where(p => p.MeetupSessionId == sessionId);               
                

                if(feedbackQuestionReferences != null)
                {

                    feedbackQuestionReferences.ToList().ForEach(x =>
                    {
                        results.Add(new
                        {
                            id = x.FeedbackQuestionId,
                            Question = x.FeedbackQuestion.QuestionText
                        });
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

        public bool AddNewFeedbackResponse(List<FeedbackResponse> feedbackResponse)
        {
            try
            {
                feedbackResponse.ForEach(x => _dbContext.FeedbackQuestionResponses.Add(new FeedbackQuestionResponse
                {
                    MeetupSessionId = x.MeetupSessionId,
                    FeedbackQuestionId = x.QuestionId,
                    Rating = x.Rating,
                    FeedbackWriteup = x.Comments

                }));
                
                _dbContext.SaveChanges();

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
