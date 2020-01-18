export function formatDate(date){
    if(!date){
        return;
    }

    const dateArray = date.split(' ');
    const newDateArray = [dateArray[0] + ",", dateArray[1], dateArray[2] + ",", dateArray[3]];

    return newDateArray.join(' ');
}