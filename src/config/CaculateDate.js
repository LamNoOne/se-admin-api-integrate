export default function caculateDate (date) {
    const dayBefore = new Date(date)
    const dayCurrent = new Date()
    const offset = dayCurrent.getTime() - dayBefore.getTime()
    const dayOffset = offset / (1000 * 60 * 60 * 24)
    return Math.round(dayOffset)
}