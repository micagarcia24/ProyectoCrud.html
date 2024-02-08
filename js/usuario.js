var form = document.getElementById("myForm"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    btnVentas=document.getElementsByClassName("btnVentas1")

let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

showInfo()

function Ventas(){
    window.location.href="ventas.html";
}

function showInfo(){
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove())
    getData.forEach((element, index) => {
        let createElement = `<tr class="employeeDetails">
            <td>${index+1}</td>
            <td>${element.employeeName}</td>
            <td>${element.employeeAge}</td>
            <td>${element.employeeCity}</td>
            <td>${element.employeeEmail}</td>
            <td>${element.employeePhone}</td>
            <td>${element.employeePost}</td>
            <td>${element.startDate}</td>

        </tr>`

        userInfo.innerHTML += createElement
    })
}
showInfo()



var searchInput = document.getElementById('searchInput');


searchInput.addEventListener('input', function() {
    searchUsers();
});

function searchUsers() {

    var searchTerm = searchInput.value.toLowerCase();

    var filteredData = getData.filter(function (user) {
        return (
            user.employeeName.toLowerCase().includes(searchTerm) ||
            user.employeeCity.toLowerCase().includes(searchTerm) ||
            user.employeeEmail.toLowerCase().includes(searchTerm) ||
            user.employeePost.toLowerCase().includes(searchTerm) ||
            user.employeePhone.toLowerCase().includes(searchTerm)
        );
    });


    document.querySelectorAll('.employeeDetails').forEach(info => info.remove());

    filteredData.forEach((element, index) => {
        let createElement = `<tr class="employeeDetails">
            <td>${index + 1}</td>
            <td>${element.employeeName}</td>
            <td>${element.employeeAge}</td>
            <td>${element.employeeCity}</td>
            <td>${element.employeeEmail}</td>
            <td>${element.employeePhone}</td>
            <td>${element.employeePost}</td>
            <td>${element.startDate}</td>          
        </tr>`;

        userInfo.innerHTML += createElement;
    });
}
function goBackTologin() {
        
    window.location.href = 'login.html';
}
