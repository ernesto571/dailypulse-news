
import ArticleCard from "../components/ArticleCard"
import { getBusinessNews } from "../services/BackendNewsApi"

function BusinessPage() {

    return(
        <div>
            <ArticleCard 
            title="BUSINESS"
            getCategoryNews={getBusinessNews}
            start={5}
            />

        </div>
    )
    
}
export default BusinessPage