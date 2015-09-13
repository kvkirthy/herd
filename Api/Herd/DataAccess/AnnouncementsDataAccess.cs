using Herd.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Herd.DataAccess
{
    public class AnnouncementsDataAccess
    {
        private HerdMsSqlEntities _dbContext = new HerdMsSqlEntities();

        public List<Announcement> GetAnnouncements()
        {
            try
            {
                return _dbContext.Announcements.ToList(); 
            }
            catch (Exception exception)
            {
                Logger.LogError("Error while getting announcements from database.", exception);
                return null;
            }
        }

    }
}
