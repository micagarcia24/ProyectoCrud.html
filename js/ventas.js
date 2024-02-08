var form = document.getElementById("myForm"),
            producto = document.getElementById("producto"),
            precio = document.getElementById("precio"),
            cantidad = document.getElementById("cantidad"),
            descripcion = document.getElementById("descripcion"),
            userInfo = document.getElementById("data"),
            modal = document.getElementById("userForm"),
            modalTitle = document.querySelector("#userForm .modal-title"),
            newProd = document.querySelector(".newprod"),
            PrecioTotal = document.getElementById("precioTotal");

        let getData = localStorage.getItem('Productos') ? JSON.parse(localStorage.getItem('Productos')) : []

        let isEdit = false,
            editId;

        showInfo();

        newProd.addEventListener('click', () => {
            modalTitle.innerText = "Llenar el Formulario";
            isEdit = false;
            form.reset();
        });

        function sumarColumnaTotal() {
            let suma = 0;
            getData.forEach((item) => {
                const totalString = item.total || "0";
                const valorNumerico = parseFloat(totalString.replace("$", "")) || 0;
                suma += valorNumerico || 0;
            });
            PrecioTotal.innerText = "Precio total: $" + suma.toFixed(2);
        }

        function showInfo() {
            document.querySelectorAll('.employeeDetails').forEach(info => info.remove());
            getData.forEach((element, index) => {
                let createElement = `<tr class="employeeDetails">
                    <td>${index + 1}</td>
                    <td>${element.ProductoName}</td>
                    <td>${element.ProductoCant}</td>
                    <td>${element.ProductoPrec}</td>
                    <td>${element.ProductoDesc}</td>
                    <td>${element.total}</td>
                    <td>
                    <button class="btn btn-primary" onclick="editInfo(${index}, '${element.ProductoName}', '${element.ProductoCant}', '${element.ProductoPrec}', '${element.ProductoDesc}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
                    </td>
                </tr>`;

                userInfo.innerHTML += createElement;
            });
        }

        function editInfo(index, name, cant, preci, despc) {
            isEdit = true;
            editId = index;
            producto.value = name;
            cantidad.value = cant;
            precio.value = preci;
            descripcion.value = despc;
            modalTitle.innerText = "Editar el Formulario";
        }
function deleteInfo(index){
    if(confirm("¿Quieres eliminar a este producto?")){
        getData.splice(index, 1)
        localStorage.setItem("Productos", JSON.stringify(getData))
        showInfo()
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const productInfo = {
        ProductoName: producto.value,
        ProductoCant: cantidad.value,
        ProductoPrec: precio.value,
        ProductoDesc: descripcion.value,
        total: "$" + (precio.value * cantidad.value).toFixed(2),
    };

    if (!isEdit) {
        // Agregar un nuevo producto
        getData.push(productInfo);
    } else {
        // Editar el producto existente
        getData[editId] = productInfo;
        isEdit = false; // Restablecer el modo de edición
    }

    // Actualizar o agregar en el almacenamiento local
    localStorage.setItem('Productos', JSON.stringify(getData));

    // Actualizar el título del modal
    modalTitle.innerHTML = isEdit ? "Editar Producto" : "Agregar Producto";

    // Actualizar la tabla
    showInfo();

    // Restablecer el formulario
    form.reset();

    // Actualizar el precio total
    sumarColumnaTotal();
});
//Cerrar Sesion
    function goBackTologin() {
        
        window.location.href = 'login.html';
    }
   