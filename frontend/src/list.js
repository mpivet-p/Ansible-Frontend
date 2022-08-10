export function getList() {
    return fetch('http://localhost:5000/api/user/mpivet-p')
    .then(data => data.json());
}
