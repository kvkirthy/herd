
namespace Herd.Models
{
    public class FeedbackResponse
    {
        public string MeetupSessionId
        {
            get; set;
        }
        public int QuestionId
        {
            get; set;
        }
        public short Rating
        {
            get; set;
        }
        public string Comments
        {
            get; set;
        }
    }
}
