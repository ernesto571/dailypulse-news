import ArticleCard from "../components/ArticleCard"
import { getEntertainmentNews } from "../services/BackendNewsApi"

function EntertainmentPage() {

    return(
        <div>
            <ArticleCard 
            title="ENTERTAINMENT"
            getCategoryNews={getEntertainmentNews}
            start={4}
            />

        </div>
    )
    
}
export default EntertainmentPage