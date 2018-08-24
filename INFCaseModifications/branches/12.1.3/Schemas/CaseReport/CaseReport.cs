using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.IO;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.ServiceModel.Activation;
using System.Web;
using Terrasoft.Common;
using Terrasoft.Core;
using Terrasoft.Core.DB;
using System.Data;
using ClosedXML.Excel;

namespace Terrasoft.Configuration.CaseReport
{
	
	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
	public class CaseReport
	{
		#region Post
		[OperationContract]
		[WebInvoke(Method = "POST", UriTemplate = "GetReportURL", BodyStyle = WebMessageBodyStyle.Wrapped,
			RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
		public string GetReportURL(string StartDate, string DueDate, string location, string services)
		{
			var returnedId = Guid.NewGuid().ToString();
			var UserConnection = (UserConnection)HttpContext.Current.Session["UserConnection"];
			Dictionary<string, string> filters = new Dictionary<string, string>();
			filters.Add("StartDate", StartDate);
			filters.Add("DueDate", DueDate);
			filters.Add("location", location);
			filters.Add("services", services);
			UserConnection.ApplicationCache[returnedId] = filters;
			return returnedId;
		}

		#endregion
		#region FirstGenerate 
		[OperationContract]
		[WebGet(UriTemplate = "GenerateSalaryReport/{key}")]
		public Stream GenerateSalaryReport(string key)
		{
			if (System.Diagnostics.Debugger.IsAttached) { System.Diagnostics.Debugger.Break(); }
			var UserConnection = (UserConnection)HttpContext.Current.Session["UserConnection"];
			MemoryStream stream = new MemoryStream();
			var filters = (Dictionary<string, string>)UserConnection.ApplicationCache[key];
			UserConnection.ApplicationCache.Remove(key);
		   
			string StartDate =filters["StartDate"];
			string DueDate = filters["DueDate"];
			string location = filters["location"];
			string ServicesScope = filters["services"];
			
			
			 ////////////////////////Attributes for sql filter///////////////////////////////////////////
			string subId2 = ";";
            int mi1 = 0;
            int mi2;
            int k = 1;
            string ServiceItemName;
            string quot = "'";
            string sqlfilter = "";
            string teststr = ServicesScope;
             ////////////////////////Attributes for sql filter end///////////////////////////////////////////
			 ////////////////////////SQL FILTER BY SERVICE ITEM///////////////////////////////////////////
             if (teststr != String.Empty) {
            	sqlfilter = " and ServiceItemId in (select Id from ServiceItem where Name = ";
	            //parse:  
	            while (teststr != String.Empty) {
	                mi2 = teststr.IndexOf(subId2);
	                ServiceItemName = teststr.Substring(mi1, mi2);
	                teststr = teststr.Remove(mi2,1);
	                teststr = teststr.Remove(0,ServiceItemName.Length);
	                if (k==1) {
	                    sqlfilter = sqlfilter +quot+ ServiceItemName +quot;
	                    k++;
	                } else if (k>1) {
	                    sqlfilter = sqlfilter +" or Name = " + quot+ ServiceItemName +quot;
	                }
	            }
                //if (teststr != String.Empty) {
                //    goto parse;
                //} 
	            sqlfilter = sqlfilter +")";
            }
			 ////////////////////////SQL FILTER BY SERVICE ITEM END///////////////////////////////////////////
			 
			string StrStartDate = String.Format("{0:yyyy-MM-dd H:mm:ss}", StartDate);
			string StrDueDate = String.Format("{0:yyyy-MM-dd H:mm:ss}", DueDate);
			
			var dateFilter = "WHERE a.CreatedOn BETWEEN '" + StrStartDate + "' AND '" + StrDueDate + "'";
			
			var userConnection = (UserConnection)HttpContext.Current.Session["UserConnection"];
			var select = string.Empty;
			int CountActivity = 0;
			
			int flag = 1;
			string errorText = "";
			try
			{
				//------------------------Считать кол-во всех обращений за период----------------------//
				var sqlQuery = string.Format(@"SELECT 
					Count(a.Id) AS  [CountActivity]
					FROM [Case] a WITH(NOLOCK)
					{0} ", dateFilter);
				select = sqlQuery; //проверка запроса
				flag = 2;
				var resultQuery = new CustomQuery(userConnection, sqlQuery);
				flag = 3;

				using (var dbExecutor = userConnection.EnsureDBConnection())
				{
					using (var reader = resultQuery.ExecuteReader(dbExecutor))
					{
						while (reader.Read())
						{
							
							flag = 4;
							CountActivity = reader["CountActivity"] != DBNull.Value  ? (int)reader["CountActivity"] : 0;
							flag = 5;
						}
					}
				}
				
				//------------------------Считать кол-во всех обращений c плохой оценкой за период----------------------//
				var dateFilterb = "WHERE a.CreatedOn BETWEEN '" + StrStartDate + "' AND '" + StrDueDate + "'";
				var sqlQueryb = string.Format(@"SELECT 
					Count(a.Id) AS  [CountActivity]
					FROM [Case] a WITH(NOLOCK)
					{0} ", dateFilterb);
				select = sqlQueryb; //проверка запроса
				var resultQueryb = new CustomQuery(userConnection, sqlQueryb);
				int CountActivityb = 0;

				using (var dbExecutorb = userConnection.EnsureDBConnection())
				{
					using (var readerb = resultQueryb.ExecuteReader(dbExecutorb))
					{
						while (readerb.Read())
						{
							
							CountActivityb = readerb["CountActivity"] != DBNull.Value  ? (int)readerb["CountActivity"] : 0;
						}
					}
				}
				
				var dateFilterb2a = "WHERE a.CreatedOn BETWEEN '" + StrStartDate + "' AND '" + StrDueDate + "'";
				var sqlQueryb2a = string.Format(@"SELECT 
					Count(a.Id) AS  [CountActivity]
					FROM [Case] a WITH(NOLOCK)
					{0} ", dateFilterb2a);
				select = sqlQueryb2a; //проверка запроса
				var resultQueryb2a = new CustomQuery(userConnection, sqlQueryb2a);
				int CountActivityb2a = 0;

				using (var dbExecutorb2a = userConnection.EnsureDBConnection())
				{
					using (var readerb2a = resultQueryb2a.ExecuteReader(dbExecutorb2a))
					{
						while (readerb2a.Read())
						{
							
							CountActivityb2a = readerb2a["CountActivity"] != DBNull.Value  ? (int)readerb2a["CountActivity"] : 0;
						}
					}
				}

				using (var wb = new XLWorkbook())
				{
					flag = 6;
					//------------------------Header----------------------//
					//------------------------Первая страница----------------------//
					var ws = wb.Worksheets.Add("Статистика");
					var row1 = ws.Row(3);
					
					ws.Range("A1:D1").Merge();
					ws.Range("A3:D3").Merge();
					//ws.Range("A5:B5").Merge();
					//ws.Range("A6:B6").Merge();
					//ws.Range("A7:B7").Merge();
					ws.Row(1).Cell(1).Value = "Отчетная статистика c " + StrStartDate.ToString() + " по " + StrDueDate.ToString();
					row1.Cell(1).Value = "Качественно и своевременно решенные обращения";
					
					var row3 = ws.Row(5);
					row3.Cell(1).Value = teststr;
					row3.Cell(4).Value = sqlfilter;
					var row4 = ws.Row(6);
					var row5 = ws.Row(7);
					var row6 = ws.Row(8);
					row4.Cell(1).Value = "Имеющие плохую оценку: ";
					row4.Cell(4).Value = CountActivityb.ToString();
					row5.Cell(1).Value = "Имеющие просроченность по разрешению: ";
					row5.Cell(4).Value = CountActivityb2a.ToString();
					row6.Cell(1).Value = "Качественно решенные обращения за период: ";
					row6.Cell(4).Value = Convert.ToString(CountActivity);
					
					
				  	//************************************************************************************************
					//************************************************************************************************
					//************************************************************************************************
					//************************************************************************************************
					//************************************************************************************************
					
				  
					//-----------------------Настройка стилей-----------------------//
					//-----------------------Первая страница-----------------------//
					ws.Row(1).Cell(1).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center).Alignment.Vertical = XLAlignmentVerticalValues.Center;
					ws.Row(3).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center).Alignment.Vertical = XLAlignmentVerticalValues.Center;
					ws.Column(4).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center).Alignment.Vertical = XLAlignmentVerticalValues.Center;
					ws.Columns().AdjustToContents(1, 8);
					ws.Column(1).Width = 26.00;
					ws.Column(2).Width = 26.00;
					ws.Column(3).Width = 26.00;
					ws.Column(3).Width = 4.00;
					ws.Row(5).CellsUsed().Style.Font.Bold = true;
					ws.Row(6).CellsUsed().Style.Font.Bold = true;
					ws.Row(7).CellsUsed().Style.Font.Bold = true;
					ws.Row(8).CellsUsed().Style.Font.Bold = true;
					ws.Row(1).CellsUsed().Style.Font.Bold = true;
					ws.Row(3).CellsUsed().Style.Font.FontSize = 14;
					ws.Row(3).CellsUsed().Style.Font.Bold = true;
					
					ws.Row(10).Cell(1).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center).Alignment.Vertical = XLAlignmentVerticalValues.Center;
					ws.Row(12).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center).Alignment.Vertical = XLAlignmentVerticalValues.Center;
					ws.Row(14).CellsUsed().Style.Font.Bold = true;
					ws.Row(15).CellsUsed().Style.Font.Bold = true;
					ws.Row(16).CellsUsed().Style.Font.Bold = true;
					ws.Row(12).CellsUsed().Style.Font.Bold = true;
					ws.Row(12).CellsUsed().Style.Font.FontSize = 14;
					
					ws.Row(19).Cell(1).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center).Alignment.Vertical = XLAlignmentVerticalValues.Center;
					ws.Row(21).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center).Alignment.Vertical = XLAlignmentVerticalValues.Center;
					ws.Row(23).CellsUsed().Style.Font.Bold = true;
					ws.Row(24).CellsUsed().Style.Font.Bold = true;
					ws.Row(25).CellsUsed().Style.Font.Bold = true;
					ws.Row(21).CellsUsed().Style.Font.Bold = true;
					ws.Row(21).CellsUsed().Style.Font.FontSize = 14;
					
					ws.Cell(3, 1).Style.Font.FontColor = XLColor.FromTheme(XLThemeColor.Accent1);
					ws.Cell(12, 1).Style.Font.FontColor = XLColor.FromTheme(XLThemeColor.Accent1);
					ws.Cell(21, 1).Style.Font.FontColor = XLColor.FromTheme(XLThemeColor.Accent1);
					
					//-----------------------Save-----------------------//
					var memStream = new MemoryStream();
					wb.SaveAs(memStream);
					memStream.Position = 0;

					if (WebOperationContext.Current != null)
					{
						WebOperationContext.Current.OutgoingResponse.ContentType = "application/octet-stream";
						WebOperationContext.Current.OutgoingResponse.ContentLength = memStream.Length;
						WebOperationContext.Current.OutgoingResponse.Headers.Add("Content-Disposition",
						"attachment; filename=\"" + "CaseReport" + ".xlsx\"");
					}
					return memStream;
				}
			}
			catch (Exception ex)
			{
				using (var workbook = new XLWorkbook())
				{
					var worksheet = workbook.Worksheets.Add("Exception");
					var row1 = worksheet.Row(1);
					row1.Cell("A").Value = " - " + flag + " - " + select;
					var row2 = worksheet.Row(2);
					row2.Cell("A").Value = ex.Message;
					
					var row5 = worksheet.Row(5);
					row5.Cell("A").Value = "errorText: " + errorText;

					var memStream = new MemoryStream();
					workbook.SaveAs(memStream);
					memStream.Position = 0;
					if (WebOperationContext.Current != null)
					{
						WebOperationContext.Current.OutgoingResponse.ContentType = "application/octet-stream";
						WebOperationContext.Current.OutgoingResponse.ContentLength = memStream.Length;
						WebOperationContext.Current.OutgoingResponse.Headers.Add("Content-Disposition",
				"attachment; filename=\"" + "CaseReport" + ".xlsx\"");
					}
					return memStream;
				}
			}
		}

	}
}

#endregion