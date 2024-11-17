# Hacksheffield-9

## Inspiration
Two people on our team struggle with executive dysfunction, a behavioral symptom that disrupts a person's ability to manage their own thoughts, emotions and actions. We know many people from all walks of life who find it difficult to find and maintain motivation, particularly when it comes to mundane or drawn-out tasks such as daily chores, assignments, revision, or staying active. One of the biggest factors behind motivational struggles is a need for instant gratification, something which these type of tasks very often lack, we decided to create an app that gamifies the completion of user-added tasks and rewards you for good habits by tracking your streak of consecutive days completing them.

### Design Influences
For the look, feel and function of our app we drew inspiration largely from [Duolingo](https://www.duolingo.com/), whose streak system is a strong motivator for consistent practice.

## What it does
The app supports signup with [Auth0](https://auth0.com/) and has a landing page where you can view the tasks you have set yourself and add new ones. Each task appears as a little card with a flame that is either lit or unlit depending on whether you have or do not have a streak, respectively. A number to the right of your streak shows how many consecutive days you have completed that task.

When adding a task you are asked for a title and a description of what completing that task looks like. Completion is verified by taking an image of yourself completing that task and using Google's [Gemini AI](https://gemini.google.com/) to determine whether or not that picture shows completion of the task, as described by the user.

## How we built it
### Frontend
The application UI is made in React (using TypeScript) and minified into static files using Vite. Very basic HTML is used to create the main page skeleton, and standard CSS for styling.

### Backend
The project backend is an Express.js API which routes requests from the frontend to appropriate endpoints and returns JSON data to be parsed and used. Logging in to the app is handled by Auth0 here, and so is the verification on task completion by passing the user's images through Gemini AI.

### Deployment
We have written Dockerfiles to containerise both the front-end and back-end individually. These Dockerfiles are then used by a GitHub Actions workflow script, triggered whenever there is a push to an appropriate branch, which builds the Docker images and uploads them to the GitHub Container Registry under our repository name. We then have setup a `docker-compose` file on a VPS to pull these images, build the containers, pass the appropriate environment variables to them, and connect them using a network. The URL below has been configured to point to this live deployment of the app.

## Challenges we ran into
The challenges that we mainly ran into included Git. Managing our codebase using Git and having multiple team members simultaneously working on different components often lead to merge conflicts that took us particularly long to resolve. We also encountered errors when setting up Github actions to automate our workflow whereby resolving it required us to dive into the documentation and troubleshooting permissions. 

When we integrated the large language model (LLM) for image verification, we initially faced issues with it being too strict in its classifications. This resulted in frequent misclassifications especially in edge cases where the images logically met the intended goal but were flagged otherwise. We addressed this by reworking our prompts to provide clearer instructions and explicitly instructing the model to be more lenient when considering whether the image contributed in completing the task.

## Accomplishments that we're proud of
Getting the CI/CD deployment pipeline to work was a wonderful feeling, as it was the deepest any of us had delved into using a GitHub workflow, with it being the first time for two team members.

All but one of us had virtually no React knowledge, so figuring out how to get all of the moving parts working together with it was an accomplishment. Auth0 and Gemini's API were also new to us all.

Two of our team had never attended a hackathon before, and we didn't know one of our teammates prior to the event start. We're really happy with how well we worked together as a unit on the project to get it up and running.

## What we learned
Surprisingly, the part of the project we found the hardest was not creating the website, but deploying it. We were all unfamiliar with GitHub actions and Docker containers. Furthermore, we had to learn about LetsEncrypt and Nginx in order to proxy requests to the correct container for the frontend or backend.

We decided to use GitHub actions to build the docker containers and GitHub Container Repository to host the containers. We had many issues setting this up, due to permission errors. However, now that it works we have an effective CI/CD pipeline for building tagged commits.

## What's next for Please Make Me Study
To further build on the "Please Make Me Study" app we could add a pomodoro timer (a technique that switches between a certain amount of work time and then a break), this is a particularly helpful method for people with ADD/ADHD so could help improve any study sessions. Combining this with a block list for URLs will particularly help users stay focused by blocking any distracting webpages (specified by the user) while a work timer is active. Another aspect we could improve is making the UI look prettier and focusing on making it more ADD/ADHD friendly. Lastly we could also add calendar integrations and email notifications for approaching 
deadlines.
