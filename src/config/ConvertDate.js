export default function convertDate(inputDate) {
    var dateObject = new Date(inputDate);

    var monthNames = [
        "January", "February", "March",
        "April", "May", "June",
        "July", "August", "September",
        "October", "November", "December"
    ];

    var monthFullName = monthNames[dateObject.getMonth()];

    var year = dateObject.getFullYear();

    var result = monthFullName + " " + year;

    return result;
}
