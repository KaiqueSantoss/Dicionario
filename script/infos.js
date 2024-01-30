const  btnSearch = document.querySelector('#btnSearch');
const  wordSearch  = document.querySelector('#wordSearch');


const mainContainer = document.querySelector('#mainContainer')
let foundError = false;
let oldSearch = false;
let wordDetail;



//play


wordSearch.addEventListener('click', (element)=>{
    if(element.target.value == "search..."){
        element.target.value = ''
    }if(foundError){
        btnSearch.classList.remove('btn-outline-danger');
        wordSearch.classList.remove('border-danger');
        btnSearch.classList.add('btn-outline-success');
        wordSearch.classList.add('border-success');
        foundError = false;
    }
})

btnSearch.addEventListener('click', async ()=>{
    if(wordSearch.value != "search..." && wordSearch.value != ''){
        searchingWord = wordSearch.value;
        wordDetail =  await API(searchingWord);

    
    if(oldSearch){
        let articleOld = document.querySelector("#containerDetail")
        let footerOld = document.querySelector("#footContainer")
        mainContainer.removeChild(articleOld)
        document.body.removeChild(footerOld)
 
        oldSearch = false
    }
    if(wordDetail != undefined){
        setDetails(wordDetail[0]);
        errorContent.classList.remove('d-block')
        errorContent.classList.add('d-none')
        }
}
})

wordSearch.addEventListener('input', (element)=>{
    if(element.target.value == "search..."){
        element.target.value = ''
    }if(foundError){
        btnSearch.classList.remove('btn-outline-danger');
        wordSearch.classList.remove('border-danger');
        btnSearch.classList.add('btn-outline-success');
        wordSearch.classList.add('border-success');
        foundError = false;
    }
    
})

btnSearch.addEventListener('click', async ()=>{
    if(wordSearch.value != "search..." && wordSearch.value != ''){
        searchingWord = wordSearch.value;
        wordDetail =  await API(searchingWord);
        if(wordDetail != undefined && !foundError){
            setDetails(wordDetail[0]);
            errorContent.classList.remove('d-block')
            errorContent.classList.add('d-none')
            }

    }
})

wordSearch.addEventListener("keypress", async (key)=>{
    if(wordSearch.value != "search..." && wordSearch.value != ''){
    if(key.key === "Enter"){
    
        searchingWord = key.target.value ;
        wordDetail =  await API(searchingWord);
        if(wordDetail != undefined){
        setDetails(wordDetail[0]);
        errorContent.classList.remove('d-block')
        errorContent.classList.add('d-none')
        }
    } 
    if(oldSearch){
        let articleOld = document.querySelector("#containerDetail")
        let footerOld = document.querySelector("#footContainer")
        mainContainer.removeChild(articleOld)
        document.body.removeChild(footerOld)
 
        oldSearch = false
    }
    if(wordDetail != undefined){
        setDetails(wordDetail[0]);
        errorContent.classList.remove('d-block')
        errorContent.classList.add('d-none')
        }
}
})

function setDetails(word){
let  infoWord = {
        word: word.word,
        phonetics: soundCheck(word),
        phonetic: phoneticsCheck(word),
        wikiLink: word.sourceUrls
    }
    let wordMeanings = meaningsCheck(word.meanings);
    if(!oldSearch){
    creatinInfosContauner(infoWord,wordMeanings);
    }
}

function creatinInfosContauner(word,detail){



        let containerDetail = document.createElement('article');
        containerDetail.id = 'containerDetail';

        let containerWordSearch = document.createElement('section');
    
        containerDetail.appendChild(containerWordSearch);
  
        let childrenWordSearch = document.createElement('div');
        childrenWordSearch.className = 'd-flex justify-content-between d-lg-inline-block';
        childrenWordSearch.id = 'containerSearchInfos';
        containerWordSearch.appendChild(childrenWordSearch);

        let contentInfos = document.createElement('div');
        childrenWordSearch.appendChild(contentInfos);

        let titleWordSearch = document.createElement('h1');
        titleWordSearch.className = 'display-3 fw-bold textCustom';
        titleWordSearch.innerText = word.word;

  

        contentInfos.appendChild(titleWordSearch);
        
        if(word.phonetic != undefined){
            let phoneticWord = document.createElement('p');
            phoneticWord.className = "text-success fs-3 fw-semi-bold";
            phoneticWord.innerText = word.phonetic;
            contentInfos.appendChild(phoneticWord);
            }

        let contentInfos2 = document.createElement('div');
        childrenWordSearch.appendChild(contentInfos2);

        if(word.phonetics !== undefined){

        let btnSound = document.createElement('button');
        btnSound.id = 'soundWord';
        btnSound.className = "btn bg-success bg-opacity-50 p-2 px-3 rounded-circle";
        btnSound.type = 'button';

        let audio = document.createElement('audio');
        audio.src = word.phonetics;
        btnSound.appendChild(audio);

        let iconBtnSound = document.createElement('i');
        iconBtnSound.className = "bi bi-play-fill fs-1 text-success";

        btnSound.appendChild(iconBtnSound);
        contentInfos2.appendChild(btnSound);

        btnSound.addEventListener('click',()=>{
            audio.play();
        })
        }
        mainContainer.appendChild(containerDetail);
        
        for(let i = 0;i < detail.length;i++){

            let articleContainer =  document.createElement('article');

            let divChildren = document.createElement('div');
            divChildren.className = 'd-flex flex-row align-items-center gap-1 my-4';

            let divTitleMean = document.createElement('div');
            divTitleMean.className ='mb-1';

            let titleMean = document.createElement('h2');
            titleMean.className = 'fw-bold fs-2 textCustom';
            titleMean.innerText = detail[i].partOfSpeech;

            let divhr = document.createElement('div');
            divhr.className = 'w-100';

            let hrTitle = document.createElement('hr');
            hrTitle.className ='w-100';

            let titleMeanings = document.createElement('h3');
            titleMeanings.className ='h3 text-secondary fw-normal';
            titleMeanings.innerText ='Meaning'

            let listMeanings = document.createElement('ul');
            listMeanings.className = 'list-group list-group-flush'

            //Container for synonyms e antonyms

            let sectionsAS = document.createElement('section');
            sectionsAS.className = 'd-flex container p-3 w-100 justify-content-between  border border-1 rounded justify-content-lg-evenly ';

            let synonymsContainer = document.createElement('div');
            
            let titleSynonyms = document.createElement('h5');
            titleSynonyms.className = 'text-secondary text-center'
            titleSynonyms.innerText = 'Synonuyms';
            
            let listSynonyms = document.createElement('ul');
            listSynonyms.className ='list-group list-group-flush text-center';
            

            let antonymsContainer = document.createElement('div');
            
            let titleAntonyms = document.createElement('h5');
            titleAntonyms.className = 'text-secondary text-center'
            titleAntonyms.innerText = 'Antonyms';
            
            let listAntonyms = document.createElement('ul');
            listAntonyms.className ='list-group list-group-flush text-center';

            divChildren.appendChild(titleMean)
            divChildren.appendChild(divTitleMean)
    
            divhr.appendChild(hrTitle)
            divChildren.appendChild(divhr)
    
            articleContainer.appendChild(divChildren)
        
            containerDetail.appendChild(articleContainer)
    
            containerDetail.appendChild(titleMeanings)
            containerDetail.appendChild(listMeanings)


            if(detail[i].synonyms != 0 || detail[i].antonyms != 0){
                containerDetail.appendChild(sectionsAS)
             }   


            for(let j = 0; j < detail[i].definitions.length;j++ ){
                
                let itemList = document.createElement('li');
                itemList.className = 'list-group-item ';

                let itemListContainer = document.createElement('div');
                itemListContainer.className = 'd-flex align-items-center';

                let iconList = document.createElement('i');
                iconList.className = 'bi bi-dot fs-1  text-success';

                let contentItem = document.createElement('span');
                contentItem.className = 'fw-semibold';
                contentItem.innerText = detail[i].definitions[j].definition;
                itemListContainer.appendChild(iconList);
                itemListContainer.appendChild(contentItem);
                itemList.appendChild(itemListContainer);
                listMeanings.appendChild(itemList);

            }

            if(detail[i].synonyms != 0){

                sectionsAS.appendChild(synonymsContainer);
                synonymsContainer.appendChild(titleSynonyms);
                synonymsContainer.appendChild(listSynonyms);      

                for(let k = 0;k < detail[i].synonyms.length;k++ ){

                    let listItemSyn = document.createElement('li');
                    listItemSyn.innerText = detail[i].synonyms[k];
                    listItemSyn.classList = 'list-group-item fw-semibold text-success';
                    listSynonyms.appendChild(listItemSyn);
    
    
                }



                if(detail[i].antonyms != 0){
        
                    sectionsAS.appendChild(antonymsContainer);
                    antonymsContainer.appendChild(titleAntonyms);
                    antonymsContainer.appendChild(listAntonyms);      
    
                    for(let k = 0;k < detail[i].antonyms.length;k++ ){
    
                        let listItemAnt = document.createElement('li');
                        listItemAnt.innerText = detail[i].antonyms[k];
                        listItemAnt.classList = 'list-group-item fw-semibold text-success';
                        listAntonyms.appendChild(listItemAnt);
        
        
                    }
                }
           
            }
          }

       
        
    let footContainer = document.createElement('footer');
    footContainer .className = 'd-flex justify-content-center'
    footContainer.id = 'footContainer';
    
    
    let contentFooter = document.createElement('div');
    contentFooter.className = 'd-flex gap-1';

    let linkTitle =  document.createElement('span');
    linkTitle.className = 'fw-semibold textCustom';
    linkTitle.innerText = 'source';

    let linkOne = document.createElement('a');
    linkOne.className = 'link-underline link-underline-opacity-50 link-success';
    linkOne.href = word.wikiLink[0];
    linkOne.innerText = word.wikiLink[0];
    linkOne.target = '_blank'

    let linkTwo = document.createElement('a');
    linkTwo.className = 'bi bi-box-arrow-up-right btn btn-sm btn-outline-success';
    linkTwo.target = '_blank'
    linkTwo.href = word.wikiLink[0];

    contentFooter.appendChild(linkTitle)
    contentFooter.appendChild(linkOne )
    contentFooter.appendChild(linkTwo )
    footContainer.appendChild(contentFooter)
    document.body.appendChild(footContainer)
        

    let textCustom = document.querySelectorAll('.textCustom')

    ntrMode.addEventListener('click',()=>{
        textCustom.forEach(item=>{
            if(ntrOn){
            item.classList.add('text-white')  
            }else if(!ntrOn){
            item.classList.remove('text-white')
            }
        })
       })

    foundError = false;
    oldSearch = true;

 




}




function  soundCheck(word){
    for(let i = 0 ; i < word.phonetics.length;i++){
        if(word.phonetics[i].audio != ''){
            return word.phonetics[i].audio
        }
    }
}

function  phoneticsCheck(word){
    for(let i = 0 ; i < word.phonetics.length;i++){
        if(word.phonetics[i].text != undefined){
          return word.phonetics[i].text;
        }    
    }
}

function meaningsCheck(meanings){
    let meaningsArray = [];
    meaningsArray.push()
    for(let i = 0 ; i < meanings.length;i++){
           meaningsArray.push({
           partOfSpeech:meanings[i].partOfSpeech,
           synonyms:meanings[i].synonyms,
           antonyms:meanings[i].antonyms,
           definitions:meanings[i].definitions
        })
    }
    return meaningsArray;
}

