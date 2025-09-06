export async function fetchCars() {
  const headers = {
    'x-rapidapi-key': '4171f0c199mshb4dd8e081fae820p1ae106jsndcd224826774',
    'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
  };

  const response = await fetch('https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla', {
    headers: headers,
  });

  const result = await response.json();
  return result;
}
