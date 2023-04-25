import Head from "next/head";

// Components
import Home from "@/component/Home";

export default function Main() {
  return (
    <>
      <Head>
          <title>TO-DO</title>
        <meta name="description" content="Simple To Do App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content='todo, todo list, to do, to do list, CRUD, CRUD app, github, website, viper, add, note, delete, edit, done, mark, html, css, javascript, react, nextjs, react.js, bootstrap, sass, design, website design' />
        
        {/* ICONS */}
        <link rel="shortcut icon" type="image/x-icon" href='/favicon/favicon.ico' />
        <link rel="apple-touch-icon" sizes="180x180" href='/favicon/apple-touch-icon.png' />
        <link rel="icon" type="image/png" sizes="32x32" href='/favicon/favicon-32x32.png'/>
        <link rel="icon" type="image/png" sizes="16x16" href='/favicon/favicon-16x16.png'/>
      </Head>

      <Home />
    </>
  )
}
