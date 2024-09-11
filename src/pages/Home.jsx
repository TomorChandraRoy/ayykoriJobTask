import Recursive from "../components/recursive/Recursive"
import Alphabet from './../components/alphabet/Alphabet';




const Home = () => {
    return (
        <div className="overflow-hidden">
            <Recursive></Recursive>
            <Alphabet/>
        </div>
    )
}

export default Home