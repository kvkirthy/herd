using System;
using System.Linq;
using Herd.Utilities;

namespace Herd.DataAccess
{
    public class UserDataAccess
    {
        private HerdMsSqlEntities _dbContext = new HerdMsSqlEntities();

        public OAuthUser GetOAuthUser(string userName)
        {
            try
            {
                return _dbContext.OAuthUsers.FirstOrDefault(p => p.UserName == userName);
            }
            catch (Exception exception)
            {
                Logger.LogError("Error while reading OAuth token from local DB. ", exception);
                return null;
            }  
        }

        public bool CreateOrUpdateOAuthUser(OAuthUser user)
        {
            try
            {
                var userInDb = GetOAuthUser(user.UserName);

                if (userInDb != null)
                {
                    userInDb.Key = user.Key;
                    userInDb.DataTimeKeyObtained = DateTime.UtcNow;
                    userInDb.AdditionalData = user.AdditionalData;
                }
                else
                {
                    _dbContext.OAuthUsers.Add(user);
                }
                _dbContext.SaveChanges();
                return true;
            }
            catch (Exception exception)
            {
                Logger.LogError("Error Create/Update User in DB", exception);
                return false;
            }
        }

        public bool UpdateOAuthAccessCode(string userName, string accessCode)
        {
            try
            {
                var userInDb = GetOAuthUser(userName);

                if (userInDb != null)
                {
                    userInDb.Key = accessCode;
                    userInDb.DataTimeKeyObtained = DateTime.UtcNow;
                    _dbContext.SaveChanges();
                    return true;
                }
                else
                {
                    throw new Exception(string.Format("No user found with user name {0}. ", userName));
                }
            }
            catch (Exception exception)
            {
                Logger.LogError("Error Create/Update User in DB", exception);
                return false;
            }
        }
    }
}