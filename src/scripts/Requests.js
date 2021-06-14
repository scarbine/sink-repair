import {
  getRequests,
  deleteRequest,
  getPlumbers,
  sendCompletions,
  sendUpdates,
} from "./dataAccess.js";

export const Requests = () => {
  const requests = getRequests();
  const plumbers = getPlumbers();
  const sortedRequests = requests.sort((a,b)=> {return (a.isComplete - b.isComplete)})
  let html = `<ul>`;
  const listArrayItems = sortedRequests.map((request) => {
    const plumberChoice = () => {
      if (request.isComplete === false) {
        return `<select class="plumbers" id="plumbers">
                <option value="">Choose</option>
                ${plumbers
                  .map((plumber) => {
                    return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`;
                  })
                  .join("")}
            </select>`;
      } else {
        return "";
      }
    };

    const status = () => {if (request.isComplete === true ) {
        let requestStatus = " "
        return requestStatus= "complete"}
    else {
        let requestStatus = " "
        return requestStatus= "notComplete"
    }}
    return `
    <li class="request_item ${status()}">
       <div class="request_description"> ${
         request.description
       }</div> ${plumberChoice()}

        <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
    </li>
`;
  });

  html += listArrayItems.join("");
  html += `</ul>`;

  return html;
};
// Using map inside 1 const
// const Request = () => {
//     const html = `<ul>
//     ${requests.map((request =>  `<li class="request_item">
//     <div class="request_description"> ${request.description}</div>
//      <button class="request__delete"
//              id="request--${request.id}">
//          Delete
//      </button>
//  </li>`))}</ul>`
//  return html.join("")
// }

const mainContainer = document.querySelector("#container");

mainContainer.addEventListener("click", (click) => {
  if (click.target.id.startsWith("request--")) {
    const [, requestId] = click.target.id.split("--");
    deleteRequest(parseInt(requestId));
  }
});

mainContainer.addEventListener("change", (event) => {
  if (event.target.id === "plumbers") {
    const [requestId, plumberId] = event.target.value.split("--");
    const request = getRequests();
    const foundRequest = request.find(({id}) => id === parseInt(requestId));
    foundRequest.isComplete = true;
    /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
    const completion = {
      requestId: requestId,
      plumberId: plumberId,
      date_created: Date.now(),
    };

    /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
    sendCompletions(completion);
    sendUpdates(foundRequest, requestId)
  }
});
