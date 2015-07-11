using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using Herd.DataAccess;
using Herd.Utilities;
using Herd.Models;

namespace Herd.Api
{
    public class UserController : ApiController
    {
        I_OAuth oauth = new MeetupOAuth();

        #region APIs
        public Models.User Get()
        {
            var codes  = GetMeetupOAuthCode();
            return GetMeetupUser(codes);
        }
        #endregion APIs

        #region Private Functions

        private User GetMeetupUser(dynamic codes)
        {
            var user= new MeetupApiDataAccess().GetUser(codes.accessToken);
            new UserDataAccess().CreateOrUpdateOAuthUser(new OAuthUser
            {
                UserName = user.MeetupId,
                Key = codes.accessToken,
                AdditionalData = codes.refreshToken
                
            });
            return user;
        }

        private dynamic GetMeetupOAuthCodeByUserName()
        {
            var userName = GetValueFromHeaders("userName");

            #region Get Access Code  from DB. Refresh with meetup if needed

            if (userName != string.Empty)
            {
                // Check if user exists
                var user = new UserDataAccess().GetOAuthUser(userName);

                // Supposedly current code of the user didn't expire.
                if ((user != null) && (!user.Key.Equals(string.Empty)))
                {
                    // if the key hasn't expired return it.
                    if (DateTime.UtcNow.Subtract(user.DataTimeKeyObtained).TotalMinutes <= 55)
                    {
                        return new
                               {
                                   accessToken = user.Key,
                                   refreshToken = user.AdditionalData
                               };
                    }
                    else
                    {
                        return RefreshOAuthCode(user);
                    }
                }
            }

            #endregion Get Access Code  from DB. Refresh with meetup if needed

            return null;
        }

        private dynamic GetMeetupOAuthCodeByUserKey()
        {
            var key = GetValueFromHeaders("oAuthUserKey");

            if (key != string.Empty)
            {
                return oauth.GetAccessToken(key);
            }
            else
            {
                throw new HttpException(400, "oAuthUserKey is missing.");
            }
        }

        private string GetValueFromHeaders(string headerName)
        {
            IEnumerable<string> headerValues = new List<string>();
            Request.Headers.TryGetValues(headerName, out headerValues);

            if (headerValues != null && headerValues.Any())
            {
                return headerValues.FirstOrDefault();
            }

            return string.Empty;
        }

        private dynamic RefreshOAuthCode(OAuthUser user)
        {
            dynamic accessToken;
            try
            {
                accessToken = oauth.RefreshAccessToken(user.AdditionalData);                
            }
            catch(Exception exception)
            {
                Logger.LogError("Uanble to refresh Auth Code. Resulted in error ", exception);
                return null;
            }
            try
            {
                new UserDataAccess().UpdateOAuthAccessCode(user.UserName, accessToken);
                return accessToken;
            }
            catch(Exception exception)
            {
                Logger.LogError("Uanble to update refreshed Auth Code in local DB. Resulted in error ", exception);
                return accessToken;
            }
            
        }

        private dynamic GetMeetupOAuthCode()
        {
            // If user exists in DB get the key and return.
            dynamic key = GetMeetupOAuthCodeByUserName();
            if (key != null) return key;

            // Get new code if user doesn't exist
            return GetMeetupOAuthCodeByUserKey();
        }

        #endregion Private Functions
    }
}
