//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Herd.DataAccess
{
    using System;
    using System.Collections.Generic;
    
    public partial class FeedbackQuestion
    {
        public FeedbackQuestion()
        {
            this.FeedbackQuestionAndMeetupSessions = new HashSet<FeedbackQuestionAndMeetupSession>();
        }
    
        public int Id { get; set; }
        public string QuestionText { get; set; }
        public string AdditionalDetails { get; set; }
    
        public virtual ICollection<FeedbackQuestionAndMeetupSession> FeedbackQuestionAndMeetupSessions { get; set; }
    }
}
