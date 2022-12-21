let title=document.getElementById('title');
    price=document.getElementById('price');
    taxes=document.getElementById('taxes');
    ads=document.getElementById('ads');
    discount=document.getElementById('discount');
    count=document.getElementById('count');
    catogery=document.getElementById('catogery');
    total=document.getElementById('total');
    input=document.getElementsByClassName ('.inputs');
    btnCreat=document.getElementById('btnCreat');
    tbody=document.getElementById('tbody');
    deleteAll=document.getElementById('deleteAll');
    mood='create';
    let tmp;
  

//Get Total //////

function getTotal (){
    if(price.value != ''){
    let result=(+price.value + +taxes.value + +ads.value)- +discount.value;
    total.innerHTML= result;
    total.style.background='#040';
}else{
    input.value= '';
    total.style.background ="#9a2f43";
}
}
/////////create////

let dataPro ;
  if(localStorage.products !=null){
    dataPro=JSON.parse(localStorage.products)
   }else{
    dataPro = [];
}

btnCreat.onclick= function(){
    let newPro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        catogery:catogery.value.toLowerCase(),
        }
     if (title.value !=''&& price.value !=''&&catogery.value!=''&&newPro.count<200){
            if(mood==='create'){
               if(newPro.count>1){
                    for(let i=0;i<newPro.count;i++){
                     dataPro.push(newPro);

            }
             
        }else{
            dataPro.push(newPro);
        }

    }else{
        dataPro[tmp]=newPro;
        mood = "create";
        btnCreat.innerHTML="create";
        count.style.display="block";

    
    }
        dataPro.push(newPro);
        localStorage.setItem("products", JSON.stringify(dataPro));
        clearInputs()
        showData()
  
}
}
/////clrae inputs ////
function clearInputs(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value= '';
    total.innerHTML='';
    count.value='';
    catogery.value= '';

}
/////////show Data///////////
function showData(){
    getTotal ()
    let table='';
    for(let i =0 ;i<dataPro.length;i++){
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].catogery}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
            </tr>

                `
            }
            tbody.innerHTML=table;
            if (dataPro.length>0){
                deleteAll.innerHTML=`
                <button onclick="delAll()">Delete All (${dataPro.length})</button>
                
                `
            }else{
                deleteAll.innerHTML='';

            }

    
 }showData();

 //////////delet item/////////
 function deleteItem(i){
    dataPro.splice(i,1);
    localStorage.products=JSON.stringify(dataPro);
    showData();
}
 //////////////delete All//////
 function delAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}
/////////update/////
function updateData(i){
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    discount.value=dataPro[i].discount;
    getTotal ();
    count.style.display="none"
    catogery.value=dataPro[i].catogery;
    btnCreat.innerHTML="Update";
    mood=update;
    tmp=i;
    scroll({
        top:0,
        behavior:"smooth",

    })
 }
  /////////////search///////
  let searchMood="title";
  function getSearchMood(id){
    search=document.getElementById("search");
    if(id=="btnSearch-title"){
        searchMood ="title";
       
    
    }else{
        searchMood = "catogery";
      

    }
         search.placeholder="search by" + searchMood;
         search.focus();
         search.value= '';
         showData();


}

 function searchData(value){
    let table='';
    for(let i=0; i<dataPro.length;i++){
    if(searchMood=="title"){
         if(dataPro[i].title.includes(value)){
                    table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].catogery}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
                    </tr>
                        `
            }
        }
    
    else{
         if(dataPro[i].catogery.includes(value)){
        
   
   }
    tbody.innerHTML=table;
}
}
}