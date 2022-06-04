function getSelected() {
    //Gathering all selected computers and creating an array with their names
    let selected_elems = document.getElementsByClassName("selected");
    let stations = [];
    for (let i = 0; i < selected_elems.length; i++) {
        stations.push(selected_elems[i].id);
    }
    return (stations);
}

export default getSelected;