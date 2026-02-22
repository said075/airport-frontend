/** Matches backend TuzlaFlight from airport-backend */
export interface TuzlaFlight {
  airport: string;
  date: string;
  type: string;
  time: string;
  airline: string;
  city: string;
  iata: string;
}

/** Matches backend BanjaLukaFlight from airport-backend */
export interface BanjaLukaFlight {
  airport: string;
  type: string;
  day: string;
  flightNumber: string;
  destination: string;
  time: string;
  airline: string;
}
