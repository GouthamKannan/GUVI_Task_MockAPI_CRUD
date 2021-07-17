let APIUrl = "https://60f2db906d44f300177887c6.mockapi.io/Users/";

async function getData(){
    document.getElementById("tbody").innerHTML = "";

    //Get data
    let repsonse = await fetch(APIUrl);
    let data = await repsonse.json();

    data.forEach(element => {
        document.getElementById("tbody").innerHTML += `
        <tr>
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.email}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteData(${element.id})">Delete</button>
            </td>
            <td>
                <button class="btn btn-info" onclick="updateData(this)">Update</button>
            </td>
        </tr>
        `;
    });
}

async function addOrUpdateData(){
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    document.getElementById("form").reset();
    if(id === ""){

        //Add data
        await fetch(APIUrl,{
            method: "POST",
            headers: {  
                "Content-Type":"Application/json" 
            },
            body: JSON.stringify({name, email})
        })
        getData();

    }
    else{

        //Update data
        await fetch(APIUrl+id,{
            method: "PUT",
            headers: {  
                "Content-Type":"Application/json" 
            },
            body: JSON.stringify({name, email})
        })
        document.getElementById("id").value = "";
        document.getElementById("submit-button").innerHTML = "Add";
        getData();
    }
    return false;
}

async function deleteData(userId){
    if(confirm(`Record with ID ${userId} will be deleted`)){

        //Delete data
        await fetch(APIUrl+userId,{
            method: "DELETE",
            headers: {  
                "Content-Type":"Application/json" 
            }
        })
        getData()

    }
}

async function updateData(element){
    data = element.parentNode.parentNode.getElementsByTagName("td")
    let id = data[0].innerHTML;
    let name = data[1].innerHTML;
    let email = data[2].innerHTML;
    document.getElementById("id").value = id;
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("submit-button").innerHTML = "Update";
}

getData()