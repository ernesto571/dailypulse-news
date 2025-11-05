import ArticleCard from "../components/ArticleCard"
import { getArtsNews } from "../services/BackendNewsApi"

function ArtPage() {

    return(
        <div>
            <ArticleCard 
            title="ARTS"
            getCategoryNews={getArtsNews}
            start={4}
            />

        </div>
    )
    
}
export default ArtPage