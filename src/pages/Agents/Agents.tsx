import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import AgentCard from '../../components/AgentCard/AgentCard';
import { Agent } from '../../models/Agent';
import AgentsService from '../../services/agents/agentsService';
import './Agents.scss'

const agentsService = new AgentsService()

const Agents = () => {
    let { income } = useParams<{ income: string }>();
    const [agents, setAgents] = useState<Agent[]>([])
    const [filterAgents, setFilterAgents] = useState<Agent[]>([])
    const [indexPaginate, setIndexPaginate] = useState(0);
    const [renderAgents, setRenderAgents] = useState<Agent[]>([])

    const seeLess = () => {
        const paginatedData = [...filterAgents]
        const newIndexPaginate = indexPaginate > 3 ? indexPaginate - 3 : 3;
        const newRenderAgents = paginatedData.slice(0, newIndexPaginate)
        setRenderAgents(newRenderAgents)
        setIndexPaginate(newIndexPaginate)
    }

    const findAgents = () => {
        const newIncome = parseInt(income);
        if (newIncome && newIncome < 10000) return
        if (agents && agents.length === 0) return
        const filterData = agents.filter((agent: Agent) => agent.income >= (newIncome - 10000) && agent.income <= (newIncome + 10000))
        console.log(filterData)
        setFilterAgents(filterData)
        setRenderAgents(filterData.slice(0, indexPaginate + 3))
        setIndexPaginate(indexPaginate + 3)
    }

    const seeMore = () => {
        if (filterAgents.length === 0) return
        const paginatedData = [...filterAgents]
        const newIndexPaginate = indexPaginate >= paginatedData.length ? indexPaginate : indexPaginate + 3
        const newRenderAgents = paginatedData.slice(0, newIndexPaginate)
        setIndexPaginate(newIndexPaginate)
        setRenderAgents(newRenderAgents)
    }
    const orderAgents = (event: any) => {
        const prop = event.target.value
        const newRenderAgents = [...renderAgents];
        switch (prop) {
            case 'name':
                newRenderAgents.sort((a, b) => a.name < b.name ? -1 : 0)
                break;
            case 'id':
                newRenderAgents.sort((a, b) => a.id - b.id)
                break;
            case 'incomH':
                newRenderAgents.sort((a, b) => b.income - a.income)
                break;
            case 'incomL':
                newRenderAgents.sort((a, b) => a.income - b.income)
                break;
            default:
                newRenderAgents.sort((a, b) => a.id - b.id)
                break;
        }
        setRenderAgents(newRenderAgents);
    }
    useEffect(() => {
        const getAgents = async () => {
            const dataAgents = await agentsService.getAgents()
            setAgents(dataAgents)
        }
        getAgents()
    }, [income])

    useEffect(() => {
        findAgents()
    }, [agents])

    return (<>
        <main className="agents container">
            <section className="agents-userInfo">
                <h1>Your matches</h1>
                <h3>Your income: <b>${Number(income).toLocaleString()}</b></h3>
            </section>
            {
                renderAgents.length > 0 ?
                    <section className="agents-controls">
                        <label htmlFor="filter">Order agents by</label>
                        <select name="" id="filter" onChange={orderAgents}>
                            <option value="0">Select...</option>
                            <option value="name">Name (A-Z)</option>
                            <option value="id">ID</option>
                            <option value="incomH">Income: High first</option>
                            <option value="incomL">Income: Low first</option>
                        </select>
                    </section> : null
            }
            <section className="agents-container">
                {
                    renderAgents.length > 0 ? renderAgents.map((agent, i) => (
                        <AgentCard key={i} {...agent} />
                    )) : null
                }

            </section>
            {
                renderAgents.length === 0 ?
                    <section className="agents-notFound">
                        <h2>There is no agents for your income</h2>
                    </section> :
                    <section className="agents-paginator">
                        <button onClick={() => seeLess()}>Show less -</button>
                        <button onClick={() => seeMore()}>Show more +</button>
                    </section>
            }


        </main>

    </>
    )
}
export default Agents;