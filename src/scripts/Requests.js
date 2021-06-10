import { getRequests, deleteRequest } from "./dataAccess.js"


export const Requests = () => {

    const requests = getRequests()

    let html = `<ul>`
    const listArrayItems = requests.map(request => {

       return `
    <li class="request_item">
       <div class="request_description"> ${request.description}</div>
        <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
    </li>
`

                   
    })
       
    html += listArrayItems.join("")
    html +=   `</ul>`

    return html
}
const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

