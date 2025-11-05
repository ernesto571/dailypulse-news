import ArticleCard from "../components/ArticleCard"
import { getCryptoNews } from "../services/BackendNewsApi"

function CryptoPage() {

    return(
        <div>
            <ArticleCard 
            title="CRYPTOCURRENCY"
            getCategoryNews={getCryptoNews}
            start={4}
            />

        </div>
    )
    
}
export default CryptoPage