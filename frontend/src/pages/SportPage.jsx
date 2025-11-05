import ArticleCard from "../components/ArticleCard"
import { getSportsNews } from "../services/BackendNewsApi"

function SportPage() {

    return(
        <div>
            <ArticleCard 
            title="SPORTS"
            getCategoryNews={getSportsNews}
            start={0}
            />

        </div>
    )
    
}
export default SportPage