const computers = {
    "1": [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    "2": [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    "3": [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
}
const cluster_sym = 'c'
const row_sym = 'r';
const seat_sym = 's';
const exceptions = ["bocal-01", "bocal-02", "bocal-03"];

function group_by_row(hosts) {
    let result = [];
    for (const [cluster, rows] of Object.entries(computers)) {
        let tmp = [];
        for (let i = 0; i < rows.length; i++) {
            const regex = new RegExp(`${cluster_sym}${cluster}${row_sym}${i + 1}${seat_sym}\\d+$`);
            let matching = hosts.filter(host => regex.test(host));
            if (matching.length === rows[i]) {
                tmp.push(`${cluster_sym}${cluster}${row_sym}${i + 1}`);
            } else if (matching.length > 0) {
                result = result.concat(matching);
            }
        }
        if (tmp.length === rows.length)
            result.push(`${cluster_sym}${cluster}`);
        else
            result = result.concat(tmp);
    }
    result = result.concat(hosts.filter(x => exceptions.includes(x)))
    return (result);
}

export default group_by_row;