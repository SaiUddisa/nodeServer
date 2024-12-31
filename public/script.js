//to get all data from the DB
async function fetchData(){

    let response = await fetch('/fetchData',{'method' : 'POST'});
    let data  = await response.json();
    console.log("this is the data received from the Database",data);

   let html = '<table border=1> <thead> <th>Name</th><th>Age</th></thead> <tbody> ';
   for( let user of data){
    html +=`<tr><td>${user.name}</td><td>${user.age}</td></tr>`;
   }
     html +='</tbody></table>';

    document.getElementById('dbdata').innerHTML = html;
}