import { Agent } from "../../models/Agent"

export default class AgentsService {
    public async getAgents(): Promise<Agent[]>  {
        const agents = await fetch('http://localhost:3000/agents.json')
        return (await agents.json()).data as Agent[]
    }
}