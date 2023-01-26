FROM node:18.6

RUN apt-get update && apt-get install -y\
	ansible\
	python3\
	python3-pip

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

RUN pip install virtualenv
RUN python3 -m virtualenv scripts/venv && . scripts/venv/bin/activate && pip install -r scripts/requirements.txt && deactivate

EXPOSE 5000

ENV NODE_ENV=production
RUN mv ansible /etc/ && chmod 0600 /etc/ansible/ansible.key

ENTRYPOINT ["node", "index.js"]
