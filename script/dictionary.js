
const errorContent = document.querySelector("#error")

async function API(word){

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    const response = await fetch(url);
    fetch(url).then(res=>res.json()).then(data=>console.log(data))
    // console.log(response.status === 404 && !foundError)

    if(!response.ok){ 

       if(response.status === 404 && !foundError){
            btnSearch.classList.remove('btn-outline-success')
            errorContent.classList.remove('d-none')
            wordSearch.classList.remove('border-success')
            btnSearch.classList.add('btn-outline-danger')
            wordSearch.classList.add('border-danger')
            errorContent.classList.add('d-block')
            foundError = true
        }   
    

        if(response.status === 429){
            foundError = true;
        }
        if(response.status !== 200){
            return
        }
    }   
    return await response.json()
}




