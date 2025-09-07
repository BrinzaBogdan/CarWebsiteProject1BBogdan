import { CarProps, FilterProps } from "@/types";

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50;
  const mileageFactor = 0.1;
  const ageFactor = 0.05;

  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value);
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  return newPathname;
};

export const deleteSearchParams = (type: string) => {
  const newSearchParams = new URLSearchParams(window.location.search);
  newSearchParams.delete(type.toLocaleLowerCase());
  const newPathname = `${
    window.location.pathname
  }?${newSearchParams.toString()}`;
  return newPathname;
};

// ✅ Cache global pentru rezultate API
const fetchCache: { [key: string]: Promise<any> } = {};

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;
  const cacheKey = `${manufacturer}-${year}-${model}-${limit}-${fuel}`;

  // Dacă avem deja o promisiune în cache, returnăm aceea (previne multiple fetch-uri simultane)
  if (fetchCache[cacheKey]) {
    return fetchCache[cacheKey];
  }

  const headers: HeadersInit = {
    "X-RapidAPI-Key": "01c70ea2e1msh0531e784aea73b8p1ce4d2jsnc413b6c636ed",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  // Salvăm promisiunea în cache chiar înainte de fetch
  const fetchPromise = fetch(
<<<<<<< HEAD
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=m8`,
=======
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla`,
>>>>>>> 730a7b11979c1e85dc50503e13ee0b298f4c5553
    { headers }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error("Error fetching cars:", err);
      return [];
    });

  fetchCache[cacheKey] = fetchPromise;
  return fetchPromise;
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append(
    "customer",
    process.env.NEXT_PUBLIC_IMAGIN_API_KEY || ""
  );
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", `${angle}`);

  return `${url}`;
};
