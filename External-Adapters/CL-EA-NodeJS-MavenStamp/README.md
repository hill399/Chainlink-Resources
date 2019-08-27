# Chainlink NodeJS Serverless External Adapter - MavenStamp

This adapter provides a simplified access for the MavenStamp V1 API for blockchains with Chainlink node support. Functions to create, proof and check proposed 'stamps'. Details on the notarising process available here:

```bash
https://medium.com/mavennet/mavenstamp-an-immutability-as-a-service-solution-afbd142adef9

AND

https://www.mavenstamp.com/#/home
```

## Usage

API Information can be found here:

```bash
https://documenter.getpostman.com/view/4990185/RzZCDHU6#6e2dce15-f567-4a88-bb32-2daeaf61443f
```

## Install

```bash
npm install
```

## Test

```bash
npm test
```

## Create the zip

```bash
zip -r cl-ea-ms.zip .
```

## Install to AWS Lambda

- In Lambda Functions, create function
- On the Create function page:
  - Give the function a name
  - Use Node.js 8.10 for the runtime
  - Choose an existing role or create a new one
  - Click Create Function
- Under Function code, select "Upload a .zip file" from the Code entry type drop-down
- Click Upload and select the `cl-ea-ms.zip` file
- Handler should remain mavenhandle
- Save


## Install to GCP

- In Functions, create a new function, choose to ZIP upload
- Click Browse and select the `cl-ea-ms.zip` file
- Select a Storage Bucket to keep the zip in
- Function to execute: gcpmaven



