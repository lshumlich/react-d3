
# Welcome

This is a ReactJS version of some common D3 charts. This is sample code used to get learners excited about including visualization in their projects. It is intended for the EvolveU students of the Full Stack Developer program.

There are two ways to follow along in this lecture: using Docker or using a fresh install of React. The preferred way to run this lecture is using docker. If you have issues with the Docker option, then default to the React option. 

# Docker Option

Follow these instructions if you want to run through the D3 examples using Docker the option. If you plan to use the React option, skip to the React section. 

1. Install Docker from https://www.docker.com/. To install you will be required to create a userid and password. Please keep these as they will be important
1. From a Docker session (once Docker is installed and running your console is a Docker session) enter the following command but you will need to customize it for your purposes. If you look carefully at the command, there is a section “~/code/react-d3/src” that must be changed to point to your code location.

```docker
docker run -it -p 3000:3000 --rm --name reactdev -v ~/code/react-d3/src:/frontend/src lshumlich/react-dev:16.8.6
```

3. See the section called “Starting Point”. If that is not what you see, we will start debugging together.

## Additional Docker Commands
- docker stop ?name?
- docker start ?name?
- docker exec -it ?name? /bin/bash
- docker ps -a
- docker container ls -a
- docker images
- docker container prune


# React Option

If you have the Docker method running just skip this section.

To get the D3 examples working with a fresh React install, do the following:

1. If you do not have a fresh React install or a React install that you can use, go to the www.reactjs.org site and find the current method for installing React.
1. In the root directory of the new React install, rename the “src” directory to “src original”
1. Copy or move the src directory from react-d3 repository into your fresh React directory
1. npm install
1. npm start


# Starting Point

![What you should see](https://raw.githubusercontent.com/lshumlich/react-d3/master/images/welcome.png)
