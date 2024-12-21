export default function formatDate(unixTime: number) {
    const date = new Date(unixTime);

    // Get day and determine suffix
    const day = date.getDate();
    const daySuffix =
        day === 1 || day === 21 || day === 31
            ? 'st'
            : day === 2 || day === 22
            ? 'nd'
            : day === 3 || day === 23
            ? 'rd'
            : 'th';

    // Get month name
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = monthNames[date.getMonth()];

    // Get year
    const year = date.getFullYear();

    return `${day}${daySuffix} ${month} ${year}`;
}