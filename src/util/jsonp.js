export function getJson(url){
    return new Promise((resolve, reject) => {
        if(url.includes('?')){
            url += '&callback=responHeader';
        }else{
            url += '?callback=respnHeader';
        }

        const script = document.createElement('script');
        window.responHeader = function(json){
            try{
                resolve(json);
            }finally{
                script.parentNode.removeChild(script);
            }
        }
        script.setAttribute('src',url);
        document.body.appendChild(script);
    });
    
}