import ArticleCard from "../components/ArticleCard"
import { getTechnologyNews } from "../services/BackendNewsApi"

function TechnologyPage() {

    return(
        <div>
            <ArticleCard 
            title="TECHNOLOGY"
            getCategoryNews={getTechnologyNews}
            start={4}
            />

        </div>
    )
    
}
export default TechnologyPage