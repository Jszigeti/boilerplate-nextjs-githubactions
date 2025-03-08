import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center sm:px-16">
      {/* Logo */}
      <Image
        src="/next.svg"
        alt="Next.js Logo"
        width={200}
        height={50}
        className="dark:invert mb-6"
      />

      {/* Title */}
      <h1 className="text-3xl font-bold sm:text-4xl">
        Next.js CI/CD Boilerplate
      </h1>
      <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
        Automated Dockerized Deployment with GitHub Actions
      </p>

      {/* Actions */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <a
          href="https://github.com/Jszigeti/nextjs-ci-cd-boilerplate"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 text-white bg-black rounded-md shadow-md transition hover:bg-gray-800"
        >
          View on GitHub
        </a>
        <a
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 border border-gray-300 rounded-md shadow-md transition hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Next.js Docs
        </a>
      </div>

      {/* Instructions */}
      <div className="mt-8 max-w-2xl text-left text-gray-600 dark:text-gray-300">
        <p className="mb-2 font-medium">🚀 Get Started:</p>
        <pre className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md text-sm sm:text-base">
          <code>git clone https://github.com/Jszigeti/nextjs-ci-cd-boilerplate.git</code>
          <br />
          <code>cd nextjs-ci-cd-boilerplate</code>
          <br />
          <code>npm install</code>
          <br />
          <code>npm run dev</code>
        </pre>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-sm text-gray-500">
        Created with ❤️ by <a href="https://github.com/Jszigeti" className="hover:underline">Jonas</a>
      </footer>
    </div>
  );
}