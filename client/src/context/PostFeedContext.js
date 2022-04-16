import { createContext, useReducer, useEffect } from "react";
export const PostFeedContext = createContext();

const initialState = {
  flightStatus: "loading",
  reservationStatus: "loading",
  errorMessage: null,
  flights: [],
  flightId: undefined,
  flightSeats: [],
  seatId: null,
  bookingId: null,
  reservationData: {},
};

const reducer = (state, action) => {
  switch (action.type) {
  // Set bookingId to previous bookingId
    case 'set-bookingId': {
      return {
        ...state,
        bookingId: action.bookingId,
        reservationData: action.data
      };
    }
  // Flight IDs
    case 'get-flights-success': { 
      return {
        ...state,
        flightStatus: "choose-flight",
        flights: action.flights,
        errorMessage: null
      };
    }
    case 'get-flights-failed': {
      return {
        ...state,
        flightStatus: "failed",
        errorMessage: action.message,
      };
    }
  // Flight information
    case 'get-flight': {
      return {
        ...state,
        flightStatus: "loading",
        flightId: undefined,
        flightSeats: [],
        seatId: null,
        errorMessage: null
      };
    }
    case 'get-flight-success': {
      return {
        ...state,
        flightStatus: "idle",
        flightId: action.flightId,
        flightSeats: action.flight,
        errorMessage: null
      };
    }
    case 'get-flight-failed': {
      return {
        ...state,
        flightStatus: "failed",
        flightId: null,
        flightSeats: null,
        errorMessage: action.message,
      };
    }
  // Select seat for reservation
    case 'select-seat-for-reservation': {
      return {
        ...state,
        seatId: action.seatId,
      };
    }
  // Booking reservation
    case 'purchase-reservation-request': {
      return {
        ...state,
        reservationStatus: "awaiting-response",
        errorMessage: null,
      };
    }
    case 'purchase-reservation-success': {
      return {
        ...state,
        reservationStatus: "purchased",
        errorMessage: null,
        flightId: undefined,
        flightSeats: [],
        seatId: null,
        bookingId: action.bookingId,
        reservationData: action.userInfo,
      };
    }
    case 'purchase-reservation-failure': {
      return {
        ...state,
        reservationStatus: "failed",
        errorMessage: action.message,
      };
    }
    case 'reset-reservation-process': {
      return {
        ...state,
        reservationStatus: "idle",
        errorMessage: null,
      };
    }
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

export const PostFeedProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Get flight numbers
  useEffect(() => {
    // const bookingId = localStorage.getItem('bookingId');
    // if (bookingId) getReservationFromId(bookingId);

    // fetch('/api/get-flights')
    // .then((res) => res.json())
    // .then(({data}) => {
    //   dispatch({type: "get-flights-success", flights: data});
    // })
    // .catch((error) => {
    //   dispatch({type: "get-flights-failed", message: error.message});
    // });
  }, []);

  // Get flight seat data
  const getFlightSeats = (flightId) => {
    dispatch({type: "get-flight"});

    fetch(`/api/get-flight/${flightId}`)
    .then(res => res.json())
    .then(({ data }) => {
      dispatch({type: "get-flight-success", flight: data, flightId});
    })
    .catch((error) => {
      dispatch({type: "get-flight-failed", message: error.message});
    });
  };

  // Get user info from bookingId
  const getReservationFromId = (bookingId) => {
    fetch(`/api/get-reservation/${bookingId}`)
    .then(res => res.json())
    .then(({data}) => {
      dispatch({type: "set-bookingId", bookingId, data});
    })
  };

  // Handle select seat
  const selectSeatForReservation = (seatId) => {
    dispatch({type: "select-seat-for-reservation", seatId});
  };

  // Handle reservation submit
  const handleReservationSubmit = (userInfo) => {
    dispatch({type: "purchase-reservation-request"});
    fetch("/api/add-reservation", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(userInfo),
    })
    .then(res => res.json())
    .then(({data}) => {
      localStorage.setItem('bookingId', data);
      dispatch({type: "purchase-reservation-success", userInfo, bookingId: data})
    })
    .catch((error) => dispatch({type: "purchase-reservation-failure", message: error.message}));
  };

  // Reset reservation status
  const resetReservationProcess = () => {
    dispatch({type:"reset-reservation-process"});
  };

  return (
    <PostFeedContext.Provider value={{state, actions: {getFlightSeats, handleReservationSubmit, selectSeatForReservation, resetReservationProcess },}}>
      {children}
    </PostFeedContext.Provider>
  );
};