CREATE TABLE [dbo].[AccountTable]
(
	[Id] INT NOT NULL PRIMARY KEY  IDENTITY(1,1), 
    [AccountId] INT NOT NULL, 
    [FirstName] NVARCHAR(50) NOT NULL, 
    [LastName] NVARCHAR(50) NOT NULL, 
    [EmailAddress] NVARCHAR(50) NOT NULL, 
    [Password] NVARCHAR(50) NOT NULL
)
