# CL-EA-NodeJS-RevolutBusinessDEMO
Revolut Business external adaptor for Chainlink

This adapter provides a simplified access for the Revolut Business V1 API for blockchains with Chainlink node support. See API documentation for functionality (and current limitations):

```bash
https://revolutdev.github.io/business-api/#getting-started
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
zip -r cl-ea-revb2b.zip .
```

## Install to AWS Lambda

- In Lambda Functions, create function
- On the Create function page:
  - Give the function a name
  - Use Node.js 8.10 for the runtime
  - Choose an existing role or create a new one
  - Click Create Function
- Under Function code, select "Upload a .zip file" from the Code entry type drop-down
- Click Upload and select the `cl-ea-revb2b.zip` file
- Handler should remain revoluthandle
- Save


## Install to GCP

- In Functions, create a new function, choose to ZIP upload
- Click Browse and select the `cl-ea-revb2b.zip` file
- Select a Storage Bucket to keep the zip in
- Function to execute: gcprevolut
