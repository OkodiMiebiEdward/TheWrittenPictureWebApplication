using MvcUI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DataLibrary;
using DataLibrary.BusinessLogic;

namespace MvcUI.Controllers
{
    public class ServicesController : Controller
    {
        // GET: Service
        public ActionResult Account()
        {
            ViewBag.Message = "Your account page";
            return View();
        }

        public ActionResult Login()
        {
            ViewBag.Message = "Your Login page";
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Account(AccountModel model)
        {
            if(ModelState.IsValid)
            {
                int recordCreated = AccountProcessor.CreateAccount(model.AccountId, model.FirstName , model.LastName,
                model.EmailAddress, model.Password);
                return RedirectToAction("Login");
            }
            return View();
        }

        public ActionResult Services()
        {
            ViewBag.Message = "Your Services page";
            return View();
        }



        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(LoginModel model)
        {
            if (ModelState.IsValid)
            {
                int loggedIn = AccountProcessor.Login(model.EmailAddress, model.Password);

                ViewData["html"] = $"<h4>welcome {model.EmailAddress} </h4>";
                return View("Services");
                
            }
            ViewBag.Message = "Your Login page";
            return View();
        }
    }
}