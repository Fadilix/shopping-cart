import { motion } from "framer-motion"
import "../scss/PageNotFound.scss"
import NavBar from "../components/NavBar"

const PageNotFound: React.FC = () => {
    return (
        <>
            <NavBar />
            <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2 }}
                className="pnf"
            >
                <p>404</p>
                <div className="vertical-line"></div>
                <p>PAGE NOT FOUND</p>
            </motion.div>
        </>
    )
}

export default PageNotFound;