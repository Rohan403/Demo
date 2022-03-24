var Name= document.getElementById("name");
var price= document.getElementById("price");
var categoryword= document.getElementById("category");
var updateIndex;
if(localStorage.getItem("Employeedetails")==null){
   var Container=[];
}
else{
    Container=JSON.parse(localStorage.getItem("Employeedetails"));
    displayAll();
}


function addDetails(){
    var details= {
        name:Name.value,
        price:price.value,
        category:categoryword.value,
    }
    if(!validate(details)){
        return;
    }
    Container.push(details);
    clearForm();
    localStorage.setItem("Employeedetails",JSON.stringify(Container));
    console.log(Container);
    display(details,Container.length-1);
    //console.log(localStorage.)
}
function validate(product){
    let nameEach=/^[A-Za-z ]{3,}$/;
    let priceEach=/^[1-9][0-9]*$/;
    let categoryEach=/^[A-Za-z ]{1,50}$/;
    let validForm=true;
    
    if(!nameEach.test(product.name)){
        document.getElementById( "invalidName").innerHTML="invalid name ";
        validForm= false;
    }else {
        document.getElementById( "invalidName").innerHTML="";
    }
    if(!priceEach.test(product.price)){
        document.getElementById( "invalidPrice").innerHTML="invalid price ";
        validForm= false;
    }else {
        document.getElementById( "invalidPrice").innerHTML="";    
    }
    if(!categoryEach.test(product.category)){
        document.getElementById( "invalidCate").innerHTML="invalid category Name";
        validForm= false;
    }else {
        document.getElementById( "invalidCate").innerHTML="";
    }
 
    
return validForm;
}
function clearForm(){
    Name.value="";
    price.value="";
    categoryword.value="";
}

function display(data,index){
    document.getElementById("tableBody").innerHTML+=`
    <tr class="my-4"> 
    <td>
      `+index+`
    </td>
    <td>`+data.name+`</td>
    <td>`+data.price+`</td>
    <td>`+data.category+`</td>
    <td><button onclick="updateButton(`+index+`)">Update</button></td>
    <td><button  onclick="deleteProduct(`+index+`)">Delete</button></td>
</tr>`
}
function updateButton(index){
    Name.value= Container[index].name;    
    price.value= Container[index].price;
    categoryword.value= Container[index].category;
    document.getElementById("cancelButton").style="display: inline-block !important;";
    document.getElementById("addButton").disabled=true;

    
    document.getElementById("updateButton").style="display: inline-block !important; ";
    updateIndex=index;
}

function cancelUpdate (){
    document.getElementById("cancelButton").style="display: none;";

    document.getElementById("updateButton").style="display: none;";
    document.getElementById("addButton").disabled=false;

    updateIndex=null;
    clearForm();

}
 function updateData(){
    Container[updateIndex].name=Name.value;
    Container[updateIndex].price=price.value;
    Container[updateIndex].category=categoryword.value;
    localStorage.setItem("Employeedetails",JSON.stringify(Container));   
    clearForm();
    cancelUpdate();
    displayAll();
 }
function displayAll(){

    document.getElementById("tableBody").innerHTML='';
    for(var i=1;i<Container.length;i++){
        display(Container[i], i);
    }
}


function deleteProduct(index){
    Container.splice(index,1);
    localStorage.setItem("Employeedetails",JSON.stringify(Container));   
    displayAll();
}
function searchProducts(temp){
    var cartoona='';
    for(var i=0;i<Container.length;i++){
        if(Container[i].name.toLowerCase().includes(temp.toLowerCase() )){
            var product=Container[i];
            cartoona+=`
    <tr class="my-4"> 
    <td>
      `+i+`
    </td>
    <td>`+product.name+`</td>
    <td>`+product.price+`</td>
    <td>`+product.category+`</td>
    <td>`+product.desc+`</td>
    <td><button class=" btn btn-outline-danger" onclick="updateButton(`+i+`)">Update</button></td>
    <td><button class=" btn btn-outline-danger" onclick="deleteProduct(`+i+`)">delete</button></td>
</tr>`
        }
    }
    document.getElementById("tableBody").innerHTML=cartoona;

    
}