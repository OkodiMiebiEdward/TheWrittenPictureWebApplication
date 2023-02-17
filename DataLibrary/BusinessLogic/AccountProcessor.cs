using DataLibrary.DataAccess;
using DataLibrary.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLibrary.BusinessLogic
{
    public static class AccountProcessor
    {
        public static int CreateAccount(int accountId, 
            string firstName, string lastName, string emailAddress, string password)
        {
            AccountModel data = new AccountModel
            {
                AccountId = accountId,
                FirstName = firstName,
                LastName = lastName,
                EmailAddress = emailAddress,
                Password = password
            };
            string sql = @"insert into dbo.AccountTable(AccountId, FirstName, LastName, EmailAddress, Password)
                          values (@AccountId,@FirstName,@LastName,@EmailAddress,@Password);";

            return SqlDataAccess.SaveData(sql, data);
        }

        // This method will be deleted later
        public static List<AccountModel> LoadAccounts()
        {
            string sql = @"select * from dbo.AccountTable";
            return SqlDataAccess.LoadData<AccountModel>(sql);
        }

        public static int Login(string emailAddress, string password)
        {
            LoginModel data = new LoginModel
            {
                EmailAddress = emailAddress,
                Password = password
            };
            string sql = @"select * from dbo.AccountTable where EmailAddress=@EmailAddress and 
               Password = @Password;";
            return SqlDataAccess.GetData(sql, data);
        }
    }
}
