
import ArticleCard from "../components/ArticleCard"
import { getHealthNews } from "../services/BackendNewsApi"

function HealthPage() {

    return(
        <div>
            <ArticleCard 
            title="HEALTH"
            getCategoryNews={getHealthNews}
            start={5}
            />

        </div>
    )
    
}
export default HealthPage