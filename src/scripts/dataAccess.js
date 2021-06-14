const applicationState = {
  request: [],
  completions:[],
  plumbers: [],
};

const API = "http://localhost:8088";

export const fetchRequests = () => {
  return fetch(`${API}/requests`)
    .then((response) => response.json())
    .then((serviceRequests) => {
      // Store the external state in application state
      applicationState.request = serviceRequests;
    });
};

export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
      .then((response) => response.json())
      .then((serviceRequests) => {
        // Store the external state in application state
        applicationState.completions = serviceRequests;
      });
  };

export const fetchPlumbers = () => {
  return fetch(`${API}/plumbers`)
    .then((response) => response.json())
    .then((servicePlumbers) => {
      // Store the external state in application state
      applicationState.plumbers = servicePlumbers;
    });
};

export const getRequests = () => {
  return applicationState.request.map((request) => ({ ...request }));
};
export const getPlumbers = () => {
  return applicationState.plumbers.map((plumber) => ({ ...plumber }));
};

export const sendRequest = (userServiceRequest) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userServiceRequest),
  };

  return fetch(`${API}/requests`, fetchOptions)
    .then((response) => response.json())
    .then(() => {
      document.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

export const deleteRequest = (id) => {
  return fetch(`${API}/requests/${id}`, { method: "DELETE" }).then(() => {
    document.dispatchEvent(new CustomEvent("stateChanged"));
  });
};

export const sendCompletions = (completedRequest) => {
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(completedRequest),
    };
  
    return fetch(`${API}/completions`, fetchOptions)
      .then((response) => response.json())
      .then(() => {
        document.dispatchEvent(new CustomEvent("stateChanged"));
      });
  };

  export const sendUpdates = (updatedRequest,id) => {
    const fetchOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRequest),
    };
  
    return fetch(`${API}/requests/${id}`, fetchOptions)
      .then((response) => response.json())
      .then(() => {
        document.dispatchEvent(new CustomEvent("stateChanged"));
      });
  };

