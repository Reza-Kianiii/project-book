let loggin = document.querySelector("#loggin");
let registry = document.querySelector("#regiestry");
let btn = document.querySelector(".btn");
let formloggin = document.querySelector(".contianer_form_loggin");
let formregistry = document.querySelector(".contianer_form_registery");
let btnlogin = document.querySelector("#btn_login");
let a = document.querySelector("a");
let user = [];
let Loading;
loggin.addEventListener("click", () => {
  generatestyle(0, 0, 280 + "px");
});

registry.addEventListener("click", () => {
  generatestyle(120 + "px", 280 + "px", 0);
});

function generatestyle(btnvalue, formlogginvalue, formregistryvalue) {
  btn.style.left = btnvalue;
  formloggin.style.left = formlogginvalue;
  formregistry.style.left = formregistryvalue;
}
let New_user;
let Find_user;
let username;
let password;

async function registry22() {
  Loading=document.querySelector('.Container_Loading');
  Loading.style.display='block';
  username = document.querySelector("#username").value;
  password = document.querySelector("#password").value;
  New_user = { Username: username, Password: password };
  
  console.log(Loading)
  Registry_Promise().then(
    (value) => {
      if (value) {
        Loading.style.display='none',
        alert("این مقدار قبلا ذخیره شده است");
        
      } else {
        Loading.style.display='none',
        user.push(New_user);
        alert("کاربر ذخیره شد");
      }
    });
  }
  
  let loginusername;
  let loginpassword;
  
  let User_Find;
  
  function Login22(e) {
    // e.preventDefault();
    Loading=document.querySelector('.Container_Loading');
    Loading.style.display='block',
    loginusername = document.querySelector("#loginusername").value;
    loginpassword = document.querySelector("#loginpassword").value;
    Login_Promise().then(
      
      (value) => {
        if (value) {
        Loading.style.display='none',
          alert(`سلام  ${value.Username}`);
          location.href = `./book/book.html`;
    } else {
      Loading.style.display='none',
      alert("چنین کاربری وجود ندارد");
    }
  });
}

function Registry_Promise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let Newuser = user.some((item, index) => {
        if (item.Username === username && item.Password === password) {
          return true;
        }
      });
      resolve(Newuser);
    }, 1000);
  });
}

function Login_Promise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let Newuser = user.find((item, index) => {
        if (item.Username == loginusername && item.Password == loginpassword) {
          return item;
        }
      });

      resolve(Newuser);
    }, 1000);
  });
}
