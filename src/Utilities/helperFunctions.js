export const currentStateColor = (state) => {
    if(state === "DELIVERED"){
        return '#35B600'
    }else if (state === "CANCELLED"){
        return '#F4050D'
    }else if (state === 'DELIVERED_TO_SENDER'){
        return '#F9BA02'
    }
}

export const dateFormatting = (deliverDate) => {
    const date = new Date(deliverDate);

    const formattedDateString = date.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });


    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const time = date.toLocaleTimeString()
    // Format the result as "YYYY/MM/DD"
    const fullYearFormatted = `${year}/${month}/${day}`;

    return {formattedDateString , fullYearFormatted , time};
}

export const castTransitEvents = (data) => {

    const rows = data.map((row) => {
        return {
            ...dateFormatting(row.timestamp),
            details : row.state.replace(/_/g, " ")
        }
    })
    return rows
}