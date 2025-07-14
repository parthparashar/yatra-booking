import FeatureSection from "./components/FeatureSection";
import SearchBox from "./components/SearchBox";

export default function HomePage() {
  return (
    <main className="bg-gradient-to-r from-blue-50 to-green-50 min-h-screen">
      <div className="text-center pt-24">
        <h1 className="text-5xl font-bold text-black">
          Find Your Perfect{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
            Stay
          </span>
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-gray-700">
          Discover amazing hotels and create unforgettable memories with our
          curated selection of accommodations.
        </p>
      </div>
      <SearchBox />
      <FeatureSection />
    </main>
  );
}
