import "./App.css";
import Logo from "./assets/logo.png";
import RightImage from "./assets/hero.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import UrlList from "./components/UrlList";
import BubForm from "./components/BubForm";

function App() {
  const [isCountZero, setIsCountZero] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL}/urls/`;
    axios
      .get(url)
      .then((res) => {
        // console.log(res);
        const { data } = res;
        if (data.count === 0) setIsCountZero(true);
        setData(data.urls);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="px-5 min-h-screen bg-[#fffcfa]">
      <header>
        <div className="container mb-12 pt-10">
          <Link to={"/"}>
            <img src={Logo} alt="" className="w-full max-w-32" />
          </Link>
        </div>
      </header>

      <main>
        <section className="container grid md:grid-cols-2 items-center justify-between gap-16">
          <div className="">
            <h1 className="mb-4 text-3xl md:text-4xl font-bold">
              Shorten your long URLs
            </h1>
            <p className="mb-10">
              Bub-it is your go-to link shortener—fast, reliable, and
              effortlessly simple. With just a few clicks, turn long URLs into
              concise, shareable links that look great everywhere. Whether
              you’re posting on social media, emailing clients, or embedding in
              presentations, Bub-it makes sharing easier. Say goodbye to bulky
              web addresses and hello to streamlined links in seconds.
            </p>
            <BubForm />
          </div>
          <div className="">
            <img src={RightImage} alt="" className="w-full max-w-xl" />
          </div>
        </section>

        <section className="container mt-20">
          <h2 className="mt-5 text-3xl md:text-4xl font-bold">Your Bub-URLs</h2>

          <div className="py-5">
            {isCountZero && (
              <div className="grid items-center">
                <p className="mb-4 text-lg">
                  You have not created any Bub-URLs yet. <br /> Create a new one
                  using the form above!
                </p>
              </div>
            )}
            {data &&
              data.map((data) => {
                return (
                  <UrlList
                    key={data._id}
                    mainUrl={data.longUrl}
                    shortenedUrl={data.shortUrl}
                    id={data._id}
                  />
                );
              })}
          </div>
        </section>
      </main>

      <footer className="footer py-4 px-3 mt-10">
        <p className="text-center mb-3">
          Made by{" "}
          <a href="#" className="underline hover:no-underline">
            Moyinoluwa Adelowo
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;

