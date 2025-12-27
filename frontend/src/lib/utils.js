export function formatDate(date) {
    return date.toLocaleDateString("es-MX", {
        day: 'numeric',
        month: 'short',     
        year: 'numeric'
    });
}
