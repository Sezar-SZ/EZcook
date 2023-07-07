export function formatTime(totalMinutes: number) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const result = [];
    if (hours) result.push(`${hours} ساعت`);
    if (minutes) result.push(`${minutes} دقیقه`);

    return result.join(" و ");
}
