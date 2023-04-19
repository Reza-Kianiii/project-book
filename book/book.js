



let ul = document.querySelector(".Section_Body_main ul");
let Container_Btn;
let Detect_Type_btn;
let Reading_List_Array = [];
let Loading = "-spinner";
let Icon_Plus = "-plus-square   itemsquare";
let toast = document.querySelector(".alert ");
let deletebtn='-times-circle   itemtimescircle'
let Stars = [
  {
    id: 1,
    rate: 4,
    book_id: 3,
  },
  {
    id: 2,
    rate: 1,
    book_id: 4,
  },
  {
    id: 3,
    rate: 2,
    book_id: 5,
  },
  {
    id: 4,
    rate: 5,
    book_id: 6,
  },
  {
    id: 5,
    rate: 3,
    book_id: 7,
  },
];
let Discover = [
  {
    id: 3,
    name: "Voice of War",
    description: "Chrys Valerian is a threadweaver, a high general",
    writer: {
      id: 1,
      name: "ali dashti",
      age: 50,
      address: "esfahan",
    },
    is_read: false,
    is_finish: false,
    image_file: "./img/book(1).jpg",
  },
  {
    id: 4,
    name: "The Lord of the Rings",
    description:
      "In ancient times the Rings of Power were crafted by the Elven-smiths, and Sauron,",
    writer: {
      id: 1,
      name: "ali dashti",
      age: 50,
      address: "esfahan",
    },
    is_read: false,
    is_finish: false,
    image_file: "./img/book(2).jpg",
  },
  {
    id: 5,
    name: "Harry Potter and the Sorcerer's Stone",
    description:
      "Harry Potter has no idea how famous he is. That's because he's being raised by his miserable aunt",
    writer: {
      id: 1,
      name: "ali dashti",
      age: 50,
      address: "esfahan",
    },
    is_read: false,
    is_finish: false,
    image_file: "./img/book(3).jpg",
  },
  {
    id: 6,
    name: "Harry Potter and the Prisoner of Azkaban",
    description:
      "In this third installment in the projected seven-volume series, Sirius Black",
    writer: {
      id: 1,
      name: "ali dashti",
      age: 50,
      address: "esfahan",
    },
    is_read: true,
    is_finish: false,
    image_file: "./img/book(4).jpg",
  },
  {
    id: 7,
    name: "Harry Potter and the Half-Blood Prince",
    description:
      "The war against Voldemort is not going well; even the Muggles have been affected.",
    writer: {
      id: 1,
      name: "ali dashti",
      age: 50,
      address: "esfahan",
    },
    is_read: false,
    is_finish: true,
    image_file: "./img/book(5).jpg",
  },
];

window.onload = () => {

  GenerateElement(Discover);
};

let All_Tab;
function Manage_Tab(event) {
  event.preventDefault();
  All_Tab = document.querySelectorAll(".Container_Left ul a li");
  All_Tab.forEach((item) => {
    item.classList.remove("active");
  });
  event.target.classList.add("active");
  Manage_Page(event);
}
let Page;
let input;
function Manage_Page(event ) {
  console.log('reza')
  if (event.target.id == "Reading") {
   console.log('mohsen kiani')
    GenerateElement(Reading_List_Array);
    
    let Container_Btn_Reading = document.querySelectorAll(".Setion_Btn_Book > button");
     input=document.querySelectorAll('.Container_Right .Container_input');
    input[0].classList.add('disable_input');
   
    Array.from(Container_Btn_Reading).forEach((item,index) => {
     Set_ClassList(item.firstElementChild,deletebtn) 
    item.addEventListener('click',(e)=>{
      
      Delete_Reading_List(index)
      e.target.closest('li').remove()
      

    })
    });
  } else {
    GenerateElement(Discover);
    input[0].classList.remove('disable_input')
  }
}

let Value_Search;
let Filter_Search;
let Page_Active;
function Manage_Search(event) {
  event.preventDefault();

  let Page_Active=  document.querySelectorAll('.Container_Left  > ul >a > li.active')
  
  let Value_Search = event.target.value;
  if(Page_Active[0].id=='Discover'){
    Search( Value_Search,Discover)
  }
  else if(Page_Active[0].id=='Reading'){
    Search(Value_Search,Reading_List_Array)
  }
}


function Search(key,list){
  
  Filter_Search = list.filter((item) => {
    if (item.name.toUpperCase().includes(key.toUpperCase())) {
     return item.name
    }
  });
  if(key){
      GenerateElement(Filter_Search);

  }
  else{
   GenerateElement(list)
  }

}





function Handel_Container_Book(event) {
  event.preventDefault();
}

function Manage_Btn(e, indexitem, bookid) {
  e.preventDefault();
  e.stopPropagation();
  Container_Btn = document.querySelectorAll(".Setion_Btn_Book .Contaienr_Btn")[indexitem];
  Detect_Type_btn = e.target;

  if (Detect_Type_btn.className.includes("fas fa-plus-square   itemsquare")) {
    Set_ClassList(e.target, Loading);
    Add_Reading_list_promise(indexitem)
      .then(() => {
        Toggel_Btn_Hidden(e.target, Container_Btn);
        Alert("این کتاب , به لیست کتاب های خوانده شده اضافه شد");
      })
      .catch(() => {
        alert(" این کتاب  قبلا انتخاب کردید");
        Set_ClassList(e.target, Icon_Plus);
      });
  } else if (
    Detect_Type_btn.className.includes("fas fa-check-circle   itemcheckcircle")
  ) {
    
    Show_Star(indexitem, bookid);
  } else if (
    Detect_Type_btn.className.includes("fas fa-times-circle   itemtimescircle ")
  ) {
    
    Toggel_Btn_Show(e.target, indexitem);
    Delete_Reading_List(bookid);
   
  }
}

let Length_Array_Reading_Before;
let Length_Array_Reading_After;

function Add_Reading_list_promise(indexitem) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Length_Array_Reading_Before = Reading_List_Array.length;
      Reading_List_Array.push(Discover[indexitem]);
      Length_Array_Reading_After = Reading_List_Array.length;
      if (Length_Array_Reading_After == Length_Array_Reading_Before) {
        reject(false);
      } else {
        resolve(true);
      }
    }, 500);
  });
}

function Alert(text) {
  toast.firstElementChild.textContent = text;

  Alert_Hidden();
  setTimeout(() => {
    toast.style.right = "-18rem";
  }, 2000);
}

function Alert_Hidden() {
 (toast.style.right = "0");
}

function Toggel_Btn_Hidden(target, Container_Btn) {
  
  
 target.closest("button").style.display = "none" ;

Container_Btn.classList.remove("hidden");
}

let Container_btn_Index;
let Element_Current_to_Container;

function Toggel_Btn_Show(target, indexitem) {
  
  target.closest("div").classList.add("hidden");
  Container_btn_Index =
    document.querySelectorAll(".Setion_Btn_Book")[indexitem];
  Element_Current_to_Container = Container_btn_Index.querySelector("button i");
  Set_ClassList(Element_Current_to_Container, Icon_Plus);
  Container_btn_Index.querySelector("button").style.display = "block";
}

let Index_Book_id;

function Delete_Reading_List(bookid) {

  Index_Book_id = Reading_List_Array.findIndex((item) => {
    if (item.id === bookid) {
      return item;
    }
  });
  Reading_List_Array.splice(Index_Book_id, 1);
  Alert("این کتاب ,از کتاب خواننده شده ها حذف شد");
}

function Set_ClassList(Element, itemclass) {
  Class_Name_Btn = Element.className;
  Find_Index_Btn = Class_Name_Btn.indexOf("-");
  let change = Class_Name_Btn.substr(0, Find_Index_Btn);
  Element.className = change + itemclass;
}

let all_Container_Star;
let Find_Index_Star;
let All_Container_Span_Star;
let Index_Star;
let Number_stars;

function Show_Star(indexitem, id) {
  console.log(Reading_List_Array)
  all_Container_Star = document.querySelectorAll(".Container_Star");
  All_Container_Span_Star = document.querySelectorAll(
    ".Container_Star .Container_Span_star"
  );
 



 Find_Index_Star=indexitem
  let Child_star = All_Container_Span_Star[Find_Index_Star].children;
  
  Number_stars = Stars[Find_Index_Star].rate;
  
  for (let i = 0; i < Number_stars; i++) {
(Child_star[i].style.color = "yellow");
  }
 all_Container_Star[indexitem].classList.toggle("hidden");
}

let Span_Star;

function Mouseover_star(event,indexitem, book_id) {

  Span_Star = All_Container_Span_Star[indexitem].children;

  
  Array.from(Span_Star).forEach((item) => {
    item.style.color = "";
  });
  
  for (let i = 0; i < event.target.id; i++) {
    Span_Star[i].style.color = "yellow";
  }
}




let Number_rate;
function Mouseleave(indexitem, book_id) {
  Number_rate = Stars.findIndex((item) => {
    if (item.book_id === book_id) {
      return item;
    }
  });
  Array.from(Span_Star).forEach((item) => {
    item.style.color = "";
  });
  All_Container_Span_Star[indexitem].children;

  for (let i = 0; i < Stars[Number_rate].rate; i++) {
    All_Container_Span_Star[indexitem].children[i].style.color = "yellow";
  }
}

let New_Number_star
let New_Star_Color;
function Set_Star(event,id){

   New_Number_star=event.target.id;


  New_Star_Color=  Stars.findIndex((item)=>{
    if(item.book_id==id){
      return item
    }
  })
  Stars[New_Star_Color].rate=New_Number_star

}



function GenerateElement(value) {
  ul.innerHTML = "";
  value.forEach((item, index) => {
    ul.innerHTML += `          <li>
    <a href="" onclick=" Handel_Container_Book(event)">

       <div class="Section_Container_Book"  >
           <div class="Setion_Photo_Book"><img src="${item.image_file}" alt="photo"></div>
           <div class="Setion_text_Book">
               <div class="Container_Header_Text_Book">
                   <div class="Contaner_Names">
                       <div class="Name_Book">
                           <h5>${item.name}</h5>
                       </div>
                       <div class="Writer_Name">
                           <div >${item.writer.name}</div>
                           <small>${item.writer.address}</small>
                       </div>
                   </div>
                   <div class=" Container_Star hidden" >
                   <div class="Container_Span_star">
                       <span onclick="Set_Star(event,${item.id}, ${index})"   onmouseleave="Mouseleave(${index},${item.id})"  onmouseover="Mouseover_star(event,${index},${item.id})" id=1 class="fa fa-star " ></span>
                       <span onclick="Set_Star(event,${item.id},${index})" onmouseleave="Mouseleave(${index},${item.id})"  onmouseover="Mouseover_star(event,${index},${item.id})" id=2 class="fa fa-star " ></span>
                       <span onclick="Set_Star(event,${item.id},${index})" onmouseleave="Mouseleave(${index},${item.id})"  onmouseover="Mouseover_star(event,${index},${item.id})" id=3 class="fa fa-star " ></span>
                       <span onclick="Set_Star(event,${item.id},${index})" onmouseleave="Mouseleave(${index},${item.id})"  onmouseover="Mouseover_star(event,${index},${item.id})" id=4 class="fa fa-star" ></span>
                       <span onclick="Set_Star(event,${item.id},${index})" onmouseleave="Mouseleave(${index},${item.id})"  onmouseover="Mouseover_star(event,${index},${item.id})" id=5 class="fa fa-star" ></span>
                   </div>
                 </div>
                   <div class="Description">
                       <small >
                          ${item.description}
                       </small>
                   </div>
               </div>
           </div>
           <div class="Setion_Btn_Book">
               <button  onclick="Manage_Btn(event,${index},${item.id})"><i class="fas fa-plus-square   itemsquare "></i></button>
               <div class="Contaienr_Btn hidden">
                   <button  onclick="Manage_Btn(event ,${index},${item.id})"><i class="fas fa-check-circle   itemcheckcircle "></i></button>
                   <button  onclick="Manage_Btn(event,${index},${item.id})"><i class="fas fa-times-circle   itemtimescircle "></i></button>         
               </div>
           </div>
       </div>
    </a>
</li> `;
  });
}
