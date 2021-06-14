import { fetchCompletions, fetchPlumbers, fetchRequests } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"


const mainContainer = document.querySelector("#container")

const render = () => {
    fetchPlumbers()
    fetchCompletions
    fetchRequests().then(
        () => {
            mainContainer.innerHTML = SinkRepair()
        }
    )
}

render()


document.addEventListener("stateChanged", event => {
    console.log("State of the data has changed. Regenerating HTML...")
     render()
})