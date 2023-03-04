/**
 * 
 * @param {int} sec 
 * @returns `${hour}h ${min}min` format string
 */
export const secToString = (s) => {
    const hour = parseInt(s / 3600);
    const min = parseInt(s / 60) % 60;
    const sec = parseInt(s % 60);
    return `${hour}h ${min}m ${sec}s`;
}

/**
 * 
 * @param {int} sec 
 * @returns `${hour}h ${min}min` format string
 */
 export const secToStringKor = (s) => {
    const hour = parseInt(s / 3600);
    const min = parseInt(s / 60) % 60;
    const sec = parseInt(s % 60);
    return (hour ? `${hour}시간` : '')+(min ? `${min}분` : '')+(sec ? `${sec}초` : '');
}