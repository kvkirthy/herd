using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Herd.DataAccess
{
    interface I_OAuth
    {
        dynamic GetAccessToken(string authorizationCode);

        dynamic RefreshAccessToken(string refreshToken);
    }
}
