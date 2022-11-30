const group_by_row = (hosts) => {
    if (hosts.length == 0)
        return ([]);
    let new_hosts = [];
    const row = hosts[0].slice(0, -2);
    const regex = new RegExp(row + (row === "bocal-" ? "0[1-3]" : "s[1-6]"))

    let matching = hosts.filter(host => regex.test(host));
    if (matching.length == 6 || (row === "bocal-" && matching.length == 3)) {
        new_hosts.push(row);
    } else {
        new_hosts = matching;
    }
    matching.map(item => hosts.splice(hosts.indexOf(item), 1))

    return (new_hosts.concat(group_by_row(hosts)));
}

export default group_by_row;