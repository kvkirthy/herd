using Herd.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Herd.DataAccess
{
    public class AnnouncementsDataAccess
    {
        private HerdMsSqlEntities _dbContext = new HerdMsSqlEntities();

        public List<Announcement> GetAnnouncements()
        {
            try
            {
                return _dbContext.Announcements.Where( p => p.HasExpired != true ).ToList(); 
            }
            catch (Exception exception)
            {
                Logger.LogError("Error while getting announcements from database.", exception);
                return null;
            }
        }

    }
}
