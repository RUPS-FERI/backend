## System Requirements

To get started, make sure you have the following tools installed:

| Tool               | Download Link                                                  |
|--------------------|----------------------------------------------------------------|
| **Docker**         | [Get Docker](https://docs.docker.com/get-started/get-docker/)  |
| **Docker Compose** | [Get Docker Compose](https://docs.docker.com/compose/install/) |

---

## Project setup process

### Step 1: Create a Personal Access Token (PAT) on GitHub

To authenticate with GitHub, you'll need a Personal Access Token (PAT). Follow these steps to create one:

1) Go to **GitHub** and log in to your account.
2) Navigate to **Profile Settings**:
   - Click on your profile icon in the top-right corner.
   -  Select **Settings** from the dropdown menu.
3) In the left sidebar, scroll down and select **Developer Settings**.
4) Under **Developer Settings**, click on **Personal Access Tokens**.
5) Click **Tokens (classic)** to access the section for generating new tokens. 
6) Select **Generate New Token** and follow the prompts to configure and create your PAT.

### Step 2: Clone the Repository

Clone the project repository to your local machine:

Clone repository
```
git clone https://github.com/RUPS-FERI/packages-DI.git
cd backend
```

---

### Step 3: Set Up Environment Variables

1) Copy & paste `.env.example` and rename it to `.env`

    ```
    cp .env.example .env
    ```
   
2) Open the `.env` file and replace placeholders marked as `<value>` with your actual configuration values.

---

### Step 4: Start the Docker Containers

Run the following command to start up the Docker containers:

```
docker compose up -d
```

> Note: On Linux System you might need to prefix the command with `sudo`

---

### Step 5: Access the `rest-api Container Logs

Once Docker has finished setting up, you can check the `rest-api container logs to verify that the application is running:

````
docker compose logs rest-api
````

> Note: Output should be something like this: *REST API running on port: xyz*

## How to add packages

Since the entire application is running inside a docker container you must install all packages from inside the container

1) Run the following command to install packages directly:
    ````
    docker compose exec rest-api npm install <pacakge_name>
    ````
2) Alternatively, enter the container shell and install from there:
    ```` 
    docker compose exec rest-api sh
    npm install <package_name>
    ````

## Typescript gives error after package install
If TypeScript gives an error such as `Could not find a declaration file for module <lib-name>`, you need to install the types for that library as a development dependency:

```
npm i -D @types/<lib-name>
```

## Project architecture

[![](https://app.eraser.io/workspace/nN2BMoHWPFCd4n8nZSdp/preview?elements=KoZLXDZZ5JLkbWN_ETgD-w&type=embed)](https://app.eraser.io/workspace/nN2BMoHWPFCd4n8nZSdp?elements=KoZLXDZZ5JLkbWN_ETgD-w)

