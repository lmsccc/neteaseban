export  function handleLyricData(lyricData){
    //分割每一句歌词，包括时间
    let arr = lyricData.split('\n');
    //处理时间
    let timeReg = /^\[.*\](.*)/;
    let result = [];
    arr.forEach(item => {
        let match = item.match(timeReg);
        let time = match ? match[0].substr(1,8) : "";
        let minute = time.substr(0, 2);
        let second = time.substr(3, 2);
        let ms = time.substr(6, 2);

        result.push({
            time,
            ms: parseInt(minute)*60*1000 + parseInt(second)*1000 + parseInt(ms) *10,
            content: match? match[1] : ""
        })
    });
    return result;
}