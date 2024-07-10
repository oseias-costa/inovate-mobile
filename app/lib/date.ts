
const includeZero = (num: number) => (num < 10 ? `0${num}` : num);

export const formatDate = (dateValue: Date) =>  {
    const date = new Date(dateValue);
    const day = includeZero(date.getDate());
    const month = includeZero(date.getMonth() + 1);
    const year = date.getFullYear();
    const format = `${day}-${month}-${year}`;

    return format
}