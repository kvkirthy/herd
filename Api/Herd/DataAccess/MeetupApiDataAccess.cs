using System;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Text;
using Herd.Models;
using Herd.Utilities;
using Newtonsoft.Json;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace Herd.DataAccess
{
    public class MeetupApiDataAccess
    {
        public User GetUser(string userKey)
        {

            WebRequest request = null;
            try
            {
                //Todo: Configure Url.
                request = WebRequest.Create("https://api.meetup.com/2/member/self/");
                request.Headers.Add("Authorization", "Bearer " + userKey);
                request.Method = "GET";
                
                var response = request.GetResponse();
                var statusCode = ((HttpWebResponse)response).StatusCode; // ToDo: need to add checks based on status code.

                var responseStream = new StreamReader(response.GetResponseStream());
                var data = responseStream.ReadToEnd();

                Debug.WriteLine("Self call response from Meetup Api - " + data);
                return DeserializeJsonToUser(data);
            }
            catch (Exception exception)
            {
                Logger.LogError(exception);
                return null;
            }
        }

        private User DeserializeJsonToUser(string data)
        {
            try
            {
                var userDictionary = JObject.Parse(data);
                return new User{
                    FullName = userDictionary["name"].Value<string>(),
                    ImageUrl = userDictionary["photo"]["highres_link"].Value<string>(),
                    MeetupId = userDictionary["id"].Value<string>()
                };

            }
            catch(Exception exception)
            {
                Logger.LogError("Error deserializing user entity from Meetup API. ", exception);
                return null;
            }
            

        }
    }
}
