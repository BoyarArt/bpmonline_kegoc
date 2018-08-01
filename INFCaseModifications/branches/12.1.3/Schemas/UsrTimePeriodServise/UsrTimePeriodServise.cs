using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.ServiceModel.Activation;
using System.Web;
using System.Globalization;
using Terrasoft.Core;
using Terrasoft.Core.Entities;
using Terrasoft.Core.DB;

namespace UsrTimePeriodServise
{
	internal class UsrDayInCalendar
    {
        public string CId { get; set; }
        public string CName { get; set; }
        public string CTimeZoneId { get; set; }
        public string CDepth { get; set; }
        public string CAroundClock { get; set; }
        public string CWithoutDayOff { get; set; }
        public string DICDayTypeId { get; set; }
        public string DICDayOfWeekId { get; set; }
        public string DICDay { get; set; }
        public string DOWNAme { get; set; }
        public string DOWCode { get; set; }
        public int DOWNumber { get; set; }
        public string DTName { get; set; }
        public string DTIsWeekend { get; set; }
        public string DTNonWorking { get; set; }
        public string WTIDayOffId { get; set; }
        public string WTIfROM { get; set; }
        public string WTITo { get; set; }
    }
    internal class UsrDayOn
    {
        public TimeSpan allDayHours { get; set; }
        public DayOfWeek dayOfWeek { get; set; }

    }
    internal class UsrDayOff
    {
        public DateTime DODate { get; set; }
        public string DTName { get; set; }
        public string WTIfROM { get; set; }
        public string WTITo { get; set; }
    }
    public class UsrTimePeriodServise
    {
        public static TimeSpan GetRessult(DateTime startDate, DateTime endDate, Guid calendarId, string calendarTimeZone, string userTimeZone, UserConnection userConnection)
        {
        	if(startDate>endDate)
        	{
        		return new TimeSpan(0, 0, 0);
        	}
        	
            TimeZoneInfo timeZoneInfoKazahstan = TimeZoneInfo.FindSystemTimeZoneById(calendarTimeZone);            
            TimeZoneInfo timeZoneInfoLocal = TimeZoneInfo.FindSystemTimeZoneById(userTimeZone);        
            TimeSpan additionHours = timeZoneInfoKazahstan.BaseUtcOffset - timeZoneInfoLocal.BaseUtcOffset;
            
            startDate += additionHours;
            endDate += additionHours;
			
            DayOfWeek startTimeDayOfWeek = startDate.DayOfWeek;
            DayOfWeek endTimeDayOfWeek = endDate.DayOfWeek;           

            TimeSpan startTime = new TimeSpan(startDate.Hour, startDate.Minute, startDate.Second);
            TimeSpan endTime = new TimeSpan(endDate.Hour, endDate.Minute, endDate.Second);
            //startDate = new DateTime(startDate.Year, startDate.Month, startDate.Day + 1);
            //Вот именно в мессте + 1 и ошибка. Сегодня тот самый последний день в календаре для месяца.
            //32 числа в июле нету. Внимательно посмотрите на 76 строку и только так добавляте в будущем дни, месяца и года, часы, минуты и т.д.
            startDate = new DateTime(startDate.Year, startDate.Month, startDate.Day);
            startDate = startDate.AddDays(1);
            endDate = new DateTime(endDate.Year, endDate.Month, endDate.Day);           
                       
            //var userConnection = (UserConnection)HttpContext.Current.Session["UserConnection"];
            //var userConnection = new UserConnection(new AppConnection());

            //место для запроса
            var sqlQuery = string.Format(@"Select  c.Id as CId,
            								c.Name as CName, 
            								c.TimeZoneId as CTimeZoneId , 
            								c.Depth  as CDepth , 
            								c.AroundClock as CAroundClock , 
            								c.WithoutDayOff as CWithoutDayOff,  
											dic.DayTypeId  as DICDayTypeId  ,
											dic.DayOfWeekId as DICDayOfWeekId, 
											dic.Date as DICDay,
											dow.Name as DOWNAme,  
											dow.Code as DOWCode,
											dow.Number as DOWNumber,
											dt.Name as DTName, 
											dt.IsWeekend as DTIsWeekend, 
											dt.NonWorking as DTNonWorking , 
											wti.DayOffId as WTIDayOffId , 
											wti.[From] as WTIfROM , 
											wti.[To] AS WTITo
											from [DayInCalendar] dic
											join [Calendar] as c on c.Id = dic.CalendarId
											join [DayOfWeek] as dow on dow.Id =  dic.DayOfWeekId
											join [DayType] as dt on dt.Id = dic.DayTypeId
											join [WorkingTimeInterval] as wti on wti.DayInCalendarId= dic.Id
											where dic.CalendarId = '{0}'  
											Order by   dow.Number asc", calendarId);

            var sqlQueryDayOff = string.Format(@"Select top 20 do.Date as DODate,
                                            dt.Name as DTName, 
                                            wti.[From] as WTIfROM ,
                                            wti.[To] AS WTITo
                                            from [DayOff] do 
                                            left join [DayType] as dt on dt.Id = do.DayTypeId
                                            left join [WorkingTimeInterval] as wti on wti.DayOffId= do.Id
                                            where do.CalendarId = '{0}'", calendarId);

            List<UsrDayInCalendar> usrDays = new List<UsrDayInCalendar>();
            List<UsrDayOff> usrDaysOff = new List<UsrDayOff>();

            var resultQuery = new CustomQuery(userConnection, sqlQuery);

            using (var dbExecutor = userConnection.EnsureDBConnection())
            {
                using (var reader = resultQuery.ExecuteReader(dbExecutor))
                {
                    while (reader.Read())
                    {
                        usrDays.Add(new UsrDayInCalendar()
                        {

                            CId = reader["CId"] != DBNull.Value ? reader["CId"].ToString() : string.Empty,
                            CName = reader["CName"] != DBNull.Value ? reader["CName"].ToString() : string.Empty,
                            CTimeZoneId = reader["CTimeZoneId"] != DBNull.Value ? reader["CTimeZoneId"].ToString() : string.Empty,
                            CDepth = reader["CDepth"] != DBNull.Value ? reader["CDepth"].ToString() : string.Empty,
                            CAroundClock = reader["CAroundClock"] != DBNull.Value ? reader["CAroundClock"].ToString() : string.Empty,
                            CWithoutDayOff = reader["CWithoutDayOff"] != DBNull.Value ? reader["CWithoutDayOff"].ToString() : string.Empty,
                            DICDayTypeId = reader["DICDayTypeId"] != DBNull.Value ? reader["DICDayTypeId"].ToString() : string.Empty,
                            DICDayOfWeekId = reader["DICDayOfWeekId"] != DBNull.Value ? reader["DICDayOfWeekId"].ToString() : string.Empty,
                            DICDay = reader["DICDay"] != DBNull.Value ? reader["DICDay"].ToString() : string.Empty,
                            DOWNAme = reader["DOWNAme"] != DBNull.Value ? reader["DOWNAme"].ToString() : string.Empty,
                            DOWCode = reader["DOWCode"] != DBNull.Value ? reader["DOWCode"].ToString() : string.Empty,
                            DOWNumber = reader["DOWNumber"] != DBNull.Value ? (int)reader["DOWNumber"] : 0,
                            DTName = reader["DTName"] != DBNull.Value ? reader["DTName"].ToString() : string.Empty,
                            DTIsWeekend = reader["DTIsWeekend"] != DBNull.Value ? reader["DTIsWeekend"].ToString() : string.Empty,
                            DTNonWorking = reader["DTNonWorking"] != DBNull.Value ? reader["DTNonWorking"].ToString() : string.Empty,
                            WTIDayOffId = reader["WTIDayOffId"] != DBNull.Value ? reader["WTIDayOffId"].ToString() : string.Empty,
                            WTIfROM = reader["WTIfROM"] != DBNull.Value ? reader["WTIfROM"].ToString() : string.Empty,
                            WTITo = reader["WTITo"] != DBNull.Value ? reader["WTITo"].ToString() : string.Empty

                            //Quantity = reader["Quantity"] != DBNull.Value ? (decimal)reader["Quantity"] : 0
                        });
                    }
                }
            }

            var resultQueryDayOff = new CustomQuery(userConnection, sqlQueryDayOff);

            using (var dbExecutor = userConnection.EnsureDBConnection())
            {
                using (var reader = resultQueryDayOff.ExecuteReader(dbExecutor))
                {
                    while (reader.Read())
                    {
                        usrDaysOff.Add(new UsrDayOff()
                        {                         
                            DODate = reader["DODate"] != DBNull.Value ? (DateTime)reader["DODate"] : new DateTime(2000,1,1),
                            DTName = reader["DTName"] != DBNull.Value ? reader["DTName"].ToString() : string.Empty,
                            WTIfROM = reader["WTIfROM"] != DBNull.Value ? reader["WTIfROM"].ToString() : string.Empty,
                            WTITo = reader["WTITo"] != DBNull.Value ? reader["WTITo"].ToString() : string.Empty

                        });
                    }
                }
            }
            

            //Расчет часов для каждого дня недели
            List<UsrDayOn> usrDaysOn = new List<UsrDayOn>();
            usrDaysOn.Add(new UsrDayOn() { dayOfWeek = DayOfWeek.Monday, allDayHours = new TimeSpan(0, 0, 0) });
            usrDaysOn.Add(new UsrDayOn() { dayOfWeek = DayOfWeek.Tuesday, allDayHours = new TimeSpan(0, 0, 0) });
            usrDaysOn.Add(new UsrDayOn() { dayOfWeek = DayOfWeek.Wednesday, allDayHours = new TimeSpan(0, 0, 0) });
            usrDaysOn.Add(new UsrDayOn() { dayOfWeek = DayOfWeek.Thursday, allDayHours = new TimeSpan(0, 0, 0) });
            usrDaysOn.Add(new UsrDayOn() { dayOfWeek = DayOfWeek.Friday, allDayHours = new TimeSpan(0, 0, 0) });
            usrDaysOn.Add(new UsrDayOn() { dayOfWeek = DayOfWeek.Saturday, allDayHours = new TimeSpan(0, 0, 0) });
            usrDaysOn.Add(new UsrDayOn() { dayOfWeek = DayOfWeek.Sunday, allDayHours = new TimeSpan(0, 0, 0) });

            foreach (var currentDayOfWeek in usrDaysOn)
            {
                foreach (var item in usrDays.Where(t => t.DOWCode == currentDayOfWeek.dayOfWeek.ToString()))
                {
                    currentDayOfWeek.allDayHours += TimeSpan.Parse(item.WTITo) - TimeSpan.Parse(item.WTIfROM);                    
                }

            }

            TimeSpan TSRessult = new TimeSpan(0, 0, 0, 0);

            //Расчет первой и последней даты

            //Если первая и последняя даты тот же день
            if (endDate == startDate.AddDays(-1))
            {
                //Сокращенный или праздничный день           
                if (usrDaysOff.Where(h => h.DODate == endDate).Count() > 0)
                {
                    //Сокращенный день
                    foreach (var item in usrDaysOff.Where(t => t.DODate == endDate && (t.DTName == "Сокращенный" || t.DTName == "Рабочий день")))
                    {
                        TimeSpan from = TimeSpan.Parse(item.WTIfROM);
                        TimeSpan to = TimeSpan.Parse(item.WTITo);

                        if (endTime > startTime )
                        {
                            if (endTime <= from || to <= startTime)
                            {

                            }
                            else if (startTime <= from && from < endTime && endTime <= to)
                            {
                                TSRessult += endTime - from;
                            }
                            else if (startTime <= from && to <= endTime)
                            {
                                TSRessult += to - from;
                            }
                            else if (from <= startTime && endTime <= to)
                            {
                                TSRessult += endTime - startTime;
                            }
                            else if (from <= startTime && startTime < to && to <= endTime)
                            {
                                TSRessult += to - startTime;
                            }
                            else
                            {

                            }
                        }
                        
                    }
                }
                else // обычный день
                {
                    foreach (var item in usrDays.Where(t => t.DOWCode == startTimeDayOfWeek.ToString()))
                    {
                        TimeSpan from = TimeSpan.Parse(item.WTIfROM);
                        TimeSpan to = TimeSpan.Parse(item.WTITo);

                        if (endTime > startTime)
                        {
                            if (endTime <= from || to <= startTime)
                            {

                            }
                            else if (startTime <= from && from < endTime && endTime <= to)
                            {
                                TSRessult += endTime - from;
                            }
                            else if (startTime <= from && to <= endTime)
                            {
                                TSRessult += to - from;
                            }
                            else if (from <= startTime && endTime <= to)
                            {
                                TSRessult += endTime - startTime;
                            }
                            else if (from <= startTime && startTime < to && to <= endTime)
                            {
                                TSRessult += to - startTime;
                            }
                            else
                            {

                            }
                        }
                    }
                }
            }
            else //Если последняя дата > первой
            {
                //Расчет часов начальной даты 
                //Сокращенный день или праздник
                if (usrDaysOff.Where(h => h.DODate == startDate.AddDays(-1)).Count() > 0)
                {
                    foreach (var item in usrDaysOff.Where(t => t.DODate == startDate.AddDays(-1) &&  (t.DTName == "Сокращенный" || t.DTName == "Рабочий день")))
                    {
                        TimeSpan from = TimeSpan.Parse(item.WTIfROM);
                        TimeSpan to = TimeSpan.Parse(item.WTITo);

                        if (startTime <= from)
                        {
                            TSRessult += to - from;
                        }
                        else if (startTime > from && startTime < to)
                        {
                            TSRessult += to - startTime;
                        }
                        else { }
                    }
                }
                else // Обычный день
                {
                    foreach (var item in usrDays.Where(t => t.DOWCode == startTimeDayOfWeek.ToString()))
                    {
                        TimeSpan from = TimeSpan.Parse(item.WTIfROM);
                        TimeSpan to = TimeSpan.Parse(item.WTITo);

                        if (startTime <= from)
                        {
                            TSRessult += to - from;
                        }
                        else if (startTime > from && startTime < to)
                        {
                            TSRessult += to - startTime;
                        }
                        else { }
                    }
                }

                //Расчет часов конечной даты    
                //Сокращенный день или праздник
                if (usrDaysOff.Where(h => h.DODate == endDate).Count() > 0)
                {
                    foreach (var item in usrDaysOff.Where(t => t.DODate == endDate &&  (t.DTName == "Сокращенный" || t.DTName == "Рабочий день")))
                    {
                        TimeSpan from = TimeSpan.Parse(item.WTIfROM);
                        TimeSpan to = TimeSpan.Parse(item.WTITo);

                        if (endTime <= from) { }
                        else if (endTime > from && endTime < to)
                        {
                            TSRessult += endTime - from;
                        }
                        else
                        {
                            TSRessult += to - from;
                        }
                    }
                }
                else //обычный день
                {
                    foreach (var item in usrDays.Where(t => t.DOWCode == endTimeDayOfWeek.ToString()))
                    {
                        TimeSpan from = TimeSpan.Parse(item.WTIfROM);
                        TimeSpan to = TimeSpan.Parse(item.WTITo);

                        if (endTime <= from) { }
                        else if (endTime > from && endTime < to)
                        {
                            TSRessult += endTime - from;
                        }
                        else
                        {
                            TSRessult += to - from;
                        }
                    }
                }
            }
            
            

            //Расчет срединного промежутка
            if (startDate < endDate)
            {
                for (DateTime currentDate = startDate; currentDate < endDate; currentDate = currentDate.AddDays(1))
                {
                    if (usrDaysOff.Where(h => h.DODate == currentDate).Count() > 0)
                    {
                        foreach (var item in usrDaysOff.Where(t => t.DODate == currentDate &&  (t.DTName == "Сокращенный" || t.DTName == "Рабочий день")))
                        {
                            TSRessult += TimeSpan.Parse(item.WTITo) - TimeSpan.Parse(item.WTIfROM);
                        }
                    }
                    else
                    {
                        TSRessult += usrDaysOn.Where(f => f.dayOfWeek == currentDate.DayOfWeek).FirstOrDefault().allDayHours;
                    }
                }
            }
            return TSRessult;
        }
    }
}
