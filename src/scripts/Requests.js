import { getRequests } from "./dataAccess.js"

export const Requests = () => {
    
    const requests = getRequests()

    let html = `<ul>`
    const listArrayItems = requests.map(request => {

        return `<li value="${request.id}" name="description" >${request.description}</li>`
                   
    })
       
    html += listArrayItems.join("")
    html +=   `</ul>`

    return html
}


