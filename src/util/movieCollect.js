export function getWantToSeeMovie(){
    return localStorage.collectMovie ? JSON.parse(localStorage.collectMovie) : [];
}

export function setWantToSeeMovie(movie){
    let wantToSeeMovie = getWantToSeeMovie();
    let index = wantToSeeMovie.findIndex( wantMovie => wantMovie.id === movie.id);
    //如果电影已经是在想看里面的了
    if(index > -1){
        wantToSeeMovie.splice(index, 1);
    }else{
        wantToSeeMovie.unshift(movie);
    }
    localStorage.collectMovie = JSON.stringify(wantToSeeMovie);
    return wantToSeeMovie;
}