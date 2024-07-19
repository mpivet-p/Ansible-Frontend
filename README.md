This is an attempt at creating a frontend for Ansible to facilitate large clusters of
computers. It provides a simple but efficient UI to allow non-IT and IT users to run
Ansible playbooks or Ansible ad-hoc commands, while providing an easily understandable
feedback, as well as complete logs.


The backend is in Node.js and the Frontend in React.

## Actions
The "actions" are the buttons available with actions of the front, they allow an
easy configuration of the website with playbooks that don't require modification.

Example of an action:
```yml
---
taskName: reboot
route: "/api/reboot"
displayName: "Reboot"
playbook: false
clusterTask: true
command: "ansible -bm reboot"
```

## Usage
To run it, first copy the `example.env` as `.env`, in both **backend** and **frontend** folders. 

Then make sure you have `docker-compose` installed and run:
```bash
docker-compose up -d
```

To run it in production, you should edit the `docker-compose.yml` file and change ports and password for the mongodb root account.

## Architecture
The backend is used to:
- Authenticate the users
- Allow users management
- Provide the list and settings of "actions" available
- Execute the ansible or ansible-playbook commands

## Future

I would love to keep working on this project. I would probably redo it in Next.js, switch MongoDB with PostgreSQL, use
websockets to see progression of the task, improve the auth and global secutity.
