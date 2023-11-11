const getCurrentLang = ()=>{
    let search = window.location.search.substring(1);//?lang=latyn&ss=22&nur=bo
    let currentLang = '';
    if(search){
        let sArr = search.split('&');//=>['lang=latyn','ss=22','nur=bol']
        for(let param of sArr){
            let pArr = param.split('=');//=> ['lang','latyn']
            if(pArr.length!=2){
                continue;
            }
            let pKey = pArr[0];
            if(pKey == 'lang'){
                currentLang = pArr[1];
                break;
            }
        }
    }
    return currentLang?currentLang:'kz';
}
const replaceSearch = (pK,pV)=>{
    let search = window.location.search.substring(1);
    if(!search){
        return '?'+pK+'='+pV;
    }
    let sArr = search.split('&');
    let newSearch = '';
    let hasKey = false;
    for(let param of sArr){
        let pArr = param.split('=');//=> ['lang','latyn']
        if(pArr.length!=2){
            continue;
        }
        if(pArr[0].toLowerCase() == pK.toLowerCase()){
            newSearch += (newSearch?'&':'') + pArr[0]+'='+pV;
            hasKey = true;
        }else{
            newSearch += (newSearch?'&':'') + pArr[0]+'='+ pArr[1];
        }
    }
    if(!hasKey){
        newSearch += (newSearch?'&':'') + pK+'='+pV;
    }
    return "?"+newSearch;
};

const chageLanguageValue = ()=>{
    let localArr = document.querySelectorAll('[data-localkey]');
    localArr.forEach((el)=>{
       let localKey = el.getAttribute('data-localkey');//ls_Home
       let currentLang = getCurrentLang();
       let localValue = window.words[localKey][currentLang];
       el.innerText = localValue;
    });
};

const getWords = async ()=>{
   let response = await fetch('https://www.sozdikqor.org/api/query/all',{'method':'POST'});
   window.words = await response.json();
   chageLanguageValue();
}

document.addEventListener('DOMContentLoaded',function(){ //Domcument Object Model Content Loaded!
    const lang = document.querySelector('#languages');
    let currentLang = getCurrentLang();
    lang.value = currentLang; 

    lang.addEventListener('change',function(){
       let selectedValue = this.value;
       let url = window.location.protocol+"//"+window.location.host;
        window.location.href = url + window.location.pathname + replaceSearch('lang',selectedValue);
    });

     getWords();


     const btnBars = document.querySelector('.menu-bars');
     btnBars.addEventListener('click',()=>{
        const siteNav = document.querySelector('#site-nav');
        const dropdownDiv = document.querySelector('.dropdown-div');
        if(!dropdownDiv.querySelector('ul')){
            const cloned = siteNav.cloneNode(true);
            cloned.className = '';
            cloned.id= '';
            dropdownDiv.appendChild(cloned);
        }
        //dropdownDiv.classList.toggle('hidden');
        let divHeight =  dropdownDiv.style.height;
        if(parseInt(divHeight)){
            dropdownDiv.style.height = '0';
        }else{
            dropdownDiv.style.height = '130px';
        }
       
        // let display = dropdownDiv.style.display;
        // if(!display){
        //     dropdownDiv.classList.add('slide-bottom');
        // }
     });

});