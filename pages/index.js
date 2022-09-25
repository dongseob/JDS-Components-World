//default
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
//pages
import Modal from "./Modal";
import Auth from "./Auth";

export default function Home() {
  //페이지 목록
  const componentList = [
    { title: "Modal", route: <Modal /> },
    { title: "Auth", route: <Auth /> },
  ];

  return (
    <div className="p-4 sm:p-8">
      <Head>
        <title>JDS Components World</title>
        <meta name="description" content="JDS Components World" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className="font-extrabold text-4xl">JDS Components World</div>

      <div className="mt-4">
        <ul className="inline-block m-0">
          {componentList
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((i) => (
              <Link
                href={"/" + i.title}
                key={i.title}
                onClick={(e) => setListState(false)}
              >
                <li className="p-1 m-1 font-semibold list-disc ml-6 link text-lg cursor-pointer">{i.title}</li>
              </Link>
            ))}
        </ul>
      </div>
    </div>
  );
}
