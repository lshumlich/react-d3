
A react version of some common D3 charts. This is sample code used to give examples
for students of a full stack program. 

## To Use

This code was written using a docker install of React. The docker React container can be found
at lshumlich/react-dev:16.8.6.

This uses D3 version  5.9.2.

To run using that container.

docker pull lshumlich/react-dev:16.8.6

docker run -it -p 3000:3000 --rm --name reactdev -v ~/docker/react/react-d3/src:/frontend/src lshumlich/react-dev:16.8.6


## More Documentation Required. 
Usefull docker commands:

- docker stop ?name?
- docker start ?name?
- docker exec -it ?name? /bin/bash
- docker ps -a
- docker container ls -a
- docker images
- docker container prune
- more
