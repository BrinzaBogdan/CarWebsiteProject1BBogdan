import {
  CarCard,
  CustomFilter,
  Hero,
  SearchBar,
  ShowMore,
} from "@/components";
import { fetchCars } from "@/utils";
import { fuels, yearsOfProduction } from "@/constants";
import { HomeProps } from "@/types";

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  const allCars = await fetchCars({
    manufacturer: params.manufacturer || "",
    year: Number(params.year) || 2022,
    fuel: params.fuel || "",
    limit: Number(params.limit) || 10,
    model: params.model || "",
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalog</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car, index) => (
                <CarCard
                  car={car}
                  key={`${car.make}-${car.model}-${car.year}-${index}`}
                />
              ))}
            </div>

            <ShowMore
              pageNumber={(Number(params.limit) || 10) / 10}
              isNext={(Number(params.limit) || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>No cars found matching your filters</p>
          </div>
        )}
      </div>
    </main>
  );
}
