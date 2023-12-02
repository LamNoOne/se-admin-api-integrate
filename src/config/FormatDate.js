export default function formatDate(date) {
    const originalDate = new Date(date)
    const day = originalDate.getUTCDate()
    const month = originalDate.getUTCMonth() + 1 // Months are zero-based
    const year = originalDate.getUTCFullYear()
    const formattedDate = `${day}-${month < 10 ? "0" : ""}${month}-${year}`
    return formattedDate
}
