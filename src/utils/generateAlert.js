function generateAlert(alertType, text) {
    const elem = document.createElement("div");
    elem.innerHTML = text;
    elem.classList.add("alert")
    if (alertType != null) {
        elem.classList.add(alertType);
    }
    setTimeout(() => {elem.remove();}, 5000);
    document.getElementById('notifications-container').appendChild(elem);
}

export default generateAlert;