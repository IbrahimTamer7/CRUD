
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var srchbtn = document.getElementById("mainbtn");
var regex = /^[A-Z][a-z]{3,9}$/;
var errors=``;

var productsContainer;
if(localStorage.getItem('productsList') == null)
{
    productsContainer = [];
}
else
{
    productsContainer = JSON.parse(localStorage.getItem('productsList'));
    displayProducts();
}

function addProduct()
{
    if(validateProducts() == true)
    {
        if(srchbtn.innerText == "Update")
        {
            var product = {
                name: productName .value,
                price: productPrice .value,
                category: productCategory .value,
                description: productDesc .value
            };
            productsContainer.splice(i , 1 , product);
            localStorage.setItem('productsList', JSON.stringify(productsContainer))
            clearForm()
            srchbtn.innerText = "Add Product"
            displayProducts()
        }
        if(checkProduct() == true)
        {
            var product = {
                name: productName .value,
                price: productPrice .value,
                category: productCategory .value,
                description: productDesc .value
            };
            productsContainer.push(product);
            localStorage.setItem('productsList', JSON.stringify(productsContainer))
            clearForm()
        }
        displayProducts()
    }

}

function displayProducts(){

    var cartoona =``;

    for (var i = 0; i < productsContainer.length; i++) {

        cartoona +=`<tr><td>${i+1}</td>
        <td>${productsContainer[i].name}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].category}</td>
        <td>${productsContainer[i].description}</td>
        <td><button onclick="updateProducts(${i})" class="btn btn-outline-success">Update</button></td>
        <td><button onclick="deleteProducts(${i})" class="btn btn-outline-danger">Delete</button></td></tr>`;    
    }

    document.getElementById("tableBody").innerHTML = cartoona;

}

function clearForm()
{
    productName.value="";
    productPrice.value="";
    productDesc.value="";
    productCategory.value="";
}

function checkProduct(){    
    if(productName.value != '' && productPrice.value != '' && productCategory.value != '' && productDesc.value != '')
    {
        return true;
    }
    else
    {
        return false;
    }
}

function deleteProducts(productIndex){
    productsContainer.splice(productIndex , 1);
    localStorage.setItem("productsList",JSON.stringify(productsContainer))
    displayProducts();
}

function searchProducts(searchTerm){

    var cartoona = ``;

    for (var i = 0; i < productsContainer.length; i++) {

        if (productsContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase())==true || productsContainer[i].price.toLowerCase().includes(searchTerm.toLowerCase())==true || productsContainer[i].category.toLowerCase().includes(searchTerm.toLowerCase())==true || productsContainer[i].description.toLowerCase().includes(searchTerm.toLowerCase())==true) {
        
            cartoona +=`<tr><td>${i+1}</td>
        <td>${productsContainer[i].name}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].category}</td>
        <td>${productsContainer[i].description}</td>
        <td><button onclick="updateProducts(${i})" class="btn btn-outline-success">Update</button></td>
        <td><button onclick="deleteProducts(${i})" class="btn btn-outline-danger">Delete</button></td></tr>`;
        }
        else
        {
            console.log("not Avaliable")
        }
    }

    document.getElementById("tableBody").innerHTML = cartoona;
}

function updateProducts(productIndex)
{
    i = productIndex;
    productName.value = productsContainer[productIndex].name;
    productPrice.value = productsContainer[productIndex].price;
    productCategory.value = productsContainer[productIndex].category;
    productDesc.value = productsContainer[productIndex].description;
    
    srchbtn.innerText = "Update"
}

function validateProducts(){
    if(regex.test(productName.value) == true)
    {
        return true;
    }
    else
    {
        alert('First letter cap then small')
        return false;
    }
}
