import { useEffect, useState } from 'react';
import { Agent } from '../../services/agents/api';
import './Home.scss'

const Home = () => {
    const [income, setIncome] = useState<number>(0)
    const [agents, setAgents] = useState<Agent[]>([])
    const [filterAgents, setFilterAgents] = useState<Agent[]>([])
    const [toggle, setToggle] = useState(false);
    const [indexPaginate, setIndexPaginate] = useState(0);

    const searchAgent = () => {
        if (income && income < 10000) return
        const filterData = agents.filter((agent: Agent) => agent.income >= (income - 10000) && agent.income <= (income + 10000))
        console.log(filterData)
        setFilterAgents(filterData)
    }

    const sortByIncome = () => {
        const agentsInit = [...filterAgents];
        if (toggle)
            agentsInit.sort((a, b) => a.income - b.income)
        else
            agentsInit.sort((a, b) => b.income - a.income)
        setToggle(!toggle)
        console.log(agentsInit);
        setFilterAgents(agentsInit)
    }

    const seeMore = () => {
        if(filterAgents.length === 0) return 
        const paginatedData = [...filterAgents]
        const newIndexPaginate = indexPaginate >= paginatedData.length ? indexPaginate : indexPaginate + 3;
        console.log(paginatedData.slice(0, newIndexPaginate));
        setIndexPaginate(newIndexPaginate)
    }
    const seeLess = () => {
        const paginatedData = [...filterAgents]
        const newIndexPaginate = indexPaginate > 3 ? indexPaginate - 3 : 3;
        console.log(paginatedData.slice(0, newIndexPaginate));
        setIndexPaginate(newIndexPaginate)
    }
    useEffect(() => {
        fetch('http://localhost:3000/agents.json').then(res => res.json()).then(data => setAgents(data.data));
    }, [])

    useEffect(() => {
        seeMore()
    }, [filterAgents])
    return (<>
        <main className="container">
            <section >
                <input type="number" onChange={(e) => setIncome(parseInt(e.target.value))} />
                <button onClick={() => searchAgent()}>MATCH</button>
                <button onClick={() => sortByIncome()}>BY INCOME</button>
                <button onClick={() => seeMore()}>See More</button>
                <button onClick={() => seeLess()}>See Less</button>

            </section>
            <section>

            </section>
        </main>

    </>
    )
}
export default Home;