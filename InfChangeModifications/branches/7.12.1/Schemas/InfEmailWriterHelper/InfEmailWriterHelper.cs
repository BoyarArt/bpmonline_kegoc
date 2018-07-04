namespace Terrasoft.Configuration
{
    using System;
    using System.Web;
    using Terrasoft.Core;
    using Terrasoft.Web.Common;
 
    public class InfEmailWriterHelper : IMacrosInvokable
    {
        public UserConnection UserConnection { get; set; }
 
        public string GetMacrosValue(object Arguments)
        {
            return WebUtilities.GetBaseApplicationUrl(HttpContext.Current.Request);
        }
    }
}