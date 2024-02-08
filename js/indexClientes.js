var form = document.getElementById("myForm"),
    nombre = document.getElementById("nombre"),
    edad = document.getElementById("edad"),
    ciudad = document.getElementById("ciudad"),
    email = document.getElementById("email"),
    telefono = document.getElementById("telefono"),
    postal = document.getElementById("postal"),
    fecha = document.getElementById("fecha"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser");



let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

let isEdit = false, editId

showInfo()

/*Redirige al formulario de ventas*/
function Ventas(){
window.location.href="ventas.html"
}
newUserBtn.addEventListener('click', ()=> {
    submitBtn.innerText = 'Enviar',
    modalTitle.innerText = "Llenar el Formulario"
    isEdit = false

    form.reset()
})


/*mostrar la información de los perfiles de empleados en la interfaz */
function showInfo(){
     // Elimina todos los elementos con la clase 'employeeDetails' para evitar duplicados
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove())
      // Itera sobre cada elemento en el array 'getData' y crea una fila de la tabla para cada uno
    getData.forEach((element, index) => {
        // Crea un nuevo elemento de fila con la información del empleado
        let createElement = `<tr class="employeeDetails">
            <td>${index+1}</td>
            <td>${element.employeeName}</td>
            <td>${element.employeeAge}</td>
            <td>${element.employeeCity}</td>
            <td>${element.employeeEmail}</td>
            <td>${element.employeePhone}</td>
            <td>${element.employeePost}</td>
            <td>${element.startDate}</td>
            <td>
                <button class="btn btn-success" onclick="readInfo( '${element.employeeName}', '${element.employeeAge}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}', '${element.employeePost}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>
                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.employeeName}', '${element.employeeAge}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}', '${element.employeePost}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
                            
            </td>
        </tr>`
        // Agrega el nuevo elemento de fila al contenido de la tabla
        userInfo.innerHTML += createElement
    })
}// Llama a la función showInfo para inicializar la interfaz con la información existente
showInfo()


function readInfo(name, age, city, email, phone, post, sDate){
  // Establece los valores de los campos del formulario de solo lectura con la información proporcionada
    document.querySelector('#showName').value = name,
    document.querySelector("#showAge").value = age,
    document.querySelector("#showCity").value = city,
    document.querySelector("#showEmail").value = email,
    document.querySelector("#showPhone").value = phone,
    document.querySelector("#showPost").value = post,
    document.querySelector("#showsDate").value = sDate
}

/*se encarga de preparar el formulario y la interfaz para la edición de la información de un empleado */
function editInfo(index, name, Age, City, Email, Phone, Post, Sdate){
    /*Marcar que se esta editando */
    isEdit = true
     // Almacenar el índice del elemento que se está editando
    editId = index
    // Configurar los valores del formulario con la información existente del empleado
    nombre.value = name
    edad.value = Age
    ciudad.value =City
    email.value = Email,
    telefono.value = Phone,
    postal.value = Post,
    fecha.value = Sdate
  // Cambiar el texto del botón de envío y el título del modal para indicar que se está editando
    submitBtn.innerText = "Editar"
    modalTitle.innerText = "Editar Empleado"
}


function deleteInfo(index){
    // Se muestra un cuadro de confirmación al usuario
    if(confirm("¿Quieres eliminar a este usuario?")){
        // Si el usuario confirma la eliminación:
        
        // Se utiliza el método splice para eliminar el elemento en el índice 'index' del array 'getData'
        getData.splice(index, 1)
         // Se actualiza el almacenamiento local con el nuevo array 'getData'
        localStorage.setItem("userProfile", JSON.stringify(getData))
         // Se llama a la función 'showInfo()' para actualizar la interfaz mostrando la información actualizada de los usuarios
        showInfo()
    }
}

//Enviar el formulario
form.addEventListener('submit', (e)=> {
   // Prevenir el comportamiento predeterminado del formulario (recargar la página)
    e.preventDefault()
 
 // Crear un objeto 'information' con la información del formulario   
 const information = {
       
        employeeName: nombre.value,
        employeeAge: edad.value,
        employeeCity: ciudad.value,
        employeeEmail: email.value,
        employeePhone: telefono.value,
        employeePost: postal.value,
        startDate: fecha.value
    }

    // Verificar si se está editando o agregando un nuevo usuario
    if(!isEdit){
        // Agregar la información del nuevo usuario al array 'getData'
        getData.push(information)
    }
    // Si se está editando, actualizar la información del usuario existente
    else{
        isEdit = false
        getData[editId] = information
    }
    // Almacenar el array 'getData' en el almacenamiento local
    localStorage.setItem('userProfile', JSON.stringify(getData))
    // Restablecer el texto del botón y el título del modal
    submitBtn.innerText = "Enviar"
    modalTitle.innerHTML = "Enviar al Form"
    // Actualizar la interfaz mostrando la información actualizada de los usuarios
    showInfo()
    // Restablecer el formulario
    form.reset()

})

//Boton de volver
  function goBackCerrar() {
        
    window.location.href = 'login.html';
}
function goToIndex() {
    window.location.href = "index.html";
}
function goBackEmpleados() {
    window.location.href = "index.html";
}