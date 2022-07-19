export function getList() {
    return fetch('/api/user/mpivet-p')
    .then(data => data.json());
}