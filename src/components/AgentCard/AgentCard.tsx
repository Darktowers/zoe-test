import { Agent } from "../../models/Agent"
import './AgentCard.scss'

const AgentCard = (props: Agent) => {
    return (
        <article className="agentCard">
            <figure className="agentCard-imageContainer">
                <img className="agentCard-imageContainer-img" src={props.avatar || 'https://placeimg.com/200/300/persons'} alt={props.name} />
            </figure>
            <div className="agentCard-container">
                <div className="agentCard-info">
                    <h3 className="agentCard-info-name">{props.name}</h3>
                    <p className="agentCard-info-id">ID: {props.id}</p>
                </div>
                <div className="agentCard-income">
                    <p>Income <b>${Number(props.income).toLocaleString()}</b></p>
                </div>
            </div>
        </article>
    )
}

export default AgentCard