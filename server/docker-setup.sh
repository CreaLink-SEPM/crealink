docker rm -f be-container

docker rmi -f be-server

docker build -t be-server .

docker run -d -p 5000:5000 --name=be-container be-server
