const applicationState = {
    request: [   
]
}



const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
    .then(response => response.json())
    .then(
        (serviceRequests) => {
            // Store the external state in application state
            applicationState.request = serviceRequests
        }
        )
    }
    
export const getRequests = () => {
    return applicationState.request.map(request => ({...request}) )
    }
    
    
// const requests = getRequests()
    
// export const convertRequest = () => {
//     return `<li>
//        ${requests.map(listItem => ({...listItem})).join("")}
//        </li>`
//     }

