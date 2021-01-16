import { useState } from 'react';
import './Home.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faDollarSign, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router-dom';

const Home = () => {
    const [income, setIncome] = useState<number>(0)
    const history = useHistory()
    const searchAgent = () => {
        if (income < 10000) return;
        history.push(`/agents/${income}`)
    }
    return (<>
        <main className="container">
            <section className="home">
                <div className="home-imageContainer">
                    <FontAwesomeIcon className="home-imageContainer-svg" icon={faUsers} />
                </div>
                <h1 className="home-title">Find the best agent for you!</h1>
                <h5 className="home-subTitle">Fill the information bellow to get your matches.</h5>
                <div className="home-search">
                    <label htmlFor="">Current income</label>
                    <div className="home-search-inputContainer">
                        <FontAwesomeIcon className="home-search-inputContainer-dollar" icon={faDollarSign} />
                        <input className="home-search-inputContainer-input" type="number" onChange={(e) => setIncome(parseInt(e.target.value))} />
                    </div>
                    <div className="home-search-btnContainer">
                        <button className="home-search-btnContainer-btn" onClick={() => searchAgent()}>Get matches
                        <FontAwesomeIcon className="home-search-btnContainer-icon" icon={faArrowRight} />
                        </button>
                    </div>
                </div>
            </section>
        </main>

    </>
    )
}
export default Home;