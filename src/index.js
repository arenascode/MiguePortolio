
//** Shadow effect in Logo **//

const navBar = document.querySelector("#navBar");

const nameLogo = document.querySelector(".name");
let walk = 25;

function showShadow(e) {
  const { offsetWidth: width, offsetHeight: height } = navBar;
  let { offsetX: x, offsetY: y } = e;

  if (this !== e.target) {
    x = x + e.target.offsetLeft;
    y = y + e.target.offsetTop;
  }
  const xWalk = (x / width) * walk - walk / 2;
  const yWalk = (y / height) * walk - walk / 2;

  nameLogo.style.removeProperty("transition");
  nameLogo.style.textShadow = `${xWalk}px ${yWalk}px 0 grey`;
}

function removeShadow() {
  nameLogo.style.transition = `all 0.3s ease-out`;
  nameLogo.style.removeProperty("text-shadow");
}
navBar.addEventListener("mousemove", showShadow);

navBar.addEventListener("mouseleave", removeShadow);

// ** Show Modal in Mobile and Tablet Design **//
const burguerBtn = document.querySelector(".menuModalBtn");

const navMenuMobile = document.querySelector(".navBar_Mobile");

const closeModalBtn = document.querySelector(".closeModalBtn");

console.log(closeModalBtn);

function showModalMenu() {
  console.log("hello!");
  navMenuMobile.style.display = "block";
  setTimeout(() => {
    navMenuMobile.style.opacity = "1";
  }, 10);
}

function closeModal() {
  console.log(`hiii`);
  navMenuMobile.style.opacity = "0";
  setTimeout(() => {
    navMenuMobile.style.display = "none";
  }, 500);
}
burguerBtn.addEventListener("click", showModalMenu);

closeModalBtn.addEventListener("click", closeModal);

window.onclick = function (e) {
  if (e.target == navMenuMobile) {
    navMenuMobile.style.opacity = "0";
    setTimeout(() => {
      navMenuMobile.style.display = "none";
    }, 500);
  }
};

//** fix nav */

// window.onscroll = function () {
//   if (window.scrollY >= navBar.offsetTop) {
//     navBar.style.display = 'fixed'
//     document.body.style.paddingTop = navBar.offsetHeight + 'px'
//   } else {
//     document.body.style.paddingTop = '0'
//   }
// }
// ** Send Contact Message to Server **//

const form = document.querySelector("form");

if (form instanceof HTMLFormElement) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const dataForm = new FormData(form);
    const name = dataForm.get("name");
    const email = dataForm.get("email");
    const message = dataForm.get("message");

    const dataToSend = {
      name,
      email,
      message,
    };

    // ** SweetAlert Config
    const Toast = Swal.mixin({
      toast: true,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    fetch("http://localhost:8080/api/form", {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.status == 200) {
          Toast.fire({
            icon: "success",
            title: "Gracias Por Tu Mensaje! En Breve Me comunicaré contigo",
          });
          form.reset();
        } else if (res.status == 400) {
          res.json().then((data) => {
            Toast.fire({
              icon: "error",
              title: `${data}`,
              timer: 0,
              timerProgressBar: false,
              showConfirmButton: true,
            });
          });
        } else if (res.status == 500) {
          res.json().then((data) => {
            Toast.fire({
              icon: "error",
              title: `${data.errorMsg}`,
              timer: 0,
              timerProgressBar: false,
              showConfirmButton: true,
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Toast.fire({
          icon: "error",
          title: `${err.message}`,
          timer: 0,
          timerProgressBar: false,
          showConfirmButton: true,
        });
      });
  });
}
