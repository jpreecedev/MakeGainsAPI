export function dateTwoWeeksAgo() {
    let date = new Date();
    date.setDate(date.getDate() - 14);
    return date;
};

export function toIsoDate(date: Date) {
    return date.toISOString().substring(0, 10);
};
