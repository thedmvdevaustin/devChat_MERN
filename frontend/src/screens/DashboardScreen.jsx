import SearchForm from '../components/SearchForm'
import Contacts from '../components/Contacts'
import Conversation from '../components/Conversation'

const DashboardScreen = () => {
    return (
        <section className="dashboard-container">
            <SearchForm />
            <Contacts />
            <Conversation />
        </section>
    )
}

export default DashboardScreen