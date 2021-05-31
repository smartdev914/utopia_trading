# Installation

Run the following commands from root folder to get started with the project.

```
yarn && yarn dev
```

NextJs Server will start in `localhost:3000`

...

# Stack We Have Used

1. Yarn Workspace
2. React Js and Next Js
3. Styled System and Styled Components
4. Firebase Deployment.
5. Vercel Deployment.

# Development

Follow the below procedure to go with the development process.

## NextJs

If you want to develop only for `nextjs` then then you don't need the `/landing-gatsby` folder. You can delete the folder.

For any specific template like the template under `/app` route. If you want to use this template only, then you have to follow below procedure.

1. Go to `/landing/pages/`
2. now copy all the content from `app.js`
3. Paste all the content in `/landing/pages/index.js`

Now for cleaning the unused code in your project follow the below procedure.

1. Now you can delete all other pages except `_app.js`, `_documents.js` and `_error.js`. That mean in your `/pages` folder you will have four files `index.js`, `_app.js`, `_documents.js` and `error.js`
2. From `/landing/containers/` folder you can delete all other folder except `App` and `Error`
3. From `/common/assets/image/` folder you can delete all other folder except `app`. Do not delete any files from there like `404.svg`, `error.svg` etc.
4. From `/common/data/` folder you can delete all other folder except `App`.
5. From `/common/theme/` folder you can delete all other folder except `app`. Do not delete the `index.js` file.

To start the server for `nextjs` you have to run `yarn nextjs-dev` and the server will start on `locahost:3000`.

# Explaining Containers

In the `containers` directory you will get folder for our every template. If you want to use App template. Then in the `App` directory you will get folders containing different section of the template like `Banner`, `Footer`, `Testimonial`, `Navbar` etc.

All of these containers contains regular reactjs code.

# Deployment

For deploying your final project you have to build your project first. To build the project you have to follow below procedure.

### NextJs

To build the nextjs version run below commands.

```
yarn build

// To check the build version locally run below command
// Not necessary if you don't want to check on your local.

yarn start
```

If you want to host the static html version of your nextjs project then run the below command to build static version

```
yarn export
```

## Running with Docker

To run the SuperProps Next.js app in docker

```
yarn export
docker build . -t <tag>
docker run -it -p 3000:3000 <tag>:latest
Open http://localhost:3000
```

# Deployment Support

## vercel.com

### GatsbyJs

We have given vercel.com deployment by default. For hosting the project in vercel.com first you have to go within the `packages/landing-gatsby`

Now run below command .

```
vercel
```

### NextJs

For deploying nextjs on vercel.com go to `packages/landing`. Now run below command .

```
vercel
```

> **Make sure you have `vercel-cli` installed in your system.**

## Firebase

### NextJs

Add your project ID at `packages/landing/.firebaserc`

Then, To deploy to your site, run the following command from the `packages/landing` directory.

```
yarn deploy
```

### GatsbyJs

To deploy to your site, run the following command from the `packages/landing-gatsby` directory.

```
yarn deploy
```

> **Make sure you have `firebase-tools` installed on your machine.**

## Netlify

At first, open an account on netlify and go to `sites` tab.

### NextJs

Run the below command to make the project netlify deploy ready from `packages/landing`.

```
yarn export
```

After running the above command go to `/landing` folder. You will find a `out` folder there. Drag
and drop this `out` folder on netlify `sites` tab. Now after finishing the upload you are ready to go.

### GatsbyJs

If you want to host the `gatsbyjs` project, go to your command line and run this command on `packages/landing-gatsby` directory.

```
yarn build
```

After running above command go to `landing-gatsby` folder. You will find a `public` folder
there. Drag and drop this `public` folder on netlify `sites` tab.
