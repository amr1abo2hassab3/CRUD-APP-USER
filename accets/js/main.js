// جلب المدخلات من الصفحة
let firstName = document.getElementById("f-name");
let lastName = document.getElementById("l-name");
let age = document.getElementById("age");
let city = document.getElementById("city");
let salary = document.getElementById("salary");
let data = document.getElementById("data");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let imgInput = document.getElementById("img");
let jop = document.getElementById("jop");
let btnsubmit = document.querySelector(".btn-submit");
let cardSection = document.querySelector(".card");
let search = document.getElementById("search");
let modeFunction = "create";
let tempEdit = "";

let arrayUser;
// حفظ البيانات في مصفوفة إذا كانت موجودة في LocalStorage
if (localStorage.users != null) {
  arrayUser = JSON.parse(localStorage.users);
} else {
  arrayUser = [];
}

// وظيفة لإضافة مستخدم جديد

function addUser() {
  let userImage =
    imgInput.files && imgInput.files[0] ? imgInput.files[0] : null;

  if (userImage) {
    let reader = new FileReader();

    reader.onload = function (e) {
      createUserObject(e.target.result);
    };

    reader.readAsDataURL(userImage);
  } else {
    // وضع مسار الصورة الافتراضية هنا
    let defaultImage = "https://cdn-icons-png.flaticon.com/512/21/21104.png";
    createUserObject(defaultImage);
  }
}

function createUserObject(imageSrc) {
  let user = {
    fName: firstName.value.toLowerCase(),
    lName: lastName.value,
    Age: age.value,
    City: city.value,
    Salary: salary.value,
    Data: data.value,
    Email: email.value,
    Phone: phone.value,
    Img: imageSrc, // استخدم الصورة المرفوعة أو الصورة الافتراضية
    Jop: jop.value.toLowerCase(),
  };
  if (modeFunction === "create") {
    arrayUser.push(user);
    // حفظ البيانات في LocalStorage
    window.location.reload(); // إعادة تحميل الصفحة بعد إضافة العنصر
  } else {
    arrayUser[tempEdit] = user;
    modeFunction = "create";
    btnsubmit.innerHTML = "create users";
    window.location.reload(); // إعادة تحميل الصفحة بعد إضافة العنصر
  }

  localStorage.setItem("users", JSON.stringify(arrayUser));
  clearData();
  showData();
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
}
// وظيفة لمسح البيانات من المدخلات
function clearData() {
  firstName.value = "";
  lastName.value = "";
  age.value = "";
  city.value = "";
  salary.value = "";
  data.value = "";
  email.value = "";
  phone.value = "";
  imgInput.value = ""; // مسح المدخل الخاص بالصورة
  jop.value = "";
}

// وظيفة لحذف مستخدم
function DeleteUser(i) {
  if (confirm(`Are You sure to delete this user ${i + 1}`)) {
    arrayUser.splice(i,1);
    localStorage.users = JSON.stringify(arrayUser);
  }
  showData();
}

// وظيفة لحذف جميع المستخدمين
function deleteAll() {
  if (localStorage.users == null) {
    confirm(`there are not items to delets`);
  } else if (confirm(`Are you sure to Delete all users `)) {
    arrayUser = [];
    localStorage.removeItem("users");
  }
  showData();
}
// وظيفة لعرض البيانات في الصفحة
function showData() {
  let cardBody = "";
  for (let i = 0; i < arrayUser.length; i++) {
    cardBody += `
      <div class="parent elementCard" >
          <div class="img">
          <img src="${arrayUser[i].Img}">
          </div>
          <div class="text">
              <span class="name">${i + 1}</span>
              <span class="name"><span>name : </span>${arrayUser[i].fName} ${
      arrayUser[i].lName
    }</span>
              <span class="job"><span>job : </span>${arrayUser[i].Jop}</span>
          </div>
          <div class="btn_action">
              <button onclick="viewData(${i})"><i class='bx bxs-show'></i></button>
              <button onclick="editUser(${i})"><i class='bx bxs-edit-alt'></i></button>
              <button onclick="DeleteUser(${i})"><i class='bx bxs-trash-alt'></i></button>
          </div>
      </div>`;
  }

  cardSection.innerHTML = cardBody;
}
// ربط زر الإضافة بالوظيفة
btnsubmit.addEventListener("click", addUser);

function editUser(i) {
  let imgEdit = document.querySelector(".imgform img");

  // تعبئة الحقول بالبيانات الحالية
  firstName.value = arrayUser[i].fName;
  lastName.value = arrayUser[i].lName;
  age.value = arrayUser[i].Age;
  city.value = arrayUser[i].City;
  salary.value = arrayUser[i].Salary;
  data.value = arrayUser[i].Data;
  email.value = arrayUser[i].Email;
  phone.value = arrayUser[i].Phone;
  jop.value = arrayUser[i].Jop;
  imgEdit.src = arrayUser[i].Img;
  imgInput.src = arrayUser[i].Img;

  tempEdit = i;
  modeFunction = "update";
  btnsubmit.innerHTML = "update Data";
  Toppage();
}

// go to top page
function Toppage() {
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// function search
let searchMode = "searchName";
function getSearchMode(id) {
  searchMode = id;
  if (searchMode == "searchName") {
    search.placeholder = "Search By name";
  } else {
    search.placeholder = "Search By jop";
  }
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let cardBody = "";
  for (let i = 0; i < arrayUser.length; i++) {
    if (searchMode == "searchName") {
      if (arrayUser[i].fName.includes(value.toLowerCase())) {
        cardBody += `
      <div class="parent">
          <div class="img">
          <img src="${arrayUser[i].Img}">
          </div>
          <div class="text">
              <span class="name"><span>name : </span>${arrayUser[i].fName} ${arrayUser[i].lName}</span>
              <span class="job"><span>job : </span>${arrayUser[i].Jop}</span>
          </div>
          <div class="btn_action">
              <button><i class='bx bxs-show'></i></button>
              <button onclick="editUser(${i})"><i class='bx bxs-edit-alt'></i></button>
              <button onclick="DeleteUser(${i})"><i class='bx bxs-trash-alt'></i></button>
          </div>
      </div>`;
      }
    } else {
      if (arrayUser[i].Jop.includes(value.toLowerCase())) {
        cardBody += `
      <div class="parent">
          <div class="img">
          <img src="${arrayUser[i].Img}">
          </div>
          <div class="text">
              <span class="name"><span>name : </span>${arrayUser[i].fName} ${arrayUser[i].lName}</span>
              <span class="job"><span>job : </span>${arrayUser[i].Jop}</span>
          </div>
          <div class="btn_action">
              <button><i class='bx bxs-show'></i></button>
              <button onclick="editUser(${i})"><i class='bx bxs-edit-alt'></i></button>
              <button onclick="DeleteUser(${i})"><i class='bx bxs-trash-alt'></i></button>
          </div>
      </div>`;
      }
    }
  }

  cardSection.innerHTML = cardBody;
}

// this function go to user input form
let newUser = document.getElementById("newUser");
newUser.addEventListener("click", Toppage);

// عرض البيانات عند تحميل الصفحة
showData();

// this function show all data user
let shwoCard = document.querySelector(".shwocard");
let closeShow = document.querySelector(".closeShow");
let parentCard = document.querySelectorAll(".elementCard");
let temp = "";

function viewData(i) {
  parentCard[i].style.transform = "rotateY(360deg)";
  temp = i;
  shwoCard.style.left = "50%";
  shwoCard.innerHTML = `
  <i class='bx bx-x closeShow' onClick="btn_close()"></i>
        <div class="img imgform">
            <img src="${arrayUser[i].Img}" alt="">
        </div>
        <div class="from-input">
            <div>
                <label for="">first name : </label>
                <span>${arrayUser[i].fName}</span>
            </div>
            <div>
                <label for="">last name : </label>
                <span>${arrayUser[i].lName}</span>
            </div>
            <div>
                <label for="">jop : </label>
                <span>${arrayUser[i].Jop}</span>
            </div>
            <div>
                <label for="">age : </label>
                <span>${arrayUser[i].Age}</span>
            </div>
            <div>
                <label for="">city : </label>
                <span>${arrayUser[i].City}</span>
            </div>
            <div>
                <label for="">salary : </label>
                <span>${arrayUser[i].Salary + " $"}</span>
            </div>
            <div>
                <label for="">data : </label>
                <span>${arrayUser[i].Data}</span>
            </div>
            <div>
                <label for="">email : </label>
                <span>${arrayUser[i].Email}</span>
            </div>
            <div>
                <label for="">phone : </label>
                <span>${arrayUser[i].Phone}</span>
            </div>
        </div>
  `;
}

function btn_close() {
  shwoCard.style.left = "-150%";
  parentCard[temp].style.transform = "rotateY(0deg)";
}
