import { BASE_URL } from "./baseurl.js";
const tBody = document.querySelector("tbody");
function getdata(endpoint){
    fetch(`${BASE_URL}/${endpoint}`)
    .then((res)=>res.json())
    .then((data)=>drawTable(data))
    
}
getdata("customers")

function delElem(endpoint,id){
    fetch(`${BASE_URL}/${endpoint}/${id}`,{method:"DELETE"})
    .then((res)=>res.json())
    .then((data)=>getdata("customers"))
    
}
getdata("customers")

// function getdatabyid(endpoint , id){
//     fetch(`${BASE_URL}/${endpoint}/${id}`)
//     .then((res)=>res.json())
//     .then((data)=>drawTable(data)
//     )
    
// }
// getdatabyid("customers" , 'AROUT')


function drawTable(arr) {
    tBody.innerHTML = "";
    arr.forEach((item) => {
      tBody.innerHTML += `
          <tr>
              <td>${item.id}</td>
              <td>${item.companyName}</td>
              <td>${item.contactTitle}</td>
              <td>${item.address?.phone}</td>
              <td>${item.address?.street}</td>
              <td>${item.address?.city}, ${item.address?.country}</td>
              <td class="d-flex gap-2">
                  <button class="delete btn btn-outline-danger" data-id=${item.id}>delete</button>
                  <button class="edit btn btn-outline-success">edit</button>
                  <a class="btn btn-outline-primary d-flex align-items-center" href="details.html?data-id=${item.id}">details</a>
              </td>
          </tr>
      `;
    });
    const allDeleteBtns = document.querySelectorAll(".delete");
    allDeleteBtns.forEach((btn)=>{
        btn.addEventListener("click" , function () {
            const id = btn.getAttribute("data-id");
            delElem("customers",id);
            btn.closest("tr")    
            
        })
    })


}
window.addEventListener("DOMContentLoaded", function () {
    getdata("suppliers");
  })