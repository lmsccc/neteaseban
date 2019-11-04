export function getCollectMusic(){
    return localStorage.collectMusic ? JSON.parse(localStorage.collectMusic) : [];
}

export function setCollectMusic(music){
    let collectMusic = getCollectMusic();
    let index = collectMusic.findIndex( collectMusic => collectMusic.id === music.id);
    //如果音乐已经是在想看里面的了
    if(index > -1){
        collectMusic.splice(index, 1);
    }else{
        collectMusic.unshift(music);
    }
    localStorage.collectMusic = JSON.stringify(collectMusic);
    return collectMusic;
}