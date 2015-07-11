using System;
using System.IO;
using System.Net;
using System.Text;
using Herd.Utilities;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Herd.DataAccess
{
    class MeetupOAuth : I_OAuth
    {
        private string PostToOAuthAccess(string requestContent)
        {
            #region Create Request to get access token

            WebRequest request = null;
            try
            {
                //Todo: Configure Url.
                request = WebRequest.Create("https://secure.meetup.com/oauth2/access");
                var requestBytes = Encoding.UTF8.GetBytes(requestContent);
                request.ContentType = "application/x-www-form-urlencoded";
                request.Method = "POST";
                request.ContentLength = requestBytes.Length;
                var requestStream = request.GetRequestStream();
                requestStream.Write(requestBytes, 0, requestBytes.Length);
                requestStream.Close();
            }
            catch (Exception exception)
            {
                Logger.LogError(exception);
                return string.Empty;
            }

            #endregion Create Request to get access token

            #region Make calls and handle response

            try
            {
                var response = request.GetResponse();
                var statusCode = ((HttpWebResponse)response).StatusCode; // ToDo: need to add checks based on status code.

                var responseStream = new StreamReader(response.GetResponseStream());
                return responseStream.ReadToEnd();

            }
            catch (Exception exception)
            {
                Logger.LogError("Error while reading response obtained from OAUTH call. ", exception);
                return string.Empty;
            }

            #endregion Make calls and handle response
        }

        private Dictionary<string, string> GetDictionaryFromJson(string jsonReponse)
        {
            try
            {
                return JsonConvert.DeserializeObject<Dictionary<string, string>>(jsonReponse);
            }
            catch(Exception exception)
            {
                Logger.LogError("Error while deserializing JSON response. ", exception);
                return null;
            }
        }

        public dynamic GetAccessToken(string authorizationCode)
        {
            try
            {
                #region Request String
                //Todo: Configure keys
                var requestContent =
    "client_id=t72ikt2o1g0t032nr8ee7hcam9&" +
    "client_secret=d55c8eht5if8333rs2nnpdmi7b&" +
    "grant_type=authorization_code&" +
    "redirect_uri=http://localhost/herd&" +
    "code=" + authorizationCode;
                #endregion Request String

                var result = GetDictionaryFromJson(PostToOAuthAccess(requestContent));
                return new {
                    refreshToken = result["refresh_token"],
                    accessToken = result["access_token"]
                };
            }
            catch(Exception exception)
            {                            
                Logger.LogError("Error while getting access token. ", exception);
                return null;
            }            

        }

        public dynamic RefreshAccessToken(string refreshToken)
        {
            try
            {
                var requestContent = "client_id=t72ikt2o1g0t032nr8ee7hcam9&" +
                                     "client_secret=d55c8eht5if8333rs2nnpdmi7b&" +
                                     "grant_type=refresh_token&" +
                                     "refresh_token=" + refreshToken;

                var result= GetDictionaryFromJson(PostToOAuthAccess(requestContent));
                return new {
                    refreshToken = result["refresh_token"],
                    accessToken = result["access_token"]
                };
            }
            catch (Exception exception)
            {
                Logger.LogError("Error while getting refresh token token. ", exception);
                return null;
            }  

        }
    }
}
