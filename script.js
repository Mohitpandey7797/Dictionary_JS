let input = document.querySelector('#input')
let searchBtn = document.querySelector('#search')
let notFound = document.querySelector('.not_found')
let defBox = document.querySelector('.def')
let audioBox = document.querySelector('.audio')
let loading = document.querySelector('.loading')
let word
searchBtn.addEventListener('click',function(e){
    e.preventDefault()
    

    // Clear data
    audioBox.innerHTML = ''
    notFound.innerText = ''
    defBox.innerText = ''
    //Get input data

     word = input.value


    //Call api get data
    if(word===''){
        alert("word is required")
        return;
    }
    getData(word)
})

async function getData(word){
    loading.style.display = 'block'
    //Ajax call
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)

    const data = await response.json()
    //if empty result
    if(!data.length){
        loading.style.display = 'none'
        notFound.innerText = 'No result found'
        return;
    }


   
  


    // Result found
    loading.style.display = 'none'
    const definition = data[0].meanings[0].definitions[0].definition;
    defBox.innerText = definition

    //Sound name
    let soundSrc = data[0].phonetics[0].audio
    let aud = document.createElement('audio')
    aud.src = soundSrc
    aud.controls = true
    audioBox.appendChild(aud)
   
}
