using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;


namespace MvcUI.Models
{
    public class LoginModel
    {
        [Display(Name = "Email Address")]
        [DataType(DataType.EmailAddress)]
        [Required(ErrorMessage = "You need to give us your email address.")]
        public string EmailAddress { get; set; }


        [DataType(DataType.Password)]
        [Required(ErrorMessage = "You need to provide a password.")]
        public string Password { get; set; }


        public string FirstName { get; set; }
    }
}