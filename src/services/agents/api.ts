export interface Agent {
    id: number,
    name: string,
    avatar: string,
    income: number
}

const getAgents = async (): Promise<Agent[]> => {
    const agents = await (await fetch('http://localhost:3000/agents.json')).json()
    return agents.data
}

export default getAgents