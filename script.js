 let items = JSON.parse(localStorage.getItem("items")) || [];

// Display saved items when page loads
displayItems();

function addItem() {

    let name = document.getElementById("itemName").value;
    let category = document.getElementById("category").value;
    let quantity = Number(document.getElementById("quantity").value);

    if (name === "" || category === "" || document.getElementById("quantity").value === "") {
        alert("Please fill all fields");
        return;
    }

    items.push({
        name: name,
        category: category,
        quantity: quantity
    });

    displayItems();
    saveItems();
    clearForm();

    document.getElementById("itemName").value = "";
    document.getElementById("category").value = "";
    document.getElementById("quantity").value = "";
}

function displayItems() {

    let table = document.getElementById("inventoryTable");

    table.innerHTML = "";

    let low = 0;
    let out = 0;

    items.forEach((item, index) => {

        let status = "In Stock";

        if (item.quantity <= 5 && item.quantity > 0) {
            status = "Low Stock";
            low++;
        }

        if (item.quantity === 0) {
            status = "Out of Stock";
            out++;
        }

        table.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.quantity}</td>
            <td>${status}</td>
            <td>
                <button onclick="deleteItem(${index})">Delete</button>
                <button onclick="editItem(${index})">Edit</button>
            
                </td>
        </tr>
        `;
    });

    document.getElementById("totalItems").innerText = items.length;
    document.getElementById("lowStock").innerText = low;
    document.getElementById("outStock").innerText = out;

    localStorage.setItem("items", JSON.stringify(items));
}

function deleteItem(index) {
    items.splice(index, 1);
    saveItems();
    displayItems();
}
function editItem(index){
    document.getElementById("itemName").value = items[index].name;
    document.getElementById("category").value = items[index].category;
    document.getElementById("quantity").value = items[index].quantity;
    items.splice(index,1);
    saveItems();
    displayItems();
}

function searchItems(){
    let input = document
        .getElementById("searchBox")
        .value
        .toLowerCase();
    let rows = document.querySelectorAll("#inventoryTable tr");
    rows.forEach(row=>{
        let text = row.innerText.toLowerCase();
        if(text.includes(input)){
            row.style.display="";
        }
        else{
            row.style.display="none";
        }
    });
}

function saveItems(){
    localStorage.setItem(
        "items",
        JSON.stringify(items)
    );
}

function clearForm(){
    document.getElementById("itemName").value="";
    document.getElementById("category").value="";
    document.getElementById("quantity").value="";
    }

function clearInventory(){
    if(confirm("Delete all inventory?")){
        items=[];
        saveItems();
        displayItems();
    }
}
const darkBtn = document.getElementById("darkModeBtn");
if (darkBtn) {
    darkBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });
}
