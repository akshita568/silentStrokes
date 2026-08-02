import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="flex items-center h-screen p-16 bg-base-white">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          
          {/* Elegant typographic 404 replacing the missing image */}
          <h1 className="text-8xl md:text-9xl font-serif text-olive opacity-80 mb-6 tracking-widest">
            404
          </h1>
          
          <p className="text-2xl font-semibold md:text-3xl text-text-main mb-2">
            Oh dear, this page has drifted away.
          </p>
          
          <p className="mt-4 mb-10 text-dove">
            It seems we couldn't find the canvas you were looking for. Don't worry, let's guide you back to the studio.
          </p>
          
          <Link
            to="/"
            className="px-8 py-3 font-semibold rounded-md bg-olive text-white hover:bg-text-main transition-colors duration-300 shadow-sm"
          >
            Back to homepage
          </Link>
          
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;